using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Linq;
using System.Security.Claims;

namespace Backend.Controllers
{   [Authorize]
    [ApiController]
    [Route("api/Paciente/Imagem")]
    public class PacienteImagensController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<PacienteController> _logger;
        private readonly LogService _logService;
        private readonly GeminiService _gemini;
        public PacienteImagensController(AppDbContext context, LogService logService,ILogger<PacienteController> logger, GeminiService gemini )
        {
            _context = context;
            _logService = logService;
            _logger = logger;
            _gemini = gemini;
        }


        [HttpPost]
        public async Task<IActionResult> InserirPacienteImagem([FromBody] PacienteImagensDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Valida limite
            var total = await _context.PacienteImagem
                .CountAsync(p => p.PacienteId == dto.PacienteId);

            if (total >= 6)
                return BadRequest("Limite de 6 imagens por paciente atingido.");

            var pacienteImagem = new PacienteImagens
            {
                PacienteId  = dto.PacienteId,   // FK correta
                Imagem      = dto.Imagem,
                ContentType = dto.ContentType,
                DataUpload  = DateTime.Now   // sempre no servidor
            };

            _context.PacienteImagem.Add(pacienteImagem);
            await _context.SaveChangesAsync();

            // var usuario = User.FindFirstValue(ClaimTypes.Name);
            // await _logService.RegistrarAsync(usuario, $"Upload de imagem para paciente {dto.PacienteId}");

            return Ok(new { pacienteImagem.Id, pacienteImagem.DataUpload });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> ExcluirPacienteImagem(int id)
        {
            var imagem = await _context.PacienteImagem.FirstOrDefaultAsync(p => p.Id == id);

            if (imagem == null)
                return NotFound("Imagem não encontrada.");

            _context.PacienteImagem.Remove(imagem);
            await _context.SaveChangesAsync();

            // var usuario = User.FindFirstValue(ClaimTypes.Name);
            // await _logService.RegistrarAsync(usuario, $"Exclusão de imagem {id} do paciente {imagem.PacienteId}");

            return Ok(new { message = "Imagem excluída com sucesso." });
        }

// Metadados (sem o byte[] — pra listar no frontend)
        [HttpGet("{pacienteId}")]
        public async Task<IActionResult> ListarImagens(int pacienteId)
        {
            var imagens = await _context.PacienteImagem
                .Where(p => p.PacienteId == pacienteId)
                .Select(p => new { p.Id,p.ContentType, p.DataUpload, p.CondutaImg, p.DescricaoImg})
                .ToListAsync();

            return Ok(imagens);
        }

        // Servir a imagem de fato
        [HttpGet("Foto/{id}")]
        public async Task<IActionResult> BuscarFoto(int id)
        {
            var imagem = await _context.PacienteImagem.FindAsync(id);

            if (imagem == null)
                return NotFound();

            return File(imagem.Imagem, imagem.ContentType);
        }

      [HttpPost("Analisar/{id}")]
            public async Task<IActionResult> Analisar(int id)
            {
                var imagem = await _context.PacienteImagem.FindAsync(id);

                if (imagem == null)
                    return NotFound();

                var resposta = await _gemini.AnalisarImagem(
                    imagem.Imagem,
                    imagem.ContentType);

                // Salva a análise no banco
                imagem.DescricaoImg = resposta.DescricaoImg;
                imagem.CondutaImg = resposta.CondutaImg;

                await _context.SaveChangesAsync();

                return Ok(resposta);
            }

       
    }
}
