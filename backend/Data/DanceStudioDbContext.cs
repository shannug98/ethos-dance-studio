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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed Initial Settings
            modelBuilder.Entity<StudioSetting>().HasData(
                new StudioSetting { Id = 1, Key = "RazorpayKeyId", Value = "rzp_test_RhythmPulse2025" },
                new StudioSetting { Id = 2, Key = "RazorpayKeySecret", Value = "Secret_Demo_Key_9981" },
                new StudioSetting { Id = 3, Key = "AdminUsername", Value = "admin" },
                new StudioSetting { Id = 4, Key = "AdminPassword", Value = "adminpass" },
                new StudioSetting { Id = 5, Key = "AdminPhone", Value = "+91 9876543210" }
            );

            // Seed Initial Classes
            modelBuilder.Entity<DanceClass>().HasData(
                new DanceClass
                {
                    Id = 1,
                    Title = "Urban Hip-Hop & Grooves",
                    Category = "Commercial Hip-Hop",
                    Level = "All Levels",
                    Description = "Master high-energy urban choreography, body isolations, bounce, and musicality.",
                    PricePerSession = 499,
                    Duration = "75 mins",
                    Instructor = "Rohan Sharma",
                    ImageUrl = "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80",
                    Rating = 4.9
                },
                new DanceClass
                {
                    Id = 2,
                    Title = "Bollywood Commercial Fusion",
                    Category = "Bollywood Fusion",
                    Level = "Beginner to Intermediate",
                    Description = "High octane Bollywood hits blended with Afro, Hip-Hop & Bolly-hop routines.",
                    PricePerSession = 450,
                    Duration = "60 mins",
                    Instructor = "Ananya Roy",
                    ImageUrl = "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
                    Rating = 5.0
                },
                new DanceClass
                {
                    Id = 3,
                    Title = "Contemporary Storytelling",
                    Category = "Contemporary",
                    Level = "Intermediate",
                    Description = "Explore fluid floorwork, emotional storytelling, releases, and graceful weight transfers.",
                    PricePerSession = 550,
                    Duration = "90 mins",
                    Instructor = "Vikram Sengupta",
                    ImageUrl = "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80",
                    Rating = 4.8
                }
            );

            // Seed Initial Schedules
            modelBuilder.Entity<ClassSchedule>().HasData(
                new ClassSchedule { Id = 1, Day = "Monday", Time = "06:00 PM - 07:15 PM", ClassName = "Urban Hip-Hop & Grooves", Style = "Hip-Hop", Instructor = "Rohan Sharma", Level = "All Levels", AvailableSlots = 6, TotalSlots = 20, StudioRoom = "Studio A" },
                new ClassSchedule { Id = 2, Day = "Monday", Time = "07:30 PM - 08:30 PM", ClassName = "Bollywood Commercial Fusion", Style = "Bollywood", Instructor = "Ananya Roy", Level = "Beginner", AvailableSlots = 4, TotalSlots = 25, StudioRoom = "Studio B" },
                new ClassSchedule { Id = 3, Day = "Tuesday", Time = "06:30 PM - 08:00 PM", ClassName = "Contemporary Storytelling", Style = "Contemporary", Instructor = "Vikram Sengupta", Level = "Intermediate", AvailableSlots = 9, TotalSlots = 15, StudioRoom = "Studio A" }
            );

            // Seed Workshops
            modelBuilder.Entity<EventWorkshop>().HasData(
                new EventWorkshop
                {
                    Id = 1,
                    Title = "International Afro-Fusion Masterclass",
                    GuestChoreographer = "Koffi & Team (Paris)",
                    Date = "Saturday, Aug 29",
                    Time = "05:00 PM - 08:00 PM",
                    Location = "Main Grand Arena",
                    Price = 1499,
                    Level = "Open to All",
                    DanceStyle = "Afro-Beats & Amapiano",
                    ImageUrl = "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80",
                    SeatsLeft = 5,
                    Description = "Learn authentic Amapiano grooves, footwork, and viral choreography directly from guest Paris artists."
                }
            );

            // Seed Packages
            modelBuilder.Entity<DancePackage>().HasData(
                new DancePackage
                {
                    Id = 1,
                    Title = "Single Drop-in Pass",
                    Price = 499,
                    BillingCycle = "Session",
                    Type = "Single Pass",
                    IsPopular = false,
                    FeaturesJson = "[\"1 Regular Class Session\", \"Valid for any dance style\", \"Studio locker access\", \"7-day validity\"]",
                    CTA = "Book Drop-In"
                },
                new DancePackage
                {
                    Id = 2,
                    Title = "Monthly All-Access VIP Pass",
                    Price = 3499,
                    BillingCycle = "Month",
                    Type = "Monthly Pass",
                    IsPopular = true,
                    FeaturesJson = "[\"Unlimited Weekly Regular Classes\", \"1 Free Masterclass Workshop/mo\", \"Priority Studio Slot Booking\", \"10% Off Sangeet Packages\", \"Free Practice Room Hour/week\"]",
                    CTA = "Get VIP Pass"
                }
            );

            // Seed Instructors
            modelBuilder.Entity<Instructor>().HasData(
                new Instructor
                {
                    Id = 1,
                    Name = "Sophia Bennett",
                    Role = "Founder & Master Choreographer",
                    Specialty = "Commercial Hip-Hop & Stage Concepts",
                    Bio = "12+ years directing national performances and modern dance ensembles.",
                    ImageUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
                    YearsExperience = 12,
                    InstagramHandle = "@sophia_movement"
                }
            );
        }
    }
}
