using System;
using System.ComponentModel.DataAnnotations;

namespace DanceStudio.API.Models
{
    public class TrainerProfile
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string TrainerCode { get; set; } = string.Empty;
        [Required]
        public string FullName { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Phone { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string ProfilePhotoUrl { get; set; } = string.Empty;
        public string PrimaryDanceStyle { get; set; } = string.Empty;
        public string SecondaryDanceStyles { get; set; } = string.Empty;
        public int ExperienceYears { get; set; }
        public string CurrentStudio { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string InstagramUrl { get; set; } = string.Empty;
        public string YoutubeUrl { get; set; } = string.Empty;
        public string Status { get; set; } = "Submitted"; // Submitted, UnderReview, Approved, Rejected, Suspended
        public string Password { get; set; } = "Ethos#2026";
        public string ApplicationNotes { get; set; } = string.Empty;
        public string RejectionReason { get; set; } = string.Empty;
        public string CurrentTier { get; set; } = "Silver"; // Silver, Gold, Diamond
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ReviewedAt { get; set; }
    }

    public class TrainerVideo
    {
        [Key]
        public int Id { get; set; }
        public int TrainerProfileId { get; set; }
        public string VideoUrl { get; set; } = string.Empty;
        public string VideoType { get; set; } = "URL"; // URL, Upload
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }

    public class TrainerTier
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty; // Silver, Gold, Diamond
        public decimal Price { get; set; }
        public string Duration { get; set; } = "Monthly";
        public int MinimumScore { get; set; }
        public int MaximumWorkshops { get; set; }
        public bool HomepageFeatured { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }

    public class TrainerPass
    {
        [Key]
        public int Id { get; set; }
        public int TrainerProfileId { get; set; }
        public int TierId { get; set; }
        public string TierName { get; set; } = string.Empty;
        public decimal AmountPaid { get; set; }
        public string RazorpayOrderId { get; set; } = string.Empty;
        public string RazorpayPaymentId { get; set; } = string.Empty;
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
        public DateTime ExpiryDate { get; set; } = DateTime.UtcNow.AddDays(30);
        public string Status { get; set; } = "Active"; // Active, Expired, Cancelled
    }

    public class TrainerWorkshop
    {
        [Key]
        public int Id { get; set; }
        public int TrainerProfileId { get; set; }
        public string TrainerName { get; set; } = string.Empty;
        public string TrainerTier { get; set; } = "Silver";
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string DanceStyle { get; set; } = string.Empty;
        public DateTime WorkshopDate { get; set; }
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = string.Empty;
        public string Venue { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Capacity { get; set; } = 25;
        public int BookedSeats { get; set; } = 0;
        public string Status { get; set; } = "Draft"; // Draft, Submitted, Approved, Published, Completed, Rejected
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class WorkshopFeedback
    {
        [Key]
        public int Id { get; set; }
        public int WorkshopId { get; set; }
        public int TrainerProfileId { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public string StudentPhone { get; set; } = string.Empty;
        public int Rating { get; set; } // 1 to 5
        public int TeachingRating { get; set; }
        public int EnergyRating { get; set; }
        public int ContentRating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public bool WouldRecommend { get; set; } = true;
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }

    public class TrainerPerformanceScore
    {
        [Key]
        public int Id { get; set; }
        public int TrainerProfileId { get; set; }
        public int OverallScore { get; set; } = 80; // 0-100
        public double AverageRating { get; set; } = 4.5;
        public int TotalReviews { get; set; } = 0;
        public int AttendanceRate { get; set; } = 95;
        public int RepeatStudentRate { get; set; } = 30;
        public int WorkshopsCompleted { get; set; } = 0;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class TrainerApplicationRequest
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string ProfilePhotoUrl { get; set; } = string.Empty;
        public string PrimaryDanceStyle { get; set; } = string.Empty;
        public string SecondaryDanceStyles { get; set; } = string.Empty;
        public int ExperienceYears { get; set; }
        public string CurrentStudio { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string InstagramUrl { get; set; } = string.Empty;
        public string YoutubeUrl { get; set; } = string.Empty;
        public string VideoUrl { get; set; } = string.Empty;
        public string VideoType { get; set; } = "URL";
    }

    public class TrainerPassRequest
    {
        public int TrainerId { get; set; }
        public int TierId { get; set; }
    }
}
