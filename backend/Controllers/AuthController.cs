using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using DanceStudio.API.Data;
using DanceStudio.API.Models;
using DanceStudio.API.Services;

namespace DanceStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DanceStudioDbContext _context;
        private readonly IWhatsAppService _whatsAppService;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public AuthController(
            DanceStudioDbContext context,
            IWhatsAppService whatsAppService,
            IConfiguration configuration,
            IWebHostEnvironment environment)
        {
            _context = context;
            _whatsAppService = whatsAppService;
            _configuration = configuration;
            _environment = environment;
        }

        // POST: api/auth/send-otp
        [AllowAnonymous]
        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp([FromBody] OtpRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Phone))
            {
                return BadRequest(new { message = "Mobile number is required" });
            }

            var cleanPhone = request.Phone.Replace(" ", "").Replace("-", "").Replace("+91", "");
            var otpCode = new Random().Next(100000, 999999).ToString();

            var otpRecord = new OtpVerification
            {
                Phone = cleanPhone,
                OtpCode = otpCode,
                ExpiryTime = DateTime.UtcNow.AddMinutes(10),
                IsUsed = false
            };

            _context.OtpVerifications.Add(otpRecord);
            await _context.SaveChangesAsync();

            // 🚀 DISPATCH REAL OTP VIA META WHATSAPP CLOUD API
            var (waSuccess, waMsg) = await _whatsAppService.SendOtpAsync(cleanPhone, otpCode);

            // Log notification
            var notification = new NotificationRecord
            {
                UserId = 0,
                Type = "OtpLogin",
                Channel = "Meta WhatsApp Cloud API",
                Message = $"Your Ethos Dance Studio login OTP is {otpCode}. Result: {waMsg}",
                Status = waSuccess ? "Dispatched" : "Pending/Failed",
                SentAt = DateTime.UtcNow
            };
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            // In Development mode, return demoOtp for local UI testing fallback
            if (_environment.IsDevelopment())
            {
                return Ok(new
                {
                    success = true,
                    message = $"OTP dispatched via Meta WhatsApp Cloud API to +91 {cleanPhone}",
                    whatsAppStatus = waMsg,
                    demoOtp = otpCode // Local Development Helper
                });
            }

            // Production Response (Security Best Practice: Never return OTP in JSON response)
            return Ok(new
            {
                success = true,
                message = $"OTP code sent successfully to your WhatsApp (+91 {cleanPhone})"
            });
        }

        // POST: api/auth/verify-otp (Returns JWT Token with 'Student' Role)
        [AllowAnonymous]
        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] OtpVerifyRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Phone) || string.IsNullOrWhiteSpace(request.OtpCode))
            {
                return BadRequest(new { message = "Phone and OTP code are required" });
            }

            var cleanPhone = request.Phone.Replace(" ", "").Replace("-", "").Replace("+91", "");

            var validOtp = await _context.OtpVerifications
                .Where(o => o.Phone == cleanPhone && o.OtpCode == request.OtpCode && !o.IsUsed && o.ExpiryTime > DateTime.UtcNow)
                .OrderByDescending(o => o.Id)
                .FirstOrDefaultAsync();

            // Restrict dev fallback code to Development environment only
            bool isDevFallback = _environment.IsDevelopment() && (request.OtpCode == "123456" || request.OtpCode == "482910");

            if (validOtp == null && !isDevFallback)
            {
                return BadRequest(new { message = "Invalid or expired OTP code" });
            }

            if (validOtp != null)
            {
                validOtp.IsUsed = true;
                await _context.SaveChangesAsync();
            }

            // Find or create customer user
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Phone.Contains(cleanPhone));
            if (user == null)
            {
                var newId = new Random().Next(1026, 9999);
                user = new User
                {
                    CustomerCode = $"ETH{newId}",
                    Name = cleanPhone.Contains("83417") ? "Shanmuka Gaddam" : "Ethos Member",
                    Phone = cleanPhone,
                    Email = $"student{newId}@ethosdancestudio.com",
                    Role = "Student",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

            // Issue JWT Token with 'Student' Role
            var token = GenerateJwtToken(user.Id, user.Name, user.Role, user.Phone);

            return Ok(new
            {
                success = true,
                message = "Authentication successful",
                token = token,
                role = user.Role,
                user = new
                {
                    id = user.Id,
                    customerCode = user.CustomerCode,
                    name = user.Name,
                    phone = user.Phone,
                    email = user.Email,
                    role = user.Role
                }
            });
        }

        // POST: api/auth/admin-login (Returns JWT Token with 'Admin' Role)
        [AllowAnonymous]
        [HttpPost("admin-login")]
        public IActionResult AdminLogin([FromBody] AdminLoginRequest request)
        {
            var masterAdminPass = _configuration["Admin:Password"] ?? "EthosAdmin2026Secure!";

            if (request.Password == masterAdminPass || (_environment.IsDevelopment() && (request.Password == "admin123" || request.Password == "admin")))
            {
                var token = GenerateJwtToken(1, "Ethos Studio Director", "Admin", "+91 83417 01113");
                return Ok(new
                {
                    success = true,
                    message = "Admin authorization granted",
                    token = token,
                    role = "Admin",
                    user = new
                    {
                        id = 1,
                        name = "Ethos Studio Director",
                        role = "Admin",
                        permissions = new string[] { "ALL_ACCESS", "CREATE_EVENT", "MANAGE_ROSTER", "VIEW_FINANCIALS" }
                    }
                });
            }

            return Unauthorized(new { message = "Invalid master admin credentials" });
        }

        // GET: api/auth/me (Protected Route - Returns Current Authenticated User & Claims)
        [Authorize]
        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userName = User.FindFirst(ClaimTypes.Name)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            var userPhone = User.FindFirst(ClaimTypes.MobilePhone)?.Value;

            return Ok(new
            {
                authenticated = true,
                userId = userId,
                name = userName,
                role = userRole,
                phone = userPhone
            });
        }

        // JWT Token Generator Helper Method
        private string GenerateJwtToken(int userId, string name, string role, string phone)
        {
            var jwtSecret = _configuration["Jwt:Secret"] ?? "EthosDanceStudioSecretKey_2026_SuperSecureJWT_9981";
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(jwtSecret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                    new Claim(ClaimTypes.Name, name),
                    new Claim(ClaimTypes.Role, role),
                    new Claim(ClaimTypes.MobilePhone, phone ?? string.Empty)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = "EthosDanceStudioAPI",
                Audience = "EthosDanceStudioClient",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
