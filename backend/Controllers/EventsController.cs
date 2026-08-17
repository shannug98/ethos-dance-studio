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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventWorkshop>>> GetEvents()
        {
            return await _context.Workshops.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventWorkshop>> GetEvent(int id)
        {
            var eventItem = await _context.Workshops.FindAsync(id);
            if (eventItem == null) return NotFound();
            return eventItem;
        }
    }
}
