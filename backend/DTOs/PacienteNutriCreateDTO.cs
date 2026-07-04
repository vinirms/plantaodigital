using System.ComponentModel.DataAnnotations;

public class PacienteNutriCreateDTO
{
 [Required(ErrorMessage = "EnfLeito é obrigatório")]

    public string EnfLeito { get; set; }

   [Required(ErrorMessage = "NomePaciente é obrigatório")]
   [StringLength(250)]
    public string NomePaciente { get; set; } = string.Empty;

   [Required(ErrorMessage = "Idade é obrigatório")]
    public string Idade { get; set; } = string.Empty;

   [Required(ErrorMessage = "Prontuario é obrigatório")]
    public string Prontuario { get; set; } = string.Empty;
    public string? DataInternacao { get; set; }
    public string? Diagnostico { get; set; }
    public string? TriagemResult { get; set; }

    public string? EstadoNutricional { get; set; }

    public string? DataAvaliacao { get; set; }

    public string? ViaAlimentar { get; set; }

    public string? DietaPrescrita { get; set; }

    public string? AceitacaoDieta { get; set; }

    public string? UsoSuplemento { get; set; }

    public string? ProxAvaliacao { get; set; }

    public string? Lactario { get; set; }

    public string? BigRefeicoes { get; set; }

    public string? SmallRefeicoes { get; set; }

    public string? Anotacoes { get; set; }


}