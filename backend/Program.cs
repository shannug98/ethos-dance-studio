using Microsoft.EntityFrameworkCore;
using DanceStudio.API.Data;
using DanceStudio.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add Services to Container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Azure SQL Database or Local SQLite Database
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

// Register Application Services
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<INotificationService, NotificationService>();

// Enable CORS for React Frontend
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

// Ensure Database is Created & Seeded automatically (Ensure Created)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DanceStudioDbContext>();
    db.Database.EnsureCreated();
}

// HTTP Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();
