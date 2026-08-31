using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DanceStudio.API.Data;
using DanceStudio.API.Models;
using DanceStudio.API.Services;

namespace DanceStudio.API.Controllers
{
    [ApiController]
    [Route("api/admin/trainers")]
    public class AdminTrainersController : ControllerBase
    {
        private readonly DanceStudioDbContext _context;
        private readonly IWhatsAppService _whatsAppService;

        public AdminTrainersController(DanceStudioDbContext context, IWhatsAppService whatsAppService)
        {
            _context = context;
            _whatsAppService = whatsAppService;
        }

        // GET: api/admin/trainers/applications
        [HttpGet("applications")]
        public async Task<IActionResult> GetApplications([FromQuery] string status = "")
        {
            try
            {
                var query = _context.TrainerProfiles.AsQueryable();
                if (!string.IsNullOrWhiteSpace(status))
                {
                    query = query.Where(t => t.Status == status);
                }

                var profiles = await query.OrderByDescending(t => t.SubmittedAt).ToListAsync();

                var result = new System.Collections.Generic.List<object>();
                foreach (var p in profiles)
                {
                    var video = await _context.TrainerVideos.FirstOrDefaultAsync(v => v.TrainerProfileId == p.Id);
                    var perf = await _context.TrainerPerformanceScores.FirstOrDefaultAsync(ps => ps.TrainerProfileId == p.Id);
                    result.Add(new
                    {
                        profile = p,
                        videoUrl = video?.VideoUrl ?? "",
                        performanceScore = perf?.OverallScore ?? 80,
                        averageRating = perf?.AverageRating ?? 5.0
                    });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // POST: api/admin/trainers/applications/{id}/approve
        [HttpPost("applications/{id}/approve")]
        public async Task<IActionResult> ApproveApplication(int id, [FromBody] AdminActionRequest req)
        {
            try
            {
                var profile = await _context.TrainerProfiles.FindAsync(id);
                if (profile == null) return NotFound(new { message = "Trainer application not found." });

                profile.Status = "Approved";
                profile.ReviewedAt = DateTime.UtcNow;

                if (!string.IsNullOrWhiteSpace(req.Tier))
                {
                    profile.CurrentTier = req.Tier;
                }
                if (!string.IsNullOrWhiteSpace(req.Password))
                {
                    profile.Password = req.Password;
                }
                else if (string.IsNullOrWhiteSpace(profile.Password))
                {
                    profile.Password = "Ethos#" + new Random().Next(1000, 9999);
                }

                if (!string.IsNullOrWhiteSpace(req.Notes))
                {
                    profile.ApplicationNotes = req.Notes;
                }

                await _context.SaveChangesAsync();

                // Send WhatsApp credentials notification to Trainer's Phone
                bool whatsAppSent = false;
                try
                {
                    var message = $"🎉 CONGRATULATIONS {profile.FullName.ToUpper()}!\n\n" +
                                  $"Your Ethos Trainer application is APPROVED!\n" +
                                  $"Assigned Performance Tier: *{profile.CurrentTier} TIER*\n\n" +
                                  $"🔑 YOUR OFFICIAL TRAINER LOGIN CREDENTIALS:\n" +
                                  $"📱 Trainer Code: *{profile.TrainerCode}*\n" +
                                  $"📧 Registered Email: *{profile.Email}*\n" +
                                  $"🔒 Password: *{profile.Password}*\n\n" +
                                  $"Log into your Trainer Portal to activate your pass, publish workshops, and view your performance scorecard!";
                    whatsAppSent = await _whatsAppService.SendMessageAsync(profile.Phone, message);
                }
                catch { }

                return Ok(new
                {
                    success = true,
                    message = $"Trainer {profile.FullName} approved as {profile.CurrentTier} tier! Login credentials dispatched via WhatsApp to +{profile.Phone}.",
                    profile,
                    whatsAppSent
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // POST: api/admin/trainers/applications/{id}/reject
        [HttpPost("applications/{id}/reject")]
        public async Task<IActionResult> RejectApplication(int id, [FromBody] AdminActionRequest req)
        {
            try
            {
                var profile = await _context.TrainerProfiles.FindAsync(id);
                if (profile == null) return NotFound(new { message = "Trainer application not found." });

                profile.Status = "Rejected";
                profile.ReviewedAt = DateTime.UtcNow;
                profile.RejectionReason = string.IsNullOrWhiteSpace(req.Reason) ? "Application did not meet current studio requirements." : req.Reason;

                await _context.SaveChangesAsync();

                // Send WhatsApp rejection update
                try
                {
                    var message = $"Hi {profile.FullName}, your Ethos Trainer application status has been updated to: Rejected.\nReason: {profile.RejectionReason}";
                    await _whatsAppService.SendMessageAsync(profile.Phone, message);
                }
                catch { }

                return Ok(new { success = true, message = $"Trainer application rejected.", profile });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET: api/admin/trainers/workshops
        [HttpGet("workshops")]
        public async Task<IActionResult> GetPendingWorkshops()
        {
            try
            {
                var workshops = await _context.TrainerWorkshops
                    .OrderByDescending(w => w.CreatedAt)
                    .ToListAsync();

                return Ok(workshops);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // POST: api/admin/trainers/workshops/{id}/approve
        [HttpPost("workshops/{id}/approve")]
        public async Task<IActionResult> ApproveWorkshop(int id)
        {
            try
            {
                var workshop = await _context.TrainerWorkshops.FindAsync(id);
                if (workshop == null) return NotFound(new { message = "Workshop not found." });

                workshop.Status = "Approved";
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = $"Workshop '{workshop.Title}' approved & published!", workshop });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET: api/admin/trainers/performance
        [HttpGet("performance")]
        public async Task<IActionResult> GetPerformanceLeaderboard()
        {
            try
            {
                var scores = await (from p in _context.TrainerProfiles
                                    join s in _context.TrainerPerformanceScores on p.Id equals s.TrainerProfileId into ps
                                    from sub in ps.DefaultIfEmpty()
                                    select new
                                    {
                                        p.Id,
                                        p.TrainerCode,
                                        p.FullName,
                                        p.PrimaryDanceStyle,
                                        p.CurrentTier,
                                        p.Status,
                                        p.Password,
                                        OverallScore = sub != null ? sub.OverallScore : 80,
                                        AverageRating = sub != null ? sub.AverageRating : 5.0,
                                        TotalReviews = sub != null ? sub.TotalReviews : 0
                                    }).OrderByDescending(x => x.OverallScore).ToListAsync();

                return Ok(scores);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }

    public class AdminActionRequest
    {
        public string Tier { get; set; } = "Silver";
        public string Password { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public string Reason { get; set; } = string.Empty;
    }
}
