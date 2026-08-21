using Microsoft.EntityFrameworkCore;
using DanceStudio.API.Models;

namespace DanceStudio.API.Data
{
    public class DanceStudioDbContext : DbContext
    {
        public DanceStudioDbContext(DbContextOptions<DanceStudioDbContext> options) : base(options) { }

        public DbSet<DanceClass> Classes { get; set; } = null!;
        public DbSet<ClassSchedule> Schedules { get; set; } = null!;
        public DbSet<EventWorkshop> Workshops { get; set; } = null!;
        public DbSet<DancePackage> Packages { get; set; } = null!;
        public DbSet<BookingRequest> Bookings { get; set; } = null!;
        public DbSet<Instructor> Instructors { get; set; } = null!;
        public DbSet<StudioSetting> Settings { get; set; } = null!;

        // 🌟 Domain DbSets
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<CustomerPackage> CustomerPackages { get; set; } = null!;
        public DbSet<PaymentRecord> PaymentRecords { get; set; } = null!;
        public DbSet<NotificationRecord> Notifications { get; set; } = null!;
        public DbSet<OtpVerification> OtpVerifications { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Decimal Precisions for SQL Server & SQLite
            modelBuilder.Entity<DanceClass>().Property(p => p.PricePerSession).HasPrecision(18, 2);
            modelBuilder.Entity<DancePackage>().Property(p => p.Price).HasPrecision(18, 2);
            modelBuilder.Entity<EventWorkshop>().Property(p => p.Price).HasPrecision(18, 2);
            modelBuilder.Entity<BookingRequest>().Property(p => p.PricePaid).HasPrecision(18, 2);
            modelBuilder.Entity<PaymentRecord>().Property(p => p.Amount).HasPrecision(18, 2);

            // Seed Initial Settings
            modelBuilder.Entity<StudioSetting>().HasData(
                new StudioSetting { Id = 1, Key = "RazorpayKeyId", Value = "rzp_test_RhythmPulse2025" },
                new StudioSetting { Id = 2, Key = "RazorpayKeySecret", Value = "Secret_Demo_Key_9981" },
                new StudioSetting { Id = 3, Key = "AdminUsername", Value = "admin" },
                new StudioSetting { Id = 4, Key = "AdminPassword", Value = "adminpass" },
                new StudioSetting { Id = 5, Key = "AdminPhone", Value = "+91 9876543210" }
            );

            // Seed Ethos Demo User (ETH1025)
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1025,
                    CustomerCode = "ETH1025",
                    Name = "Shanmuka Gaddam",
                    Phone = "9876543210",
                    Email = "shanmuka@gmail.com",
                    PasswordHash = "ethos123",
                    IsActive = true
                }
            );

            // Seed Demo Active Customer Package
            modelBuilder.Entity<CustomerPackage>().HasData(
                new CustomerPackage
                {
                    Id = 1,
                    UserId = 1025,
                    PackageId = 3,
                    PackageName = "Royal Celebration / Monthly Pass",
                    StartDate = new DateTime(2026, 8, 21, 0, 0, 0, DateTimeKind.Utc),
                    ExpiryDate = new DateTime(2026, 8, 28, 0, 0, 0, DateTimeKind.Utc), // Expiring in 7 days for testing
                    Status = "Active"
                }
            );

            // Seed Ethos Official Classes
            modelBuilder.Entity<DanceClass>().HasData(
                new DanceClass
                {
                    Id = 1,
                    Title = "Dance Fitness (Any Age)",
                    Category = "Morning Batch",
                    Level = "All Ages",
                    Description = "High-energy rhythm fitness, cardio jam & sweat workout for all age groups.",
                    PricePerSession = 2500,
                    Duration = "60 mins",
                    Instructor = "Ethos Master Team",
                    ImageUrl = "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80",
                    Rating = 5.0
                },
                new DanceClass
                {
                    Id = 2,
                    Title = "Adults Batch (Beginner)",
                    Category = "Adults",
                    Level = "Beginner",
                    Description = "Foundation grooves, isolations, swag, and step-by-step Bollywood & Commercial routines.",
                    PricePerSession = 2500,
                    Duration = "60 mins",
                    Instructor = "Ethos Senior Choreographer",
                    ImageUrl = "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80",
                    Rating = 4.9
                },
                new DanceClass
                {
                    Id = 3,
                    Title = "Kids Batch (4-6 Years)",
                    Category = "Kids",
                    Level = "Beginner (Ages 4-6)",
                    Description = "Fun, playful movement, basic rhythm building, and creative balance training for little stars.",
                    PricePerSession = 2000,
                    Duration = "60 mins",
                    Instructor = "Ethos Kids Lead",
                    ImageUrl = "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=800&q=80",
                    Rating = 5.0
                },
                new DanceClass
                {
                    Id = 4,
                    Title = "Kids Batch (6-12 Years)",
                    Category = "Kids",
                    Level = "Intermediate (Ages 6-12)",
                    Description = "Dynamic dance choreography, stage presentation, and beat coordination for growing dancers.",
                    PricePerSession = 2000,
                    Duration = "60 mins",
                    Instructor = "Ethos Kids Lead",
                    ImageUrl = "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
                    Rating = 4.9
                },
                new DanceClass
                {
                    Id = 5,
                    Title = "Adults Batch (Advanced)",
                    Category = "Adults",
                    Level = "Advanced",
                    Description = "Complex musicality, fast-paced choreography, execution, and performance attitude.",
                    PricePerSession = 2500,
                    Duration = "60 mins",
                    Instructor = "Ethos Master Director",
                    ImageUrl = "https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80",
                    Rating = 5.0
                }
            );

