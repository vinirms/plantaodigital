using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Linq;

namespace Backend.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/Paciente/Nutricao")]
    public class PacienteNutriController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PacienteNutriController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/Paciente/setor/UROLOGIA
//         [HttpGet("{nomePaciente}")]
//         public IActionResult GetPorSetor(string nomePaciente)
//         {
//             var pacieteNutri = _context.PacienteNutri
//                 .Where(p => p.NomePaciente == nomePaciente)
//                 .Select(p => new
//                 {
//                     p.Id,
//                     p.EnfLeito,
//                     p.NomePaciente,
//                     p.Idade,
//                     p.Prontuario,
//                     p.DataInternacao,
//                     p.Clinica,
//                     p.SwabData,
//                     p.Alergias,
//                     p.Setor
//                 })
//                 .ToList();

//             if (!pacientes.Any())
//                 return NotFound("Nenhum paciente encontrado para este setor");

//             return Ok(pacientes);
//         }

       
//         [HttpGet("filtrar")]
//         public IActionResult Filtrar(
//             [FromQuery] string? enfLeito,
//             [FromQuery] string? nome,
//             [FromQuery] string? clinica,
//             [FromQuery] string? setorLogin
//         )
//         {
            
//             //var query = _context.Pacientes.AsQueryable();
//             var query = _context.Pacientes
//                 .Where(p => p.Setor == setorLogin);

//             if (!string.IsNullOrEmpty(enfLeito))
//                 query = query.Where(p => p.EnfLeito.Contains(enfLeito));

//             if (!string.IsNullOrEmpty(nome))
//                 query = query.Where(p => p.NomePaciente.Contains(nome));

//             //if (!string.IsNullOrEmpty(clinica))
//             //    query = query.Where(p => p.Clinica == clinica);

//             var pacientes = query
//                 .Select(p => new {
//                     p.Id,
//                     p.NomePaciente,
//                     p.Idade,
//                     p.Prontuario,
//                     p.EnfLeito,
//                     p.Clinica
//                 })
//                 .ToList();

//             return Ok(pacientes);

            
// }

        [HttpGet("{nomePaciente}")]
        public async Task<IActionResult> BuscarPorNome(string nomePaciente)
        {
            var paciente = await _context.NuPaciente.FirstOrDefaultAsync(p => p.NomePaciente == nomePaciente);

            if (paciente == null)
                return NotFound("Paciente não encontrado");

            return Ok(paciente);
        }


        [HttpPost]
        public async Task<IActionResult> CriarPacienteNutri([FromBody] PacienteNutriCreateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

         
            var paciente = new PacienteNutri
            {
                EnfLeito = dto.EnfLeito,
                NomePaciente = dto.NomePaciente,
                Idade = dto.Idade,
                Prontuario = dto.Prontuario,
                DataInternacao = dto.DataInternacao,
                Diagnostico = dto.Diagnostico,
                TriagemResult = dto.TriagemResult,
                EstadoNutricional = dto.EstadoNutricional, 
                DataAvaliacao = dto.DataAvaliacao ,
                ViaAlimentar  = dto.ViaAlimentar ,
                DietaPrescrita = dto.DietaPrescrita ,
                AceitacaoDieta = dto.AceitacaoDieta ,
                UsoSuplemento   = dto.UsoSuplemento ,
                ProxAvaliacao  = dto.ProxAvaliacao, 
                Lactario  = dto.Lactario ,
                BigRefeicoes = dto.BigRefeicoes, 
                SmallRefeicoes = dto.SmallRefeicoes ,
                Anotacoes= dto.Anotacoes 

            };

            _context.NuPaciente.Add(paciente);
            await _context.SaveChangesAsync();

            return Ok(paciente);
        }


        [HttpPut("{nomePaciente}")]
        public async Task<IActionResult> AtualizarPaciente(string nomePaciente, [FromBody] PacienteNutriCreateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var paciente = await _context.NuPaciente.FirstOrDefaultAsync(p => p.NomePaciente == nomePaciente);

            if (paciente == null)
                return NotFound("Paciente não encontrado");

       
                paciente.EnfLeito = dto.EnfLeito;
                paciente.NomePaciente = dto.NomePaciente;
                paciente.Idade = dto.Idade;
                paciente.Prontuario = dto.Prontuario;
                paciente.DataInternacao = dto.DataInternacao;
                paciente.Diagnostico = dto.Diagnostico;
                paciente.TriagemResult = dto.TriagemResult;
                paciente.EstadoNutricional = dto.EstadoNutricional;
                paciente.DataAvaliacao = dto.DataAvaliacao;
                paciente.ViaAlimentar  = dto.ViaAlimentar ;
                paciente.DietaPrescrita = dto.DietaPrescrita ;
                paciente.AceitacaoDieta = dto.AceitacaoDieta ;
                paciente.UsoSuplemento   = dto.UsoSuplemento ;
                paciente.ProxAvaliacao  = dto.ProxAvaliacao;
                paciente.Lactario  = dto.Lactario ;
                paciente.BigRefeicoes = dto.BigRefeicoes;
                paciente.SmallRefeicoes = dto.SmallRefeicoes ;
                paciente.Anotacoes= dto.Anotacoes;
               
           await _context.SaveChangesAsync();

            return Ok(paciente);
        }

//         [HttpDelete("{id}")]
//         public IActionResult ExcluirPaciente(int id)
//         {
//             var paciente = _context.Pacientes.FirstOrDefault(p => p.Id == id);

//             if (paciente == null)
//                 return NotFound("Paciente não encontrado");

//             _context.Pacientes.Remove(paciente);
//             _context.SaveChanges();

//             return Ok(new { message = "Paciente excluído com sucesso" });
//         }

      [HttpGet("pdf/{setor}")]
       
        public async Task<IActionResult> GerarPdfPorSetor(string setor)
    {
        if (string.IsNullOrWhiteSpace(setor))
            return BadRequest("Setor não informado.");

        setor = setor.Trim().ToUpper();

        var NuPaciente = await _context.NuPaciente
            .AsNoTracking()
            .OrderBy(p => p.EnfLeito)
            .ToListAsync();

        if (!NuPaciente.Any())
            return NotFound($"Nenhum paciente encontrado para o setor {setor}.");

        byte[] pdfBytes;

        try
        {
            pdfBytes = PdfProducaoService.Gerar(NuPaciente, setor);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao gerar PDF: {ex.Message}");
        }

        //  try 
        //     { var profissional = User.FindFirst("profissional")?.Value;
            
        //         await _logService.RegistrarAsync(
        //             profissional: profissional,
        //             acaoRealizada: "Gerou um PDF da Passagem de Plantao - {setor}"
        //         ); 
        //     }
        //     catch (Exception ex) 
        //         { 
        //              _logger.LogError(ex, "Falha ao gerar PDF passagem de plantao");

        //         }

        return File(
            pdfBytes,
            "application/pdf",
            $"Producao_{setor}_{DateTime.Now:ddMMyyyy}.pdf"
        );
    }

       
    }
}
