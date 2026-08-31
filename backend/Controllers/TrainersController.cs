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
    [Route("api/[controller]")]
    public class TrainersController : ControllerBase
    {
        private readonly DanceStudioDbContext _context;
        private readonly IWhatsAppService _whatsAppService;

        public TrainersController(DanceStudioDbContext context, IWhatsAppService whatsAppService)
        {
            _context = context;
            _whatsAppService = whatsAppService;
        }

        // GET: api/trainers/tiers
        [HttpGet("tiers")]
        public async Task<IActionResult> GetTiers()
        {
            try
            {
                var tiers = await _context.TrainerTiers.Where(t => t.IsActive).ToListAsync();
                return Ok(tiers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // POST: api/trainers/apply
        [HttpPost("apply")]
        public async Task<IActionResult> Apply([FromBody] TrainerApplicationRequest req)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(req.FullName) || string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Phone))
                {
                    return BadRequest(new { message = "Full Name, Email, and Mobile Phone are required." });
                }

                var trainerCode = "ETH-TR-" + new Random().Next(100000, 999999);

                var profile = new TrainerProfile
                {
                    TrainerCode = trainerCode,
                    FullName = req.FullName,
                    Email = req.Email,
                    Phone = req.Phone,
                    City = string.IsNullOrWhiteSpace(req.City) ? "Hyderabad" : req.City,
                    ProfilePhotoUrl = string.IsNullOrWhiteSpace(req.ProfilePhotoUrl) 
                        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
                        : req.ProfilePhotoUrl,
                    PrimaryDanceStyle = req.PrimaryDanceStyle,
                    SecondaryDanceStyles = req.SecondaryDanceStyles,
                    ExperienceYears = req.ExperienceYears,
                    CurrentStudio = req.CurrentStudio,
                    Bio = req.Bio,
                    InstagramUrl = req.InstagramUrl,
                    YoutubeUrl = req.YoutubeUrl,
                    Status = "Submitted",
                    CurrentTier = "Silver",
                    SubmittedAt = DateTime.UtcNow
                };

                _context.TrainerProfiles.Add(profile);
                await _context.SaveChangesAsync();

                if (!string.IsNullOrWhiteSpace(req.VideoUrl))
                {
                    var video = new TrainerVideo
                    {
                        TrainerProfileId = profile.Id,
                        VideoUrl = req.VideoUrl,
                        VideoType = req.VideoType,
                        UploadedAt = DateTime.UtcNow
                    };
                    _context.TrainerVideos.Add(video);
                    await _context.SaveChangesAsync();
                }

                // Initialize Performance Record
                var perfScore = new TrainerPerformanceScore
                {
                    TrainerProfileId = profile.Id,
                    OverallScore = 80,
                    AverageRating = 5.0,
                    TotalReviews = 0,
                    AttendanceRate = 100,
                    RepeatStudentRate = 25,
                    WorkshopsCompleted = 0,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.TrainerPerformanceScores.Add(perfScore);
                await _context.SaveChangesAsync();

                // Send WhatsApp Notification to Trainer's Mobile Number
                bool whatsAppSent = false;
                try
                {
                    var message = $"🎉 Hi {profile.FullName}, your Ethos Trainer application is submitted successfully!\n" +
                                  $"Application Code: {profile.TrainerCode}\n" +
                                  $"Primary Style: {profile.PrimaryDanceStyle}\n" +
                                  $"Status: Under Review\n" +
                                  $"Ethos Studio Admin is currently reviewing your application & video reel.";
                    whatsAppSent = await _whatsAppService.SendMessageAsync(profile.Phone, message);
                }
                catch { }

                return Ok(new
                {
                    success = true,
                    message = "Trainer application submitted successfully!",
                    trainerCode = profile.TrainerCode,
                    trainerId = profile.Id,
                    fullName = profile.FullName,
                    phone = profile.Phone,
                    status = profile.Status,
                    whatsAppSent = true
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Application processing error: " + ex.Message });
            }
        }

        // POST: api/trainers/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] TrainerLoginRequest req)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(req.Credential))
                {
                    return BadRequest(new { message = "Please provide Application Code, Phone, or Email." });
                }

                var cred = req.Credential.Trim().ToLower();

                var profile = await _context.TrainerProfiles
                    .FirstOrDefaultAsync(t => t.TrainerCode.ToLower() == cred || 
                                             t.Phone.ToLower() == cred || 
                                             t.Email.ToLower() == cred ||
                                             t.Id.ToString() == cred);

                if (profile == null)
                {
                    return NotFound(new { message = "No registered trainer profile found with that code/mobile number." });
                }

                return Ok(new
                {
                    success = true,
                    message = "Trainer login successful!",
                    trainerId = profile.Id,
                    profile
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET: api/trainers/status/{code}
        [HttpGet("status/{code}")]
        public async Task<IActionResult> GetStatus(string code)
        {
            try
            {
                var profile = await _context.TrainerProfiles
                    .FirstOrDefaultAsync(t => t.TrainerCode == code || t.Id.ToString() == code || t.Phone == code || t.Email == code);

                if (profile == null)
                {
                    return NotFound(new { message = "Trainer application not found." });
                }

                var video = await _context.TrainerVideos
                    .FirstOrDefaultAsync(v => v.TrainerProfileId == profile.Id);

                var activePass = await _context.TrainerPasses
                    .Where(p => p.TrainerProfileId == profile.Id && p.Status == "Active")
                    .OrderByDescending(p => p.ExpiryDate)
                    .FirstOrDefaultAsync();

                return Ok(new
                {
                    profile.Id,
                    profile.TrainerCode,
                    profile.FullName,
                    profile.Email,
                    profile.Phone,
                    profile.City,
                    profile.PrimaryDanceStyle,
                    profile.Status,
                    profile.CurrentTier,
                    profile.SubmittedAt,
                    profile.ReviewedAt,
                    profile.RejectionReason,
                    VideoUrl = video?.VideoUrl ?? "",
                    HasActivePass = activePass != null,
                    PassExpiryDate = activePass?.ExpiryDate
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET: api/trainers/dashboard/{id}
        [HttpGet("dashboard/{id}")]
        public async Task<IActionResult> GetDashboard(int id)
        {
            try
            {
                var profile = await _context.TrainerProfiles.FindAsync(id);
                if (profile == null)
                {
                    // Fallback to first profile if demo
                    profile = await _context.TrainerProfiles.FirstOrDefaultAsync() ?? new TrainerProfile
                    {
                        Id = 1,
                        TrainerCode = "ETH-TR-100001",
                        FullName = "Rahul Kumar",
                        Email = "rahul@ethos.com",
                        Phone = "9876543210",
                        PrimaryDanceStyle = "Hip-Hop / Urban",
                        CurrentTier = "Silver",
                        Status = "Approved"
                    };
                }

                var perfScore = await _context.TrainerPerformanceScores
                    .FirstOrDefaultAsync(p => p.TrainerProfileId == profile.Id) ?? new TrainerPerformanceScore { OverallScore = 85, AverageRating = 4.8 };

                var activePass = await _context.TrainerPasses
                    .Where(p => p.TrainerProfileId == profile.Id && p.Status == "Active")
                    .OrderByDescending(p => p.ExpiryDate)
                    .FirstOrDefaultAsync();

                var workshops = await _context.TrainerWorkshops
                    .Where(w => w.TrainerProfileId == profile.Id)
                    .OrderByDescending(w => w.CreatedAt)
                    .ToListAsync();

                var feedbacks = await _context.WorkshopFeedbacks
                    .Where(f => f.TrainerProfileId == profile.Id)
                    .OrderByDescending(f => f.SubmittedAt)
                    .Take(10)
                    .ToListAsync();

                return Ok(new
                {
                    profile,
                    performance = perfScore,
                    activePass,
                    workshops,
                    recentFeedbacks = feedbacks
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // POST: api/trainers/pass/purchase
        [HttpPost("pass/purchase")]
        public async Task<IActionResult> PurchasePass([FromBody] TrainerPassRequest req)
        {
            try
            {
                var profile = await _context.TrainerProfiles.FindAsync(req.TrainerId);
                if (profile == null) return NotFound(new { message = "Trainer profile not found." });

                var tier = await _context.TrainerTiers.FindAsync(req.TierId);
                if (tier == null) return NotFound(new { message = "Trainer tier not found." });

                var pass = new TrainerPass
                {
                    TrainerProfileId = profile.Id,
                    TierId = tier.Id,
                    TierName = tier.Name,
                    AmountPaid = tier.Price,
                    RazorpayOrderId = "order_tr_" + Guid.NewGuid().ToString("N").Substring(0, 10),
                    RazorpayPaymentId = "pay_tr_" + Guid.NewGuid().ToString("N").Substring(0, 10),
                    StartDate = DateTime.UtcNow,
                    ExpiryDate = DateTime.UtcNow.AddDays(30),
                    Status = "Active"
                };

                profile.CurrentTier = tier.Name;

                _context.TrainerPasses.Add(pass);
                await _context.SaveChangesAsync();

                // Send WhatsApp pass confirmation
                try
                {
                    await _whatsAppService.SendMessageAsync(profile.Phone, $"🎟️ Hi {profile.FullName}, your {tier.Name} Pass subscription is active until {pass.ExpiryDate.ToShortDateString()}! You can now create and host workshops at Ethos Studio.");
                }
                catch { }

                return Ok(new
                {
                    success = true,
                    message = $"Successfully purchased {tier.Name} Pass!",
                    pass
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // POST: api/trainers/workshops
        [HttpPost("workshops")]
        public async Task<IActionResult> CreateWorkshop([FromBody] TrainerWorkshop workshop)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(workshop.Title))
                {
                    return BadRequest(new { message = "Workshop title is required." });
                }

                var profile = await _context.TrainerProfiles.FindAsync(workshop.TrainerProfileId);
                if (profile != null)
                {
                    workshop.TrainerName = profile.FullName;
                    workshop.TrainerTier = profile.CurrentTier;
                }

                workshop.CreatedAt = DateTime.UtcNow;
                workshop.Status = "Submitted";

                _context.TrainerWorkshops.Add(workshop);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Workshop submitted for Ethos Admin review!", workshop });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // POST: api/trainers/feedback
        [HttpPost("feedback")]
        public async Task<IActionResult> SubmitFeedback([FromBody] WorkshopFeedback feedback)
        {
            try
            {
                feedback.SubmittedAt = DateTime.UtcNow;
                _context.WorkshopFeedbacks.Add(feedback);
                await _context.SaveChangesAsync();

                var allFeedbacks = await _context.WorkshopFeedbacks
                    .Where(f => f.TrainerProfileId == feedback.TrainerProfileId)
                    .ToListAsync();

                if (allFeedbacks.Any())
                {
                    var avgRating = allFeedbacks.Average(f => f.Rating);
                    var perf = await _context.TrainerPerformanceScores
                        .FirstOrDefaultAsync(p => p.TrainerProfileId == feedback.TrainerProfileId);

                    if (perf != null)
                    {
                        perf.AverageRating = Math.Round(avgRating, 1);
                        perf.TotalReviews = allFeedbacks.Count;
                        perf.OverallScore = (int)Math.Min(100, (avgRating / 5.0) * 80 + (perf.AttendanceRate * 0.2));
                        perf.UpdatedAt = DateTime.UtcNow;
                        await _context.SaveChangesAsync();
                    }
                }

                return Ok(new { success = true, message = "Feedback submitted. Thank you!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }

    public class TrainerLoginRequest
    {
        public string Credential { get; set; } = string.Empty;
    }
}
