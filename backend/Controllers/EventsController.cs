using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DanceStudio.API.Data;
using DanceStudio.API.Models;

namespace DanceStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly DanceStudioDbContext _context;

        public EventsController(DanceStudioDbContext context)
        {
            _context = context;
        }

        // Public Catalog - Allow anonymous visitors to view upcoming masterclasses
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventWorkshop>>> GetEvents()
        {
            return await _context.Workshops.ToListAsync();
        }

        // Public Details - Allow anonymous visitors to view single event
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<EventWorkshop>> GetEvent(int id)
        {
            var eventItem = await _context.Workshops.FindAsync(id);
            if (eventItem == null) return NotFound();
            return eventItem;
        }

        // 🛡️ Protected Endpoint - Requires 'Admin' Role via JWT Token
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<EventWorkshop>> CreateEvent([FromBody] EventWorkshop newEvent)
        {
            if (string.IsNullOrEmpty(newEvent.Title))
            {
                return BadRequest(new { Message = "Event title is required." });
            }

            _context.Workshops.Add(newEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEvent), new { id = newEvent.Id }, newEvent);
        }
    }
}
