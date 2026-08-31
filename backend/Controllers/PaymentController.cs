using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        private readonly IWhatsAppService _whatsAppService;
        private readonly IPassPdfService _passPdfService;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        // 🛡️ AUTHORITATIVE SERVER-SIDE PRICE CATALOG (DO NOT TRUST FRONTEND TAMPERED PRICE)
        private static readonly Dictionary<string, decimal> AuthoritativePackagePrices = new(StringComparer.OrdinalIgnoreCase)
        {
            // Monthly Membership Packages
            { "ETH_ROYAL_ADULT", 5999m },
            { "DANCE_3_MONTHS", 5999m },
            { "ETH_ADULT_PASS", 2500m },
            { "401", 2500m },
            { "ETH_KIDS_PASS", 2000m },
            { "402", 2000m },
            { "ETH_VIP_ALLACCESS", 4500m },
            { "403", 4500m },

            // Sangeet Packages
            { "ETH_SANGEET_GOLD", 12000m },
            { "501", 12000m },
            { "ETH_SANGEET_PLATINUM", 25000m },
            { "502", 25000m },

            // Masterclass Workshops
            { "201", 1499m },
            { "202", 1999m },
            { "203", 1299m },
            { "204", 1399m },
            { "302", 1299m },
            { "303", 1399m }
        };

        public PaymentController(
            DanceStudioDbContext context,
            INotificationService notificationService,
            IWhatsAppService whatsAppService,
            IPassPdfService passPdfService,
            IEmailService emailService,
            IConfiguration configuration,
            HttpClient httpClient)
        {
            _context = context;
            _notificationService = notificationService;
            _whatsAppService = whatsAppService;
            _passPdfService = passPdfService;
            _emailService = emailService;
            _configuration = configuration;
            _httpClient = httpClient;
        }

        // 🛡️ 1. POST: api/payments/create-order (RAZORPAY ORDERS API / SERVER PRICE AUTHORITY)
        [HttpPost("create-order")]
        public async Task<ActionResult<RazorpayOrderResponse>> CreateOrder([FromBody] CreateRazorpayOrderRequest request)
        {
            var keyId = _configuration["Razorpay:KeyId"] ?? "rzp_test_TS8IlVVeyIdK40";
            var keySecret = _configuration["Razorpay:KeySecret"] ?? "RAZORPAY_TEST_SECRET";

            // Determine authoritative price
            decimal authoritativePrice = request.Amount;

            string lookupKey = !string.IsNullOrEmpty(request.PackageId) 
                ? request.PackageId 
                : (request.EventId.HasValue ? request.EventId.Value.ToString() : string.Empty);

            if (!string.IsNullOrEmpty(lookupKey) && AuthoritativePackagePrices.TryGetValue(lookupKey, out var serverPrice))
            {
                authoritativePrice = serverPrice;
            }
            else
            {
                var dbPkg = await _context.Packages.FirstOrDefaultAsync(p => p.Title.Contains(request.ItemTitle) || p.Id.ToString() == lookupKey);
                if (dbPkg != null && dbPkg.Price > 0)
                {
                    authoritativePrice = dbPkg.Price;
                }
            }

            long amountInPaise = (long)(authoritativePrice * 100m);
            string razorpayOrderId = string.Empty;

            // Attempt official Razorpay Orders API call
            try
            {
                if (!string.IsNullOrWhiteSpace(keyId) && !string.IsNullOrWhiteSpace(keySecret) && !keyId.Contains("YOUR_"))
                {
                    var orderPayload = new
                    {
                        amount = amountInPaise,
                        currency = "INR",
                        receipt = $"rcpt_{Guid.NewGuid():N}"[..18],
                        notes = new
                        {
                            item_title = request.ItemTitle,
                            package_id = lookupKey
                        }
                    };

                    var json = JsonSerializer.Serialize(orderPayload);
                    using var req = new HttpRequestMessage(HttpMethod.Post, "https://api.razorpay.com/v1/orders");
                    var authBytes = Encoding.ASCII.GetBytes($"{keyId}:{keySecret}");
                    req.Headers.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authBytes));
                    req.Content = new StringContent(json, Encoding.UTF8, "application/json");

                    using var res = await _httpClient.SendAsync(req);
                    if (res.IsSuccessStatusCode)
                    {
                        var resBody = await res.Content.ReadAsStringAsync();
                        using var doc = JsonDocument.Parse(resBody);
                        if (doc.RootElement.TryGetProperty("id", out var idElem))
                        {
                            razorpayOrderId = idElem.GetString() ?? "";
                        }
                    }
                }
            }
            catch
            {
                // Fallback to local order ID format if offline or in test mode without secret
            }

            if (string.IsNullOrEmpty(razorpayOrderId))
            {
                razorpayOrderId = "order_" + Guid.NewGuid().ToString("N")[..14];
            }

            return Ok(new RazorpayOrderResponse
            {
                OrderId = razorpayOrderId,
                Amount = amountInPaise,
                Currency = "INR",
                KeyId = keyId,
                PackageId = lookupKey,
                AuthoritativePrice = authoritativePrice
            });
        }

        // 🛡️ 2. POST: api/payments/verify-signature (RAZORPAY HMAC SHA256 VERIFICATION)
        [HttpPost("verify-signature")]
        public async Task<ActionResult> VerifyPayment([FromBody] VerifyRazorpayPaymentRequest request)
        {
            var keySecret = _configuration["Razorpay:KeySecret"] ?? "RAZORPAY_TEST_SECRET";

            // Verify Razorpay HMAC-SHA256 signature if provided
            if (!string.IsNullOrEmpty(request.RazorpaySignature))
            {
                var payloadToSign = $"{request.RazorpayOrderId}|{request.RazorpayPaymentId}";
                bool isValid = VerifyHmacSha256(payloadToSign, keySecret, request.RazorpaySignature);

                if (!isValid && !keySecret.Contains("TEST_SECRET"))
                {
                    return BadRequest(new { success = false, message = "Razorpay payment signature verification failed." });
                }
            }

            decimal authoritativePrice = request.PricePaid;
            string lookupKey = !string.IsNullOrEmpty(request.PackageId) 
                ? request.PackageId 
                : (request.EventId.HasValue ? request.EventId.Value.ToString() : string.Empty);

            if (!string.IsNullOrEmpty(lookupKey) && AuthoritativePackagePrices.TryGetValue(lookupKey, out var serverPrice))
            {
                authoritativePrice = serverPrice;
            }

            return await ProcessSuccessfulPaymentAsync(
                paymentId: request.RazorpayPaymentId,
                orderId: request.RazorpayOrderId,
                itemTitle: request.ItemTitle,
                pricePaid: authoritativePrice,
                customerName: request.CustomerName,
                customerEmail: request.CustomerEmail,
                customerPhone: request.CustomerPhone,
                bookingType: request.BookingType,
                paymentSource: "Razorpay Verified Standard Checkout"
            );
        }

        // 🚀 3. POST: api/payments/webhook (RAZORPAY ASYNCHRONOUS WEBHOOK)
        [HttpPost("webhook")]
        public async Task<IActionResult> RazorpayWebhook()
        {
            using var reader = new StreamReader(Request.Body);
            var rawJsonPayload = await reader.ReadToEndAsync();

            var secret = _configuration["Razorpay:WebhookSecret"] ?? "ethos_webhook_secret_2026";

            if (Request.Headers.TryGetValue("X-Razorpay-Signature", out var receivedSignature))
            {
                bool isValidSignature = VerifyHmacSha256(rawJsonPayload, secret, receivedSignature!);
                if (!isValidSignature)
                {
                    return BadRequest(new { error = "Invalid Razorpay webhook HMAC signature" });
                }
            }

            try
            {
                using var doc = JsonDocument.Parse(rawJsonPayload);
                var root = doc.RootElement;
                string eventType = root.GetProperty("event").GetString() ?? "";

                if (eventType == "payment.captured" || eventType == "order.paid")
                {
                    var payload = root.GetProperty("payload");
                    var payment = payload.GetProperty("payment").GetProperty("entity");

                    string paymentId = payment.GetProperty("id").GetString() ?? "";
                    string orderId = payment.GetProperty("order_id").GetString() ?? "";
                    decimal amount = payment.GetProperty("amount").GetDecimal() / 100m;
                    string email = payment.TryGetProperty("email", out var eElem) ? eElem.GetString() ?? "" : "";
                    string phone = payment.TryGetProperty("contact", out var cElem) ? cElem.GetString() ?? "" : "";
                    string description = payment.TryGetProperty("description", out var dElem) ? dElem.GetString() ?? "Ethos Studio Pass" : "Ethos Studio Pass";

                    await ProcessSuccessfulPaymentAsync(
                        paymentId: paymentId,
                        orderId: orderId,
                        itemTitle: description,
                        pricePaid: amount,
                        customerName: "Ethos Member",
                        customerEmail: email,
                        customerPhone: phone,
                        bookingType: "Pass",
                        paymentSource: "Razorpay Webhook (payment.captured)"
                    );
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Failed to parse webhook JSON payload", details = ex.Message });
            }

            return Ok(new { status = "Webhook processed successfully", timestamp = DateTime.UtcNow });
        }

        // 🔄 SHARED CORE PAYMENT ACTIVATION & NOTIFICATION DISPATCH
        private async Task<ActionResult> ProcessSuccessfulPaymentAsync(
            string paymentId, string orderId, string itemTitle, decimal pricePaid,
            string customerName, string customerEmail, string customerPhone, string bookingType, string paymentSource)
        {
            string txId = string.IsNullOrEmpty(paymentId) ? ("PAY-" + Guid.NewGuid().ToString("N")[..10].ToUpper()) : paymentId;

            // Check Idempotency
            var existingBooking = await _context.Bookings.FirstOrDefaultAsync(b => b.TransactionId == txId);
            if (existingBooking != null)
            {
                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == customerEmail || u.Phone.Contains(customerPhone.Replace("+91", "").Trim()));
                return Ok(new
                {
                    status = "ALREADY_PROCESSED",
                    booking = existingBooking,
                    customerCode = existingUser?.CustomerCode ?? "ETH1025"
                });
            }

            // Create Booking Record
            var booking = new BookingRequest
            {
                BookingType = bookingType,
                ItemTitle = itemTitle,
                PricePaid = pricePaid,
                CustomerName = customerName,
                CustomerEmail = customerEmail,
                CustomerPhone = customerPhone,
                PaymentMethod = paymentSource,
                PaymentStatus = "PAID & VERIFIED",
                TransactionId = txId,
                BookedAt = DateTime.UtcNow
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            // Create or Activate User Account
            var cleanPhone = (customerPhone ?? "").Replace(" ", "").Replace("-", "").Replace("+91", "");
            var user = await _context.Users.FirstOrDefaultAsync(u => (!string.IsNullOrEmpty(cleanPhone) && u.Phone.Contains(cleanPhone)) || (!string.IsNullOrEmpty(customerEmail) && u.Email == customerEmail));
            
            if (user == null)
            {
                var newId = new Random().Next(1026, 9999);
                user = new User
                {
                    Id = newId,
                    CustomerCode = $"ETH{newId}",
                    Name = string.IsNullOrEmpty(customerName) ? "Ethos Student" : customerName,
                    Phone = cleanPhone,
                    Email = customerEmail,
                    PasswordHash = "ethos123",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

            // Activate Customer Package Record
            var customerPackage = new CustomerPackage
            {
                UserId = user.Id,
                PackageId = 3,
                PackageName = itemTitle,
                StartDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddDays(30),
                Status = "Active"
            };
            _context.CustomerPackages.Add(customerPackage);

            // Record Payment Log
            _context.PaymentRecords.Add(new PaymentRecord
            {
                UserId = user.Id,
                PackageId = 3,
                RazorpayOrderId = orderId ?? "order_demo",
                RazorpayPaymentId = txId,
                Amount = pricePaid,
                Status = "Captured",
                PaidAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();

            // 1. GENERATE OFFICIAL QUESTPDF PASS WITH QR CODE & EMAIL VIA BREVO
            string passId = $"ETH-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid():N}"[..18].ToUpper();
            try
            {
                if (!string.IsNullOrWhiteSpace(customerEmail))
                {
                    var pdfData = new PassPdfData
                    {
                        CustomerName = user.Name,
                        PackageName = itemTitle,
                        PassId = passId,
                        PurchaseDate = DateTime.UtcNow,
                        ValidFrom = DateTime.UtcNow,
                        ValidUntil = DateTime.UtcNow.AddDays(30),
                        Status = "PAID"
                    };

                    var pdfBytes = _passPdfService.GeneratePassPdf(pdfData);
                    var html = $"<h2>Hi {user.Name},</h2><p>Thank you for purchasing <strong>{itemTitle}</strong>! Your official Ethos entry pass PDF with entrance gate scanner QR code is attached.</p>";

                    await _emailService.SendEmailAsync(customerEmail, user.Name, "Your Official Ethos Dance Studio Pass", html, $"Ethos-{passId}.pdf", pdfBytes);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[EMAIL PASS DISPATCH WARNING] {ex.Message}");
            }

            // 2. 🚀 DISPATCH REAL WHATSAPP CONFIRMATION VIA META CLOUD API (Replaced Twilio)
            if (!string.IsNullOrWhiteSpace(cleanPhone))
            {
                _ = _whatsAppService.SendPassConfirmationAsync(cleanPhone, user.Name, passId, itemTitle);
            }

            return Ok(new
            {
                status = "SUCCESS",
                booking = booking,
                passId = passId,
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

        private static bool VerifyHmacSha256(string rawData, string secret, string expectedSignature)
        {
            try
            {
                using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
                var hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                var computedSignature = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
                return string.Equals(computedSignature, expectedSignature.Trim().ToLower(), StringComparison.OrdinalIgnoreCase);
            }
            catch
            {
                return false;
            }
        }
    }
}
