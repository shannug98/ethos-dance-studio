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

// 2. Configure Database Connection
var azureConnectionString = builder.Configuration.GetConnectionString("AzureSqlConnection") 
    ?? builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<DanceStudioDbContext>(options =>
{
    if (!string.IsNullOrEmpty(azureConnectionString) 
        && azureConnectionString.Contains("database.windows.net") 
        && !azureConnectionString.Contains("YOUR_AZURE_SERVER"))
    {
        options.UseSqlServer(azureConnectionString, sqlOptions => sqlOptions.EnableRetryOnFailure());
    }
    else
    {
        var localSqliteConn = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=dancestudio.db";
        options.UseSqlite(localSqliteConn);
    }
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

// 6. Ensure Database Created Automatically
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DanceStudioDbContext>();
    db.Database.EnsureCreated();
}

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
