using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using DanceStudio.API.Controllers;
using DanceStudio.API.Data;
using DanceStudio.API.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Controllers & OpenAPI/Swagger to Container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2. Configure Database Connection (Supabase PostgreSQL with fallback)
// 2. Configure Supabase PostgreSQL
var supabaseConn = builder.Configuration.GetConnectionString("SupabaseConnection");

if (string.IsNullOrWhiteSpace(supabaseConn))
{
    throw new InvalidOperationException(
        "SupabaseConnection is missing from the connection string configuration.");
}

builder.Services.AddDbContext<DanceStudioDbContext>(options =>
{
    options.UseNpgsql(supabaseConn);
});

// 3. Register JWT Bearer Authentication & Role-Based Access Control (RBAC)
var key = Encoding.UTF8.GetBytes(AuthController.JwtSecretKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = "EthosDanceStudioAPI",
        ValidateAudience = true,
        ValidAudience = "EthosDanceStudioClient",
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

// 4. Register Application Services
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<INotificationService, NotificationService>();

// 5. Enable CORS for React Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 6. Database Initialization handled via EF Core Migrations (Add-Migration & Update-Database)

// 7. HTTP Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseAuthentication(); // 🔐 Enable JWT Authentication
app.UseAuthorization();  // 🛡️ Enable Role-Based Authorization (RBAC)

app.MapControllers();

app.Run();
