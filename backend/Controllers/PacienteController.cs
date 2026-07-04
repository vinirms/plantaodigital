using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Linq;

namespace Backend.Controllers
{   [Authorize]
    [ApiController]
    [Route("api/Paciente")]
    public class PacienteController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<PacienteController> _logger;
        private readonly LogService _logService;

        public PacienteController(AppDbContext context, LogService logService,ILogger<PacienteController> logger )
        {
            _context = context;
            _logService = logService;
            _logger = logger;

        }

        // GET api/Paciente/setor/UROLOGIA
        [HttpGet("setor/{setor}")]
        [Authorize]
        public async Task<IActionResult> GetPorSetor(string setor)
        {
            var pacientes = await _context.Pacientes
                .Where(p => p.Setor == setor)
                .Select(p => new
                {
                    p.Id,
                    p.EnfLeito,
                    p.NomePaciente,
                    p.Idade,
                    p.Prontuario,
                    p.DataInternacao,
                    p.Clinica,
                    p.SwabData,
                    p.Alergias,
                    p.Setor,
                    p.Pendencia
                })
                .ToListAsync();

            // if (!pacientes.Any())
            //     return NotFound("Nenhum paciente encontrado para este setor");

            return Ok(pacientes);
        }

       
        [HttpGet("filtrar")]
        public async Task<IActionResult> Filtrar(
            [FromQuery] string? enfLeito,
            [FromQuery] string? nome,
            [FromQuery] string? setorLogin
        )
        {
            
            //var query = _context.Pacientes.AsQueryable();
            var query = _context.Pacientes
                .Where(p => p.Setor == setorLogin);


            if (!string.IsNullOrEmpty(enfLeito))
                query = query.Where(p => p.EnfLeito.Contains(enfLeito));

            if (!string.IsNullOrEmpty(nome))
                query = query.Where(p => p.NomePaciente.Contains(nome));


            var pacientes = await query
                .Select(p => new {
                    p.Id,
                    p.NomePaciente,
                    p.Idade,
                    p.Prontuario,
                    p.EnfLeito,
                    p.Clinica,
                    p.DataInternacao,
                    p.Pendencia
                })
                .ToListAsync();

            if (pacientes == null)
                return NotFound("Paciente não encontrado");

            return Ok(pacientes);

            
}

        [HttpGet("{id}")]
       
        public async Task<IActionResult> GetPorId(int id)
        {
        var paciente = await _context.Pacientes.FindAsync(id);

            if (paciente == null)
                return NotFound("Paciente não encontrado");

            return Ok(paciente);
        }


        [HttpPost]
        
