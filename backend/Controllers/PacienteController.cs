using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Linq;

namespace Backend.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/Paciente")]
    public class PacienteController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PacienteController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/Paciente/setor/UROLOGIA
        [HttpGet("setor/{setor}")]
        public IActionResult GetPorSetor(string setor)
        {
            var pacientes = _context.Pacientes
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
                    p.Setor
                })
                .ToList();

            if (!pacientes.Any())
                return NotFound("Nenhum paciente encontrado para este setor");

            return Ok(pacientes);
        }

       
        [HttpGet("filtrar")]
        public IActionResult Filtrar(
            [FromQuery] string? enfLeito,
            [FromQuery] string? nome,
            [FromQuery] string? clinica
        )
        {
            var query = _context.Pacientes.AsQueryable();

            if (!string.IsNullOrEmpty(enfLeito))
                query = query.Where(p => p.EnfLeito.Contains(enfLeito));

            if (!string.IsNullOrEmpty(nome))
                query = query.Where(p => p.NomePaciente.Contains(nome));

            if (!string.IsNullOrEmpty(clinica))
                query = query.Where(p => p.Clinica == clinica);

            var pacientes = query
                .Select(p => new {
                    p.Id,
                    p.NomePaciente,
                    p.Idade,
                    p.Prontuario,
                    p.EnfLeito,
                    p.Clinica
                })
                .ToList();

            return Ok(pacientes);

            
}

        [HttpGet("{id}")]
        public IActionResult GetPorId(int id)
        {
            var paciente = _context.Pacientes.FirstOrDefault(p => p.Id == id);

            if (paciente == null)
                return NotFound("Paciente não encontrado");

            return Ok(paciente);
        }


        [HttpPost]
        public IActionResult CriarPaciente([FromBody] PacienteCreateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var paciente = new Paciente
            {
                EnfLeito = dto.EnfLeito,
                NomePaciente = dto.NomePaciente,
                Idade = dto.Idade,
                Prontuario   = dto.Prontuario, 
                DataInternacao = dto.DataInternacao,
                Clinica = dto.Clinica,
                Dieta = dto.Dieta,
                Diagnostico = dto.Diagnostico,
                Alergias = dto.Alergias,
                AcessoData = dto.AcessoData,
                Curativo = dto.Curativo,
                Exames = dto.Exames,
                Diurese = dto.Diurese,
                Evacuacao = dto.Evacuacao,
                Drenos = dto.Drenos,
                Ostomias= dto.Ostomias,
                SwabData = dto.SwabData,
                Intercorrencias = dto.Intercorrencias,
                Cirurgias = dto.Cirurgias,
                Ventilacao= dto.Ventilacao,
                Setor = dto.Setor,
                Mobilidade= dto.Mobilidade
            };

            _context.Pacientes.Add(paciente);
            _context.SaveChanges();

            return CreatedAtAction(
                nameof(GetPorId),
                new { id = paciente.Id },
                paciente
            );
        }


        [HttpPut("{id}")]
        public IActionResult AtualizarPaciente(int id, [FromBody] PacienteCreateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var paciente = _context.Pacientes.FirstOrDefault(p => p.Id == id);

            if (paciente == null)
                return NotFound("Paciente não encontrado");

       
                paciente.EnfLeito = dto.EnfLeito;
                paciente.NomePaciente = dto.NomePaciente;
                paciente.Idade = dto.Idade;
                paciente.Prontuario   = dto.Prontuario;
                paciente.DataInternacao = dto.DataInternacao;
                paciente.Clinica = dto.Clinica;
                paciente.Dieta = dto.Dieta;
                paciente.Diagnostico = dto.Diagnostico;
                paciente.Alergias = dto.Alergias;
                paciente.AcessoData = dto.AcessoData;
                paciente.Curativo = dto.Curativo;
                paciente.Exames = dto.Exames;
                paciente.Diurese = dto.Diurese;
                paciente.Evacuacao = dto.Evacuacao;
                paciente.Drenos = dto.Drenos;
                paciente.Ostomias= dto.Ostomias;
                paciente.SwabData = dto.SwabData;
                paciente.Intercorrencias = dto.Intercorrencias;
                paciente.Cirurgias = dto.Cirurgias;
                paciente.Ventilacao= dto.Ventilacao;
                paciente.Setor = dto.Setor;
                paciente.Mobilidade= dto.Mobilidade;

            _context.SaveChanges();

            return Ok(paciente);
        }

        [HttpDelete("{id}")]
        public IActionResult ExcluirPaciente(int id)
        {
            var paciente = _context.Pacientes.FirstOrDefault(p => p.Id == id);

            if (paciente == null)
                return NotFound("Paciente não encontrado");

            _context.Pacientes.Remove(paciente);
            _context.SaveChanges();

            return Ok(new { message = "Paciente excluído com sucesso" });
        }

       [HttpGet("pdf/{setor}")]
public IActionResult GerarPdfPorSetor(string setor)
{
    if (string.IsNullOrWhiteSpace(setor))
        return BadRequest("Setor não informado.");

    setor = setor.Trim().ToUpper();

    var pacientes = _context.Pacientes
        .AsNoTracking()
        .Where(p => p.Setor.ToUpper() == setor)
        .OrderBy(p => p.EnfLeito)
        .ToList();

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

    return File(
        pdfBytes,
        "application/pdf",
        $"Passagem_Plantao_{setor}_{DateTime.Now:ddMMyyyy}.pdf"
    );
}


    }
}
