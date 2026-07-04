using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


[Table("tbNutricao")]
public class PacienteNutri
{
    [Key]
    public int IdNutri { get; set; }
    public string? EnfLeito { get; set; }
    public string? NomePaciente { get; set; }
    public string? Idade { get; set; }

    public string? Prontuario { get; set; }

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
