using System;

namespace DanceStudio.API.Models
{
    public class DanceClass
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Level { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal PricePerSession { get; set; }
        public string Duration { get; set; } = "60 mins";
        public string Instructor { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public double Rating { get; set; } = 4.9;
    }

    public class ClassSchedule
    {
        public int Id { get; set; }
        public string Day { get; set; } = string.Empty;
        public string Time { get; set; } = string.Empty;
        public string ClassName { get; set; } = string.Empty;
        public string Style { get; set; } = string.Empty;
        public string Instructor { get; set; } = string.Empty;
        public string Level { get; set; } = string.Empty;
        public int AvailableSlots { get; set; } = 15;
        public int TotalSlots { get; set; } = 20;
        public string StudioRoom { get; set; } = "Studio A";
    }

    public class EventWorkshop
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string GuestChoreographer { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Time { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Level { get; set; } = "Open to All";
        public string DanceStyle { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public int SeatsLeft { get; set; } = 8;
        public string Description { get; set; } = string.Empty;
    }

    public class DancePackage
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string BillingCycle { get; set; } = "Month";
        public string Type { get; set; } = "Regular";
        public bool IsPopular { get; set; }
        public string FeaturesJson { get; set; } = "[]";
        public string CTA { get; set; } = "Join Class";
    }

    public class BookingRequest
    {
        public int Id { get; set; }
        public string BookingType { get; set; } = "Workshop";
        public string ItemTitle { get; set; } = string.Empty;
        public decimal PricePaid { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = "UPI";
        public string PaymentStatus { get; set; } = "SUCCESS";
        public string TransactionId { get; set; } = string.Empty;
        public DateTime BookedAt { get; set; } = DateTime.UtcNow;
    }

    public class Instructor
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Specialty { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public int YearsExperience { get; set; }
        public string InstagramHandle { get; set; } = string.Empty;
    }

    // 🌟 PRODUCTION ARCHITECTURE DOMAIN MODELS WITH ROLE-BASED ACCESS CONTROL (RBAC)

    public class User
    {
        public int Id { get; set; }
        public string CustomerCode { get; set; } = string.Empty; // e.g. ETH1025
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "Student"; // "Admin", "Instructor", "Student"
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
    }

    public class CustomerPackage
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PackageId { get; set; }
        public string PackageName { get; set; } = string.Empty;
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public DateTime ExpiryDate { get; set; } = DateTime.UtcNow.AddDays(30);
        public string Status { get; set; } = "Active"; // Active, ExpiringSoon, Expired
    }

    public class PaymentRecord
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PackageId { get; set; }
        public string RazorpayOrderId { get; set; } = string.Empty;
        public string RazorpayPaymentId { get; set; } = string.Empty;
        public string RazorpaySignature { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Captured, Failed
        public DateTime PaidAt { get; set; } = DateTime.UtcNow;
    }

    public class NotificationRecord
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Type { get; set; } = "Activation"; // ExpiryReminder, Activation, PaymentReceipt
        public string Channel { get; set; } = "SMS"; // SMS, Email
        public string Message { get; set; } = string.Empty;
        public string Status { get; set; } = "Sent";
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
    }

    public class OtpVerification
    {
        public int Id { get; set; }
        public string Phone { get; set; } = string.Empty;
        public string OtpCode { get; set; } = string.Empty;
        public DateTime ExpiryTime { get; set; } = DateTime.UtcNow.AddMinutes(10);
        public bool IsUsed { get; set; } = false;
    }

    public class OtpRequest
    {
        public string Phone { get; set; } = string.Empty;
    }

    public class OtpVerifyRequest
    {
        public string Phone { get; set; } = string.Empty;
        public string OtpCode { get; set; } = string.Empty;
    }

    public class AdminLoginRequest
    {
        public string Password { get; set; } = string.Empty;
    }
}
