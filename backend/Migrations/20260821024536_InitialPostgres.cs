using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DanceStudio.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialPostgres : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BookingType = table.Column<string>(type: "text", nullable: false),
                    ItemTitle = table.Column<string>(type: "text", nullable: false),
                    PricePaid = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    CustomerName = table.Column<string>(type: "text", nullable: false),
                    CustomerEmail = table.Column<string>(type: "text", nullable: false),
                    CustomerPhone = table.Column<string>(type: "text", nullable: false),
                    PaymentMethod = table.Column<string>(type: "text", nullable: false),
                    PaymentStatus = table.Column<string>(type: "text", nullable: false),
                    TransactionId = table.Column<string>(type: "text", nullable: false),
                    BookedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Classes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    Level = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    PricePerSession = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    Duration = table.Column<string>(type: "text", nullable: false),
                    Instructor = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    Rating = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CustomerPackages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    PackageId = table.Column<int>(type: "integer", nullable: false),
                    PackageName = table.Column<string>(type: "text", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerPackages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Instructors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    Specialty = table.Column<string>(type: "text", nullable: false),
                    Bio = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    YearsExperience = table.Column<int>(type: "integer", nullable: false),
                    InstagramHandle = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instructors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Channel = table.Column<string>(type: "text", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    SentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OtpVerifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    OtpCode = table.Column<string>(type: "text", nullable: false),
                    ExpiryTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsUsed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtpVerifications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Packages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    BillingCycle = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    IsPopular = table.Column<bool>(type: "boolean", nullable: false),
                    FeaturesJson = table.Column<string>(type: "text", nullable: false),
                    CTA = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Packages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PaymentRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    PackageId = table.Column<int>(type: "integer", nullable: false),
                    RazorpayOrderId = table.Column<string>(type: "text", nullable: false),
                    RazorpayPaymentId = table.Column<string>(type: "text", nullable: false),
                    RazorpaySignature = table.Column<string>(type: "text", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    PaidAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentRecords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Day = table.Column<string>(type: "text", nullable: false),
                    Time = table.Column<string>(type: "text", nullable: false),
                    ClassName = table.Column<string>(type: "text", nullable: false),
                    Style = table.Column<string>(type: "text", nullable: false),
                    Instructor = table.Column<string>(type: "text", nullable: false),
                    Level = table.Column<string>(type: "text", nullable: false),
                    AvailableSlots = table.Column<int>(type: "integer", nullable: false),
                    TotalSlots = table.Column<int>(type: "integer", nullable: false),
                    StudioRoom = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Key = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CustomerCode = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Workshops",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    GuestChoreographer = table.Column<string>(type: "text", nullable: false),
                    Date = table.Column<string>(type: "text", nullable: false),
                    Time = table.Column<string>(type: "text", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    Level = table.Column<string>(type: "text", nullable: false),
                    DanceStyle = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    SeatsLeft = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workshops", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Classes",
                columns: new[] { "Id", "Category", "Description", "Duration", "ImageUrl", "Instructor", "Level", "PricePerSession", "Rating", "Title" },
                values: new object[,]
                {
                    { 1, "Morning Batch", "High-energy rhythm fitness, cardio jam & sweat workout for all age groups.", "60 mins", "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80", "Ethos Master Team", "All Ages", 2500m, 5.0, "Dance Fitness (Any Age)" },
                    { 2, "Adults", "Foundation grooves, isolations, swag, and step-by-step Bollywood & Commercial routines.", "60 mins", "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80", "Ethos Senior Choreographer", "Beginner", 2500m, 4.9000000000000004, "Adults Batch (Beginner)" },
                    { 3, "Kids", "Fun, playful movement, basic rhythm building, and creative balance training for little stars.", "60 mins", "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=800&q=80", "Ethos Kids Lead", "Beginner (Ages 4-6)", 2000m, 5.0, "Kids Batch (4-6 Years)" },
                    { 4, "Kids", "Dynamic dance choreography, stage presentation, and beat coordination for growing dancers.", "60 mins", "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80", "Ethos Kids Lead", "Intermediate (Ages 6-12)", 2000m, 4.9000000000000004, "Kids Batch (6-12 Years)" },
                    { 5, "Adults", "Complex musicality, fast-paced choreography, execution, and performance attitude.", "60 mins", "https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80", "Ethos Master Director", "Advanced", 2500m, 5.0, "Adults Batch (Advanced)" }
                });

            migrationBuilder.InsertData(
                table: "CustomerPackages",
                columns: new[] { "Id", "ExpiryDate", "PackageId", "PackageName", "StartDate", "Status", "UserId" },
                values: new object[] { 1, new DateTime(2026, 8, 28, 0, 0, 0, 0, DateTimeKind.Utc), 3, "Royal Celebration / Monthly Pass", new DateTime(2026, 8, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Active", 1025 });

            migrationBuilder.InsertData(
                table: "Instructors",
                columns: new[] { "Id", "Bio", "ImageUrl", "InstagramHandle", "Name", "Role", "Specialty", "YearsExperience" },
                values: new object[] { 1, "Professional directors bringing high energy training to Kukatpally, Hyderabad.", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", "@ethosdancestudio", "Ethos Master Team", "Founder & Choreography Directors", "Dance Fitness, Commercial Hip-Hop & Sangeet", 10 });

            migrationBuilder.InsertData(
                table: "Packages",
                columns: new[] { "Id", "BillingCycle", "CTA", "FeaturesJson", "IsPopular", "Price", "Title", "Type" },
                values: new object[,]
                {
                    { 1, "1 Session", "Book Free Demo", "[\"Monday - Friday Free Demo Trial\", \"Valid for any 1 batch session\", \"Studio locker access\", \"100% Free - No charges\"]", false, 0m, "Free Demo Trial Pass", "Free Trial" },
                    { 2, "Month", "Join Kids Batch", "[\"Mon - Fri Kids Batches\", \"Choice of 4-6 Yrs or 6-12 Yrs slot\", \"Stage performance showcase\", \"Regular progress feedback\"]", false, 2000m, "Kids Monthly Membership (4-12 Yrs)", "Kids Monthly Pass" },
                    { 3, "Month", "Join Adults Batch", "[\"Mon - Fri Regular Classes\", \"Dance Fitness / Beginner / Advanced\", \"Choice of Morning or Evening Slot\", \"1 Free Demo Trial included\"]", true, 2500m, "Adults / Fitness Monthly Pass", "Adults Monthly Pass" }
                });

            migrationBuilder.InsertData(
                table: "Schedules",
                columns: new[] { "Id", "AvailableSlots", "ClassName", "Day", "Instructor", "Level", "StudioRoom", "Style", "Time", "TotalSlots" },
                values: new object[,]
                {
                    { 1, 15, "Dance Fitness (Any Age)", "Monday", "Ethos Master Team", "All Ages", "Studio A", "Morning Fitness", "07:30 AM - 08:30 AM", 25 },
                    { 2, 12, "Adults Batch (Beginner)", "Monday", "Ethos Choreographer", "Beginner", "Studio A", "Adults Beginner", "09:00 AM - 10:00 AM", 20 },
                    { 3, 10, "Kids Batch (4-6 Years)", "Monday", "Ethos Kids Lead", "Ages 4-6", "Studio B", "Kids Batch", "05:00 PM - 06:00 PM", 15 },
                    { 4, 8, "Adults Batch (Beginner)", "Monday", "Ethos Choreographer", "Beginner", "Studio A", "Adults Evening", "06:00 PM - 07:00 PM", 20 },
                    { 5, 10, "Kids Batch (6-12 Years)", "Monday", "Ethos Kids Lead", "Ages 6-12", "Studio B", "Kids Batch", "07:00 PM - 08:00 PM", 20 },
                    { 6, 6, "Adults Batch (Advanced)", "Monday", "Ethos Master Director", "Advanced", "Studio A", "Adults Advanced", "08:00 PM - 09:00 PM", 15 }
                });

            migrationBuilder.InsertData(
                table: "Settings",
                columns: new[] { "Id", "Key", "Value" },
                values: new object[,]
                {
                    { 1, "RazorpayKeyId", "rzp_test_RhythmPulse2025" },
                    { 2, "RazorpayKeySecret", "Secret_Demo_Key_9981" },
                    { 3, "AdminUsername", "admin" },
                    { 4, "AdminPassword", "adminpass" },
                    { 5, "AdminPhone", "+91 9876543210" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "CustomerCode", "Email", "IsActive", "Name", "PasswordHash", "Phone", "Role" },
                values: new object[] { 1025, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "ETH1025", "shanmuka@gmail.com", true, "Shanmuka Gaddam", "ethos123", "9876543210", "Student" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Classes");

            migrationBuilder.DropTable(
                name: "CustomerPackages");

            migrationBuilder.DropTable(
                name: "Instructors");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "OtpVerifications");

            migrationBuilder.DropTable(
                name: "Packages");

            migrationBuilder.DropTable(
                name: "PaymentRecords");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Workshops");
        }
    }
}
