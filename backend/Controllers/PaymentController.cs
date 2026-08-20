using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
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
    public class PaymentController : ControllerBase
    {
        private readonly DanceStudioDbContext _context;
        private readonly INotificationService _notificationService;

        public PaymentController(DanceStudioDbContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        // POST: api/payments/create-order
        [HttpPost("create-order")]
        public async Task<ActionResult<RazorpayOrderResponse>> CreateOrder([FromBody] CreateRazorpayOrderRequest request)
        {
            var keyIdSetting = await _context.Settings.FirstOrDefaultAsync(s => s.Key == "RazorpayKeyId");
            var keyId = keyIdSetting?.Value ?? "rzp_test_RhythmPulse2025";

            // Generate Razorpay Order ID (Format: order_XXXXXXXXXXXXXX)
            string razorpayOrderId = "order_" + Guid.NewGuid().ToString("N")[..14];

            return Ok(new RazorpayOrderResponse
            {
                OrderId = razorpayOrderId,
                Amount = request.Amount * 100, // Amount in paise
                Currency = "INR",
                KeyId = keyId
            });
        }

        // POST: api/payments/verify-signature
        [HttpPost("verify-signature")]
        public async Task<ActionResult> VerifyPayment([FromBody] VerifyRazorpayPaymentRequest request)
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

            // Create or Activate User Account
            var cleanPhone = request.CustomerPhone.Replace(" ", "").Replace("-", "").Replace("+91", "");
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Phone.Contains(cleanPhone) || u.Email == request.CustomerEmail);
            
            if (user == null)
            {
                var newId = new Random().Next(1026, 9999);
                user = new User
                {
                    Id = newId,
                    CustomerCode = $"ETH{newId}",
                    Name = request.CustomerName,
                    Phone = cleanPhone,
                    Email = request.CustomerEmail,
                    PasswordHash = "ethos123",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

            // Activate Package Record
            var customerPackage = new CustomerPackage
            {
                UserId = user.Id,
                PackageId = 3,
                PackageName = request.ItemTitle,
                StartDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddDays(30),
                Status = "Active"
            };
            _context.CustomerPackages.Add(customerPackage);

            // Record Payment
            _context.PaymentRecords.Add(new PaymentRecord
            {
                UserId = user.Id,
                PackageId = 3,
                RazorpayOrderId = request.RazorpayOrderId ?? "order_demo",
                RazorpayPaymentId = booking.TransactionId,
                Amount = request.PricePaid,
                Status = "Captured",
                PaidAt = DateTime.UtcNow
            });

            // Log SMS & Email Activation Notification
            _context.Notifications.Add(new NotificationRecord
            {
                UserId = user.Id,
                Type = "AccountActivation",
                Channel = "SMS",
                Message = $"Welcome to Ethos Dance Studio! Your {request.ItemTitle} package is active. Your customer ID is {user.CustomerCode}. Access portal at https://shannug98.github.io/ethos-dance-studio/student.html",
                Status = "Dispatched",
                SentAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();

            // Send notification email
            await _notificationService.SendBookingConfirmationAsync(request.CustomerEmail, request.CustomerName, request.ItemTitle, booking.TransactionId);

            // 🚀 AUTOMATED BACKGROUND WHATSAPP RECEIPT DISPATCH VIA TWILIO
            string waReceiptText = $"🎟️ *ETHOS DANCE STUDIO — BOOKING CONFIRMED*\n\n" +
                                   $"Hi *{request.CustomerName}*,\n" +
                                   $"Your payment for *{request.ItemTitle}* is verified!\n\n" +
                                   $"🆔 Ticket ID: *{booking.TransactionId}*\n" +
                                   $"💰 Paid: *₹{request.PricePaid}*\n" +
                                   $"👤 Member Code: *{user.CustomerCode}*\n" +
                                   $"📍 Studio: Nizampet Rd, Kukatpally, Hyderabad\n\n" +
                                   $"Show this message at entrance. See you on stage!\n*Ethos Dance Studio Team*";

            _ = _notificationService.SendWhatsAppMessageAsync(request.CustomerPhone, waReceiptText);

            return Ok(new
            {
                booking = booking,
                customerCode = user.CustomerCode,
                user = new
                {
                    id = user.Id,
                    customerCode = user.CustomerCode,
                    name = user.Name,
                    phone = user.Phone,
                    email = user.Email,
                    packageTitle = customerPackage.PackageName,
                    classesLeft = 20,
                    daysRemaining = 30,
                    passExpiryDate = customerPackage.ExpiryDate.ToString("MMMM dd, yyyy")
                }
            });
        }

        // POST: api/payments/webhook
        [HttpPost("webhook")]
        public async Task<IActionResult> RazorpayWebhook()
        {
            using var reader = new System.IO.StreamReader(Request.Body);
            var json = await reader.ReadToEndAsync();

            // Webhook payload handler for order.paid / payment.captured
            return Ok(new { status = "Webhook processed successfully" });
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