        public async Task<IActionResult> CriarPaciente([FromBody] PacienteCreateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

          if (await _context.Pacientes.AnyAsync(p => p.ChaveComposta == dto.ChaveComposta))
            {
            // verifica se o  leito + setor (chave composta) ja esta ocupado, evita duplicacao de leito no mesmo setor 

                ModelState.AddModelError("EnfLeito", "Leito já está em uso neste setor!");
                return BadRequest(ModelState);  // Retorna 400 com erro customizado
            }
        if (await _context.Pacientes.AnyAsync(p => p.NomePaciente == dto.NomePaciente && p.Setor == dto.Setor))
            {
            // verifica se o nome e o setor+leito sao iguais, para evitar o mesmo nome no mesmo setor, mas permitir em setores diferentees.

                ModelState.AddModelError("Nome", "O nome do paciente ja está registrado!");
                return BadRequest(ModelState);  // Retorna 400 com erro customizado
            } 
            var paciente = new Paciente
            {
                EnfLeito = dto.EnfLeito,
                NomePaciente = dto.NomePaciente,
                Idade = dto.Idade,
                Prontuario = dto.Prontuario,
                DataInternacao = dto.DataInternacao,
                Clinica = dto.Clinica,

		        Dieta = dto.Dieta,
                DietaDescricao= dto.DietaDescricao,

                Diagnostico = dto.Diagnostico,


                AcessoAvpTipo = dto.AcessoAvpTipo,
                JelcoAvp = dto.JelcoAvp,
                AcessoAvpData = dto.AcessoAvpData,
                AcessoCvcTipo = dto.AcessoCvcTipo,
                AcessoCvcData = dto.AcessoCvcData,
                AcessoCdlTipo = dto.AcessoCdlTipo,
                AcessoCdlData = dto.AcessoCdlData,
                AcessoPaiTipo = dto.AcessoPaiTipo,
                AcessoPaiData = dto.AcessoPaiData,

                Alergias = dto.Alergias,
                AlergiaDescricao = dto.AlergiaDescricao,

                Curativo = dto.Curativo,
                Exames = dto.Exames,
                Diurese = dto.Diurese,
                Evacuacao = dto.Evacuacao,
                EvacuacaoUFI = dto.EvacuacaoUFI,

                Drenos = dto.Drenos,
                DrenosDescricao = dto.DrenosDescricao,

                Ostomias = dto.Ostomias,
                OstomiasDescricao = dto.OstomiasDescricao,
                SwabData = dto.SwabData,
                Intercorrencias = dto.Intercorrencias,
                Cirurgias = dto.Cirurgias,

                Ventilacao = dto.Ventilacao,
                VentilacaoDescricao = dto.VentilacaoDescricao,
                Setor = dto.Setor,
                Mobilidade = dto.Mobilidade,
                PulseiraID= dto.PulseiraID,
                NivConsciencia= dto.NivConsciencia,
                Infusoes = dto.Infusoes,
                Comorbidades = dto.Comorbidades,
                Pendencia = dto.Pendencia,
                ChaveComposta= dto.ChaveComposta,
                AdmPor= dto.AdmPor,
                
 
            };

            _context.Pacientes.Add(paciente);
           await _context.SaveChangesAsync();

             try 
            { var profissional = User.FindFirst("profissional")?.Value;

                await _logService.RegistrarAsync(
                    profissional: profissional,
                    acaoRealizada: $"Inseriu o paciente {dto.NomePaciente} no setor {dto.Setor}"
                ); 
            }
            catch (Exception ex) 
                { 
                     _logger.LogError(ex, "Falha ao inserir registro do paciente na admissão");

                }

            return CreatedAtAction(
                nameof(GetPorId),
                new { id = paciente.Id },
                paciente
            );
        }


        [HttpPut("{id}")]
        
        public async Task<IActionResult> AtualizarPaciente(int id, [FromBody] PacienteCreateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var paciente = await _context.Pacientes.FirstOrDefaultAsync(p => p.Id == id);

           
            if (paciente == null)
                return NotFound("Paciente não encontrado");

            // verifica se o paciente no leito + setor (chave composta) é diferente do id, 
            // para poder fazer a transferencia, evita erro de leitos iguais
            if ( await _context.Pacientes.AnyAsync(p => p.ChaveComposta == dto.ChaveComposta && p.Id != id))
            {
                ModelState.AddModelError("EnfLeito", "Leito já ocupado neste setor!");
                return BadRequest(ModelState);
            }

            // verifica se o nome e o setor sao iguais, para evitar o  mesmo nome no mesmo setor, mas permitir em setores diferentees.
            if (await _context.Pacientes.AnyAsync(p => p.NomePaciente == dto.NomePaciente && p.Setor == dto.Setor && p.Id != id))
            {
                ModelState.AddModelError("NomePaciente", "Já tem um paciente com este mesmo nome, tente novamente!");
                return BadRequest(ModelState);
            }
                paciente.EnfLeito = dto.EnfLeito;
                paciente.NomePaciente = dto.NomePaciente;
                paciente.Idade = dto.Idade;
                paciente.Prontuario   = dto.Prontuario;
                paciente.DataInternacao = dto.DataInternacao;
                paciente.Clinica = dto.Clinica;

                paciente.Dieta = dto.Dieta;
                paciente.DietaDescricao = dto.DietaDescricao;


                paciente.Diagnostico = dto.Diagnostico;

                paciente.Alergias = dto.Alergias;
                paciente.AlergiaDescricao = dto.AlergiaDescricao;
                  
                
                paciente.AcessoAvpTipo = dto.AcessoAvpTipo;
                paciente.JelcoAvp = dto.JelcoAvp;
                paciente.AcessoAvpData = dto.AcessoAvpData;
                paciente.AcessoCvcTipo = dto.AcessoCvcTipo;
                paciente.AcessoCvcData = dto.AcessoCvcData;
                paciente.AcessoCdlTipo = dto.AcessoCdlTipo;
                paciente.AcessoCdlData = dto.AcessoCdlData;
                paciente.AcessoPaiTipo = dto.AcessoPaiTipo;
                paciente.AcessoPaiData = dto.AcessoPaiData;


                paciente.Curativo = dto.Curativo;
                paciente.Exames = dto.Exames;
                paciente.Diurese = dto.Diurese;

                paciente.Evacuacao = dto.Evacuacao;
                paciente.EvacuacaoUFI = dto.EvacuacaoUFI;


                paciente.Drenos = dto.Drenos;
                paciente.DrenosDescricao = dto.DrenosDescricao;


                paciente.Ostomias = dto.Ostomias;
                paciente.OstomiasDescricao = dto.OstomiasDescricao;
                    

                paciente.SwabData = dto.SwabData;
                paciente.Intercorrencias = dto.Intercorrencias;
                paciente.Cirurgias = dto.Cirurgias;

                paciente.Ventilacao = dto.Ventilacao;
                paciente.VentilacaoDescricao = dto.VentilacaoDescricao;
                   

                paciente.Setor = dto.Setor;
                paciente.Mobilidade= dto.Mobilidade;
                paciente.PulseiraID= dto.PulseiraID;
                paciente.NivConsciencia= dto.NivConsciencia;
                paciente.Infusoes = dto.Infusoes;
                paciente.Comorbidades = dto.Comorbidades;
                paciente.AttProfissional = dto.AttProfissional;
                paciente.Pendencia = dto.Pendencia;

                paciente.ChaveComposta= dto.ChaveComposta;

               
            await _context.SaveChangesAsync();

            //   try 
            // { var profissional = User.FindFirst("profissional")?.Value;
            
            //     await _logService.RegistrarAsync(
            //         profissional: profissional,
            //         acaoRealizada: $"Atualizou o registro do paciente {dto.NomePaciente}"
            //     ); 
            // }
            // catch (Exception ex) 
            //     { 
            //         _logger.LogError(ex, "Falha ao atualizar registro do paciente");

            //     }

            return Ok(paciente);
        }

