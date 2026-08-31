using System;
using System.Threading.Tasks;
using DanceStudio.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace DanceStudio.API.Controllers
{
    [ApiController]
    [Route("api/whatsapp")]
    public class WhatsAppController : ControllerBase
    {
        private readonly IWhatsAppService _whatsAppService;

        public WhatsAppController(IWhatsAppService whatsAppService)
        {
            _whatsAppService = whatsAppService;
        }

        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] SendWhatsAppOtpRequest request)
        {
            try
            {
                var phone = string.IsNullOrWhiteSpace(request.Phone) ? "918341701113" : request.Phone;
                var otp = string.IsNullOrWhiteSpace(request.OtpCode) ? new Random().Next(100000, 999999).ToString() : request.OtpCode;

                var (success, message) = await _whatsAppService.SendOtpAsync(phone, otp);

                if (success)
                {
                    return Ok(new
                    {
                        success = true,
                        message,
                        otp,
                        recipient = phone
                    });
                }
                else
                {
                    return BadRequest(new
                    {
                        success = false,
                        message
                    });
                }
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

        [HttpPost("send-confirmation")]
        public async Task<IActionResult> SendPassConfirmation([FromBody] SendWhatsAppConfirmationRequest request)
        {
            try
            {
                var phone = string.IsNullOrWhiteSpace(request.Phone) ? "918341701113" : request.Phone;
                var name = string.IsNullOrWhiteSpace(request.CustomerName) ? "Gaddam Shanmuka" : request.CustomerName;
                var passId = string.IsNullOrWhiteSpace(request.PassId) ? $"ETH-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid():N}".Substring(0, 18).ToUpperInvariant() : request.PassId;
                var packageTitle = string.IsNullOrWhiteSpace(request.PackageTitle) ? "Ethos Premium Pass" : request.PackageTitle;

                var (success, message) = await _whatsAppService.SendPassConfirmationAsync(phone, name, passId, packageTitle);

                if (success)
                {
                    return Ok(new
                    {
                        success = true,
                        message,
                        passId,
                        recipient = phone
                    });
                }
                else
                {
                    return BadRequest(new
                    {
                        success = false,
                        message
                    });
                }
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

    public class SendWhatsAppOtpRequest
    {
        public string Phone { get; set; } = "918341701113";
        public string OtpCode { get; set; } = string.Empty;
    }

    public class SendWhatsAppConfirmationRequest
    {
        public string Phone { get; set; } = "918341701113";
        public string CustomerName { get; set; } = "Gaddam Shanmuka";
        public string PassId { get; set; } = string.Empty;
        public string PackageTitle { get; set; } = "Ethos Premium Pass";
    }
}