            // Seed Ethos Mon-Fri Schedules
            modelBuilder.Entity<ClassSchedule>().HasData(
                new ClassSchedule { Id = 1, Day = "Monday", Time = "07:30 AM - 08:30 AM", ClassName = "Dance Fitness (Any Age)", Style = "Morning Fitness", Instructor = "Ethos Master Team", Level = "All Ages", AvailableSlots = 15, TotalSlots = 25, StudioRoom = "Studio A" },
                new ClassSchedule { Id = 2, Day = "Monday", Time = "09:00 AM - 10:00 AM", ClassName = "Adults Batch (Beginner)", Style = "Adults Beginner", Instructor = "Ethos Choreographer", Level = "Beginner", AvailableSlots = 12, TotalSlots = 20, StudioRoom = "Studio A" },
                new ClassSchedule { Id = 3, Day = "Monday", Time = "05:00 PM - 06:00 PM", ClassName = "Kids Batch (4-6 Years)", Style = "Kids Batch", Instructor = "Ethos Kids Lead", Level = "Ages 4-6", AvailableSlots = 10, TotalSlots = 15, StudioRoom = "Studio B" },
                new ClassSchedule { Id = 4, Day = "Monday", Time = "06:00 PM - 07:00 PM", ClassName = "Adults Batch (Beginner)", Style = "Adults Evening", Instructor = "Ethos Choreographer", Level = "Beginner", AvailableSlots = 8, TotalSlots = 20, StudioRoom = "Studio A" },
                new ClassSchedule { Id = 5, Day = "Monday", Time = "07:00 PM - 08:00 PM", ClassName = "Kids Batch (6-12 Years)", Style = "Kids Batch", Instructor = "Ethos Kids Lead", Level = "Ages 6-12", AvailableSlots = 10, TotalSlots = 20, StudioRoom = "Studio B" },
                new ClassSchedule { Id = 6, Day = "Monday", Time = "08:00 PM - 09:00 PM", ClassName = "Adults Batch (Advanced)", Style = "Adults Advanced", Instructor = "Ethos Master Director", Level = "Advanced", AvailableSlots = 6, TotalSlots = 15, StudioRoom = "Studio A" }
            );

            // Seed Ethos Packages
            modelBuilder.Entity<DancePackage>().HasData(
                new DancePackage
                {
                    Id = 1,
                    Title = "Free Demo Trial Pass",
                    Price = 0,
                    BillingCycle = "1 Session",
                    Type = "Free Trial",
                    IsPopular = false,
                    FeaturesJson = "[\"Monday - Friday Free Demo Trial\", \"Valid for any 1 batch session\", \"Studio locker access\", \"100% Free - No charges\"]",
                    CTA = "Book Free Demo"
                },
                new DancePackage
                {
                    Id = 2,
                    Title = "Kids Monthly Membership (4-12 Yrs)",
                    Price = 2000,
                    BillingCycle = "Month",
                    Type = "Kids Monthly Pass",
                    IsPopular = false,
                    FeaturesJson = "[\"Mon - Fri Kids Batches\", \"Choice of 4-6 Yrs or 6-12 Yrs slot\", \"Stage performance showcase\", \"Regular progress feedback\"]",
                    CTA = "Join Kids Batch"
                },
                new DancePackage
                {
                    Id = 3,
                    Title = "Adults / Fitness Monthly Pass",
                    Price = 2500,
                    BillingCycle = "Month",
                    Type = "Adults Monthly Pass",
                    IsPopular = true,
                    FeaturesJson = "[\"Mon - Fri Regular Classes\", \"Dance Fitness / Beginner / Advanced\", \"Choice of Morning or Evening Slot\", \"1 Free Demo Trial included\"]",
                    CTA = "Join Adults Batch"
                }
            );

            // Seed Instructors
            modelBuilder.Entity<Instructor>().HasData(
                new Instructor
                {
                    Id = 1,
                    Name = "Ethos Master Team",
                    Role = "Founder & Choreography Directors",
                    Specialty = "Dance Fitness, Commercial Hip-Hop & Sangeet",
                    Bio = "Professional directors bringing high energy training to Kukatpally, Hyderabad.",
                    ImageUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
                    YearsExperience = 10,
                    InstagramHandle = "@ethosdancestudio"
                }
            );
        }
    }
}