        [HttpDelete("{id}")]
        
        public async Task<IActionResult> ExcluirPaciente(int id)
        {
            var paciente = await _context.Pacientes.FirstOrDefaultAsync(p => p.Id == id);

            if (paciente == null)
                return NotFound("Paciente não encontrado");

            _context.Pacientes.Remove(paciente);
            await _context.SaveChangesAsync();

              try 
            { var profissional = User.FindFirst("profissional")?.Value;
            
                await _logService.RegistrarAsync(
                    profissional: profissional,
                    acaoRealizada: $"Excluiu o registro do paciente {paciente.NomePaciente} no setor {paciente.Setor}"
                ); 
            }
            catch (Exception ex) 
                { 
                    _logger.LogError(ex, "Falha ao deletar registro do paciente");

                }

            return Ok(new { message = "Paciente excluído com sucesso" });
        }

        [HttpGet("pdf/{setor}")]
       
        public async Task<IActionResult> GerarPdfPorSetor(string setor)
    {
        if (string.IsNullOrWhiteSpace(setor))
            return BadRequest("Setor não informado.");

        setor = setor.Trim().ToUpper();

        var pacientes = await _context.Pacientes
            .AsNoTracking()
            .Where(p => p.Setor.ToUpper() == setor)
            .OrderBy(p => p.EnfLeito)
            .ToListAsync();

        if (!pacientes.Any())
            return NotFound($"Nenhum paciente encontrado para o setor {setor}.");

        byte[] pdfBytes;

        try
        {
            pdfBytes = PdfPacienteService.Gerar(pacientes, setor);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao gerar PDF: {ex.Message}");
        }

         try 
            { var profissional = User.FindFirst("profissional")?.Value;
            
                await _logService.RegistrarAsync(
                    profissional: profissional,
                    acaoRealizada: $"Gerou um PDF da Passagem de Plantao - {setor}"
                ); 
            }
            catch (Exception ex) 
                { 
                     _logger.LogError(ex, "Falha ao gerar PDF passagem de plantao");

                }

            var dataHoje = DateTime.Now.ToString("dd-MM-yy", System.Globalization.CultureInfo.InvariantCulture);
            var nomeArquivo = $"Passagem_Plantao_{setor}_{dataHoje}.pdf";

            Console.WriteLine($"[DEBUG] Data: {dataHoje}");
            Console.WriteLine($"[DEBUG] Nome do arquivo: {nomeArquivo}");
            
            return File(pdfBytes, "application/pdf", nomeArquivo);

        // return File(
        //     pdfBytes,
        //     "application/pdf",
        //     $"Passagem_Plantao_{setor}_{DateTime.Now:ddMMyyyy}.pdf"
        // );
    }

       
    }
}
