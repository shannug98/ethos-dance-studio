using System;
using System.Threading.Tasks;
using DanceStudio.API.Models;
using DanceStudio.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace DanceStudio.API.Controllers
{
    [ApiController]
    [Route("api/pass-test")]
    public class PassTestController : ControllerBase
    {
        private readonly IPassPdfService _passPdfService;
        private readonly IEmailService _emailService;

        public PassTestController(
            IPassPdfService passPdfService,
            IEmailService emailService)
        {
            _passPdfService = passPdfService;
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendTestPass([FromBody] SendTestPassRequest request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.ToEmail))
                {
                    return BadRequest(new { success = false, message = "Target recipient email (toEmail) is required." });
                }

                // 1. Generate unique Pass ID
                var passId = $"ETH-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid():N}".Substring(0, 20).ToUpperInvariant();

                // 2. Sample purchase dates
                var purchaseDate = DateTime.UtcNow;
                var validFrom = purchaseDate;
                var validUntil = purchaseDate.AddDays(30);

                // 3. Prepare PDF data
                var pdfData = new PassPdfData
                {
                    CustomerName = string.IsNullOrWhiteSpace(request.CustomerName) ? "Shanmuka Gaddam" : request.CustomerName,
                    PackageName = string.IsNullOrWhiteSpace(request.PackageName) ? "Premium Dance Pass" : request.PackageName,
                    PassId = passId,
                    PurchaseDate = purchaseDate,
                    ValidFrom = validFrom,
                    ValidUntil = validUntil,
                    Status = "PAID"
                };

                // 4. Generate PDF
                var pdfBytes = _passPdfService.GeneratePassPdf(pdfData);

                // 5. Email HTML
                var html = $@"
                    <html>
                    <body style=""font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px;"">
                        <h2 style=""color: #0088FF; text-align: center;"">Welcome to Ethos Dance Studio!</h2>
                        <p>Hi <strong>{pdfData.CustomerName}</strong>,</p>
                        <p>Thank you for purchasing your <strong>{pdfData.PackageName}</strong>!</p>
                        
                        <div style=""background: #f0f8ff; border-left: 4px solid #0088FF; padding: 15px; margin: 15px 0; border-radius: 6px;"">
                            <h3 style=""margin-top: 0; color: #0088FF;"">Your Pass Details</h3>
                            <p style=""margin: 5px 0;""><strong>Pass ID:</strong> {passId}</p>
                            <p style=""margin: 5px 0;""><strong>Purchase Date:</strong> {purchaseDate:dd MMMM yyyy}</p>
                            <p style=""margin: 5px 0;""><strong>Valid Until:</strong> {validUntil:dd MMMM yyyy}</p>
                        </div>

                        <p>Your unique Ethos Dance Studio official entry pass is attached to this email as a downloadable <strong>PDF document with QR entrance scanner code</strong>.</p>
                        <p>Please keep this PDF pass for your studio visits and reception desk check-ins.</p>
                        <br/>
                        <p>Thank you,<br/><strong>Ethos Dance Studio Team</strong></p>
                    </body>
                    </html>";

                // 6. PDF filename
                var fileName = $"Ethos-{pdfData.PackageName.Replace(" ", "-")}-{passId}.pdf";

                // 7. Send email via Brevo API
                await _emailService.SendEmailAsync(
                    request.ToEmail,
                    pdfData.CustomerName,
                    "Your Official Ethos Dance Studio Pass",
                    html,
                    fileName,
                    pdfBytes);

                // 8. Return success
                return Ok(new
                {
                    success = true,
                    message = "Pass generated with QuestPDF & QRCoder, and email sent successfully via Brevo API.",
                    passId,
                    fileName,
                    recipient = request.ToEmail
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = ex.Message,
                    details = ex.ToString()
                });
            }
        }
    }

    public class SendTestPassRequest
    {
        public string CustomerName { get; set; } = "Shanmuka Gaddam";
        public string ToEmail { get; set; } = string.Empty;
        public string PackageName { get; set; } = "Premium Dance Pass";
    }
}
