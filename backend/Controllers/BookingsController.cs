using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DanceStudio.API.Data;
using DanceStudio.API.Models;
using DanceStudio.API.Services;

namespace DanceStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly DanceStudioDbContext _context;
        private readonly IPaymentService _paymentService;
        private readonly INotificationService _notificationService;

        public BookingsController(DanceStudioDbContext context, IPaymentService paymentService, INotificationService notificationService)
        {
            _context = context;
            _paymentService = paymentService;
            _notificationService = notificationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingRequest>>> GetAllBookings()
        {
            return await _context.Bookings.OrderByDescending(b => b.BookedAt).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<BookingRequest>> CreateBooking([FromBody] BookingRequest request)
        {
            if (string.IsNullOrEmpty(request.CustomerName) || string.IsNullOrEmpty(request.CustomerEmail))
            {
                return BadRequest(new { Message = "Customer name and email are required." });
            }

            // Process simulated payment
            var (success, txId, message) = await _paymentService.ProcessPaymentAsync(request.PricePaid, request.PaymentMethod, request.CustomerEmail);

            if (!success)
            {
                return BadRequest(new { Message = "Payment failed. Please try again." });
            }

            request.TransactionId = txId;
            request.PaymentStatus = "CONFIRMED";
            request.BookedAt = DateTime.UtcNow;

            _context.Bookings.Add(request);
            await _context.SaveChangesAsync();

            // Send notification confirmation
            await _notificationService.SendBookingConfirmationAsync(request.CustomerEmail, request.CustomerName, request.ItemTitle, txId);

            return CreatedAtAction(nameof(GetAllBookings), new { id = request.Id }, request);
        }
    }
}
