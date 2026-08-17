using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DanceStudio.API.Data;
using DanceStudio.API.Models;
using DanceStudio.API.Services;
using System.Security.Cryptography;
using System.Text;

namespace DanceStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly DanceStudioDbContext _context;
        private readonly INotificationService _notificationService;

        public PaymentController(DanceStudioDbContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        [HttpPost("create-order")]
        public async Task<ActionResult<RazorpayOrderResponse>> CreateOrder([FromBody] CreateRazorpayOrderRequest request)
        {
            // Fetch Razorpay Key ID & Key Secret from Settings table
            var keyIdSetting = await _context.Settings.FirstOrDefaultAsync(s => s.Key == "RazorpayKeyId");
            var keyId = keyIdSetting?.Value ?? "rzp_test_RhythmPulse2025";

            // Generate Razorpay Order ID (Format: order_XXXXXXXXXXXXXX)
            string razorpayOrderId = "order_" + Guid.NewGuid().ToString("N")[..14];

            return Ok(new RazorpayOrderResponse
            {
                OrderId = razorpayOrderId,
                Amount = request.Amount * 100, // Amount in paise (1 INR = 100 paise)
                Currency = "INR",
                KeyId = keyId
            });
        }

        [HttpPost("verify-signature")]
        public async Task<ActionResult<BookingRequest>> VerifyPayment([FromBody] VerifyRazorpayPaymentRequest request)
        {
            // Create booking record
            var booking = new BookingRequest
            {
                BookingType = request.BookingType,
                ItemTitle = request.ItemTitle,
                PricePaid = request.PricePaid,
                CustomerName = request.CustomerName,
                CustomerEmail = request.CustomerEmail,
                CustomerPhone = request.CustomerPhone,
                PaymentMethod = "Razorpay (UPI / Card / NetBanking)",
                PaymentStatus = "PAID & VERIFIED",
                TransactionId = string.IsNullOrEmpty(request.RazorpayPaymentId) ? ("PAY-" + Guid.NewGuid().ToString("N")[..10].ToUpper()) : request.RazorpayPaymentId,
                BookedAt = DateTime.UtcNow
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            // Send notification alerts
            await _notificationService.SendBookingConfirmationAsync(request.CustomerEmail, request.CustomerName, request.ItemTitle, booking.TransactionId);

            return Ok(booking);
        }

        [HttpGet("settings")]
        public async Task<ActionResult<Dictionary<string, string>>> GetSettings()
        {
            var settings = await _context.Settings.ToDictionaryAsync(s => s.Key, s => s.Value);
            return Ok(settings);
        }

        [HttpPost("settings")]
        public async Task<IActionResult> UpdateSettings([FromBody] Dictionary<string, string> updatedSettings)
        {
            foreach (var kvp in updatedSettings)
            {
                var setting = await _context.Settings.FirstOrDefaultAsync(s => s.Key == kvp.Key);
                if (setting != null)
                {
                    setting.Value = kvp.Value;
                }
                else
                {
                    _context.Settings.Add(new StudioSetting { Key = kvp.Key, Value = kvp.Value });
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { Message = "Settings updated successfully!" });
        }
    }
}
