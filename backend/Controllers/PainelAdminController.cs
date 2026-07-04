using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore; 

namespace Backend.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/Admin")]
    public class PainelAdminController : ControllerBase
    {
        private readonly AppDbContext _context;
   
        public PainelAdminController(AppDbContext context)
        {
           _context = context;
        }

  
        [HttpGet("AutorizarAdmin")]
        [Authorize]
        public async Task<IActionResult> ObterPerfil()
        {
            
            var nome = User.FindFirst(ClaimTypes.Name)?.Value ?? "Usuário";
            return Ok(new 
            { 
                nome
            });
        }

     [HttpGet("Logs")]
        [Authorize]
        public async Task<IActionResult> ObterLogs([FromQuery] int pagina = 1, [FromQuery] int itensPorPagina = 20)
        {
            var query = _context.LogsAcesso.OrderByDescending(l => l.Id);

            var total = await query.CountAsync();

            var logs = await query
                .Skip((pagina - 1) * itensPorPagina)
                .Take(itensPorPagina)
                .Select(l => new
                {
                    l.Id, l.Profissional, l.AcaoRealizada, l.DataHora, l.Ip
                })
                .ToListAsync();

            return Ok(new
            {
                total,
                pagina,
                itensPorPagina,
                totalPaginas = (int)Math.Ceiling((double)total / itensPorPagina),
                dados = logs
            });
        }
     
    }
}