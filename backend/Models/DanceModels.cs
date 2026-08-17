namespace DanceStudio.API.Models
{
    public class DanceClass
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty; // Commercial, Hip-Hop, Bollywood Fusion, Contemporary, Heels, Sangeet
        public string Level { get; set; } = string.Empty; // All Levels, Beginner, Intermediate, Advanced
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
        public string Day { get; set; } = string.Empty; // Monday, Tuesday, etc.
        public string Time { get; set; } = string.Empty; // e.g. "06:00 PM - 07:30 PM"
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
        public string FeaturesJson { get; set; } = "[]"; // Serialized string array of features
        public string CTA { get; set; } = "Join Class";
    }

    public class BookingRequest
    {
        public int Id { get; set; }
        public string BookingType { get; set; } = "Workshop"; // Workshop, Class, Package, Sangeet
        public string ItemTitle { get; set; } = string.Empty;
        public decimal PricePaid { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = "UPI"; // UPI, CreditCard, NetBanking, Cash
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
}
