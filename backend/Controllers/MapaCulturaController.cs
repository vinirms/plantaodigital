using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
  
    [Route("api/MapaCulturas")]
     [Authorize]
    public class CulturasController : ControllerBase
    {
        private readonly ILogger<CulturasController> _logger;
        private readonly AppDbContext _context;
        private readonly CryptoService _crypto;

        private readonly LogService _logService;
        public CulturasController(AppDbContext context, CryptoService crypto, LogService logService,ILogger<CulturasController> logger)
        {
            _context = context;
            _crypto = crypto;
            _logService = logService;
            _logger = logger;

        }

        // GET api/MapaCulturas
        //busca todos os pacientes da tabela apenas quando e ccih
        [HttpGet] 
        [Authorize]
        public async Task<IActionResult> GetTodas()
        {
            var culturas = await _context.MapaCulturas
                
                .Select(c => new
                {
                    c.Id,
                    c.EnfLeito,
                    c.NomePaciente,
                    c.Prontuario,
                    c.Setor,
                    c.Atualizado,
                    c.SwabNasal,
                    c.SwabOral,
                    c.SwabRetal,
                    c.SecrecaoTraqueal,
                    c.Hemocultura,
                    c.Urocultura,
                    c.FragOsso,
                    c.FragPele,
                    c.FragMoles,
                    c.Infos,
                    c.TagERC,
                    c.TagMRSA,
                    c.TagCRAB,
                    c.TagTB,
                    c.TagKPC,
                    c.Precaucao
                    // c.UltimaColeta
                })
                .ToListAsync();

            return Ok(culturas);
        }


        // GET api/MapaCulturas/setor/UROLOGIA
        // busca os pacientes de apenas um setor, quando nao e a ccih
        [HttpGet("setor/{setor}")] 
        [Authorize]
        public async Task<IActionResult> GetPorSetor(string setor)
        {
            var culturas = await _context.MapaCulturas
                .Where(c => c.Setor == setor)
                .Select(c => new
                {
                    c.Id,
                    c.EnfLeito,
                    c.NomePaciente,
                    c.Prontuario,
                    c.Setor,
                    c.Atualizado,
                    c.SwabNasal,
                    c.SwabOral,
                    c.SwabRetal,
                    c.SecrecaoTraqueal,
                    c.Hemocultura,
                    c.Urocultura,
                    c.FragOsso,
                    c.FragPele,
                    c.FragMoles,
                    c.Infos,
                    c.TagERC,
                    c.TagMRSA,
                    c.TagCRAB,
                    c.TagTB,
                    c.TagKPC,
                    c.Precaucao
                    // c.UltimaColeta
                })
                .ToListAsync();

            return Ok(culturas);
        }
        [HttpPut("{nomePaciente}")]
         [Authorize]
        public async Task<IActionResult> AtualizarPacienteMapaCultura(string nomePaciente, [FromBody] PacienteMapaCulturaDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pacienteMapaCultura = await _context.MapaCulturas.FirstOrDefaultAsync(p => p.NomePaciente == nomePaciente);

            if (pacienteMapaCultura == null)
                return NotFound("Paciente não encontrado");


            pacienteMapaCultura.EnfLeito = dto.EnfLeito;
            pacienteMapaCultura.NomePaciente = dto.NomePaciente;
            pacienteMapaCultura.Prontuario = dto.Prontuario;
            pacienteMapaCultura.Setor = dto.Setor;
            pacienteMapaCultura.SwabNasal = dto.SwabNasal;
            pacienteMapaCultura.SwabOral = dto.SwabOral;
            pacienteMapaCultura.SwabRetal = dto.SwabRetal;
            pacienteMapaCultura.SecrecaoTraqueal = dto.SecrecaoTraqueal;
            pacienteMapaCultura.Hemocultura = dto.Hemocultura;
            pacienteMapaCultura.Urocultura = dto.Urocultura;
            pacienteMapaCultura.FragOsso = dto.FragOsso;
            pacienteMapaCultura.FragPele = dto.FragPele;
            pacienteMapaCultura.FragMoles = dto.FragMoles;
            pacienteMapaCultura.Infos = dto.Infos;
            pacienteMapaCultura.TagERC = dto.TagERC;
            pacienteMapaCultura.TagMRSA = dto.TagMRSA;
            pacienteMapaCultura.TagCRAB = dto.TagCRAB;
            pacienteMapaCultura.TagTB = dto.TagTB;
            pacienteMapaCultura.TagKPC = dto.TagKPC;
            pacienteMapaCultura.Precaucao = dto.Precaucao;

            // pacienteMapaCultura.UltimaColeta = dto.UltimaColeta;




           await _context.SaveChangesAsync();
            var profissional = User.FindFirst("profissional")?.Value;
            try 
            { 
            
                await _logService.RegistrarAsync(
                    profissional: profissional,
                    acaoRealizada: "Atualizou o registro do paciente",
                    nomePaciente: pacienteMapaCultura.NomePaciente
                ); 
            }
            catch (Exception ex) 
                { 
                _logger.LogError(ex, "Falha ao atualizar registro do parciente por {profissional}", profissional);

                }

            return Ok(pacienteMapaCultura);
        }


        // DELETE api/culturas/{id}
        [HttpDelete("{id}")]
         [Authorize]
        public async Task<IActionResult> Excluir(int id)
        {
            var cultura = await _context.MapaCulturas.FirstOrDefaultAsync(c => c.Id == id);

            if (cultura == null)
                return NotFound("Registro não encontrado");

            _context.MapaCulturas.Remove(cultura);
            await _context.SaveChangesAsync();

            try 
            { var profissional = User.FindFirst("profissional")?.Value;
            
                await _logService.RegistrarAsync(
                    profissional: profissional,
                    acaoRealizada: "Excluiu o registro do paciente - mapa de cultura",
                    nomePaciente: cultura.NomePaciente
                ); 
            }
            catch (Exception ex) 
                { 
                 _logger.LogError(ex, "Falha ao deletar registro do parciente");

                }
            return Ok(new { message = "Registro excluído com sucesso" });
        }



        [HttpGet("filtrar")] //filtra a tabela de culturas
         [Authorize]
        public async Task<IActionResult> Filtrar(
            [FromQuery] string? enfLeito,
            [FromQuery] string? nome,
            [FromQuery] string? setor


        )
        {
            var query = _context.MapaCulturas.AsQueryable();
            // var query = _context.MapaCulturas
            //          .Where(p => p.Setor == setor);

            if (!string.IsNullOrEmpty(enfLeito))
                query = query.Where(p => p.EnfLeito.Contains(enfLeito));

            if (!string.IsNullOrEmpty(nome))
                query = query.Where(p => p.NomePaciente.Contains(nome));
                
            if (!string.IsNullOrEmpty(setor))
                query = query.Where(p => p.Setor.Contains(setor));


            var MapaCultura = await query
                .Select(m => new {
                    m.Id,
                    m.EnfLeito,
                    m.NomePaciente,
                    m.Prontuario,
                    m.Setor,
                    m.Atualizado,
                    m.SwabNasal,
                    m.SwabOral,
                    m.SwabRetal,
                    m.SecrecaoTraqueal,
                    m.Hemocultura,
                    m.Urocultura,
                    m.FragOsso,
                    m.FragPele,
                    m.FragMoles,
                    m.Infos,
                    m.TagERC,
                    m.TagMRSA,
                    m.TagCRAB,
                    m.TagTB,
                    m.TagKPC,
                    m.Precaucao

                })
                .ToListAsync();

            return Ok(MapaCultura);


        }


        //buscar paciente na tabela pacientes para adicionar ja nos campos para add na tabela de culturas
        [HttpGet("Busca")] 
         [Authorize]
        public async Task<IActionResult> Busca(
        [FromQuery] string? enfLeito,
        [FromQuery] string? nome)
        {
        var query = _context.Pacientes.AsQueryable();

        if (!string.IsNullOrEmpty(nome))
        query = query.Where(p => EF.Functions.Like(p.NomePaciente, $"{nome}%"));

        // if (!string.IsNullOrEmpty(enfLeito))
        // query = query.Where(p => p.EnfLeito.Contains(enfLeito));
        if (!string.IsNullOrEmpty(enfLeito))
            {
                var enfLeitoDecoded = Uri.UnescapeDataString(enfLeito); // decode do %2F
                Console.WriteLine($"enfLeito recebido: '{enfLeito}' | decoded: '{enfLeitoDecoded}'");
                query = query.Where(p => EF.Functions.Like(p.EnfLeito, $"%{enfLeitoDecoded}%"));
            }
        var paciente = await query
        .Select(p => new {
        p.Id,
        p.EnfLeito,
        p.NomePaciente,
        p.Prontuario,
        p.Setor,
        p.ChaveComposta
        })
        .ToListAsync();

        return Ok(paciente);
        }



        [HttpPost]
         [Authorize]
        public async Task<IActionResult> CriarPacienteMapaCultura([FromBody] PacienteMapaCulturaDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pacienteMapaCultura = new Culturas
            {
                EnfLeito = dto.EnfLeito,
                NomePaciente = dto.NomePaciente,
                Prontuario = dto.Prontuario,
                Setor = dto.Setor,
                SwabNasal = dto.SwabNasal,
                SwabOral = dto.SwabOral,
                SwabRetal = dto.SwabRetal,
                SecrecaoTraqueal = dto.SecrecaoTraqueal,
                Hemocultura = dto.Hemocultura,
                Urocultura = dto.Urocultura,
                FragOsso = dto.FragOsso,
                FragPele = dto.FragPele,
                FragMoles = dto.FragMoles,
                Infos = dto.Infos,
                TagERC=dto.TagERC,
                TagMRSA=dto.TagMRSA,
                TagCRAB=dto.TagCRAB,
                TagTB=dto.TagTB,
                TagKPC=dto.TagKPC,
                Precaucao=dto.Precaucao,
                ChaveComposta=dto.ChaveComposta

            };

            _context.MapaCulturas.Add(pacienteMapaCultura);
           await _context.SaveChangesAsync();

            try 
            { var profissional = User.FindFirst("profissional")?.Value;
            
                await _logService.RegistrarAsync(
                    profissional: profissional,
                    acaoRealizada: $"Atualizou o mapa de cultura do paciente {dto.NomePaciente} no setor {dto.Setor}"
                ); 
            }
            catch (Exception ex) 
                { 
                    _logger.LogError(ex, "Falha ao inserir registro no mapa de cultura");

                }

            return Ok(pacienteMapaCultura);
        }


        [HttpGet("pdf/{setor}")]
         [Authorize]
        public async Task<IActionResult> GerarPdfPorSetor(string setor)
        {
            if (string.IsNullOrWhiteSpace(setor))
                return BadRequest("Setor não informado.");

            setor = setor.Trim().ToUpper();

            var mapaCultura = await _context.MapaCulturas
                .AsNoTracking()
                .Where(c => c.Setor.ToUpper() == setor)
                .OrderBy(c => c.EnfLeito)
                .ToListAsync();

            if (!mapaCultura.Any())
                return NotFound($"Nenhum cultura encontrado para o setor {setor}.");

            byte[] pdfBytes;

            try
            {
                pdfBytes = PdfMapaCulturaService.Gerar(mapaCultura, setor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao gerar PDF: {ex.Message}");
            }

             try 
            { var profissional = User.FindFirst("profissional")?.Value;
            
                await _logService.RegistrarAsync(
                    profissional: profissional,
                    acaoRealizada: "Gerou um PDF do Mapa de Cultura - CCIH"
                ); 
            }
            catch (Exception ex) 
                { 
                 _logger.LogError(ex, "Falha ao gerar PDF do mapa de cultura CCIH");

                }

            return File(
                pdfBytes,
                "application/pdf",
                $"Mapa_Cultura_{setor}_{DateTime.Now:ddMMyyyy}.pdf"
            );
        }

        

    }
}
