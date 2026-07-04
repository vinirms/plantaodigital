using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


[Table("tbMapaCultura")]
public class Culturas
{

    [Key]
    public int Id { get; set; }
    public string EnfLeito { get; set; }= string.Empty;
    [Required]
    [MaxLength(250)]
    public string NomePaciente { get; set; }= string.Empty;
    public string Prontuario { get; set; }= string.Empty;

    public string Setor { get; set; } = string.Empty;

    public string? SwabNasal { get; set; }

    public string? SwabOral { get; set; }

    public string? SwabRetal { get; set; }

    public string? SecrecaoTraqueal { get; set; }

    public string? Hemocultura { get; set; }
 
    public string? Urocultura { get; set; }
    public string? FragOsso { get; set; }
    public string? FragPele { get; set; }

    public string? FragMoles { get; set; }

    public string? Infos { get; set; }

    
    public DateTime?  Atualizado  { get; set; }
    // public DateTime?  UltimaColeta  { get; set; }

    public string? TagERC { get; set; }
    public string? TagMRSA { get; set; }
    public string? TagCRAB { get; set; }
    public string? TagTB { get; set; }
    public string? TagKPC { get; set; }
    public string? Precaucao { get; set; }
    public string? ChaveComposta { get; set; }



}