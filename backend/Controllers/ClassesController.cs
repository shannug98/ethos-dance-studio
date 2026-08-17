using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DanceStudio.API.Data;
using DanceStudio.API.Models;

namespace DanceStudio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClassesController : ControllerBase
    {
        private readonly DanceStudioDbContext _context;

        public ClassesController(DanceStudioDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DanceClass>>> GetClasses([FromQuery] string? category)
        {
            if (string.IsNullOrEmpty(category) || category.Equals("All", StringComparison.OrdinalIgnoreCase))
            {
                return await _context.Classes.ToListAsync();
            }

            return await _context.Classes
                .Where(c => c.Category.ToLower().Contains(category.ToLower()))
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DanceClass>> GetClass(int id)
        {
            var danceClass = await _context.Classes.FindAsync(id);
            if (danceClass == null) return NotFound();
            return danceClass;
        }
    }
}
