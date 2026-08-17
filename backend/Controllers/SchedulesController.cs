using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DanceStudio.API.Data;
using DanceStudio.API.Models;

namespace DanceStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SchedulesController : ControllerBase
    {
        private readonly DanceStudioDbContext _context;

        public SchedulesController(DanceStudioDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassSchedule>>> GetSchedules([FromQuery] string? day)
        {
            if (string.IsNullOrEmpty(day) || day.Equals("All", StringComparison.OrdinalIgnoreCase))
            {
                return await _context.Schedules.ToListAsync();
            }

            return await _context.Schedules
                .Where(s => s.Day.ToLower() == day.ToLower())
                .ToListAsync();
        }
    }
}
