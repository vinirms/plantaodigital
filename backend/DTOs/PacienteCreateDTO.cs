using System.ComponentModel.DataAnnotations;

public class PacienteCreateDTO
{
     public int Id { get; set; }
   // obrigatórios
    [Required(ErrorMessage = "Enf/Leito é obrigatório")]
    public string EnfLeito { get; set; } = null!;

    [Required(ErrorMessage = "Nome do paciente é obrigatório")]
    public string NomePaciente { get; set; } = null!;

    [Required(ErrorMessage = "Idade é obrigatória")]
    public string Idade { get; set; } = null!;

    [Required(ErrorMessage = "Prontuário é obrigatório")]
    public string Prontuario { get; set; } = null!;

    public string? DataInternacao { get; set; }
    public string? Clinica { get; set; }
    public string? Dieta { get; set; }

    public string? Diagnostico { get; set; }
    public string? Alergias { get; set; }
    public string? AcessoData { get; set; }
    public string? Curativo { get; set; }
    public string? Exames { get; set; }
    public string? Diurese { get; set; }
    public string? Evacuacao { get; set; }
    public string? Drenos { get; set; }
    public string? Ostomias { get; set; }
    public string? SwabData { get; set; }
    public string? Intercorrencias { get; set; }
    public string? Cirurgias { get; set; }
    public string? Ventilacao { get; set; }
    public string? Setor { get; set; }
   public string? Mobilidade { get; set; }
}