using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("tbLogs")]
public class LogAcesso
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Profissional { get; set; } = string.Empty;

    [Required]
    [MaxLength(500)]
    public string AcaoRealizada { get; set; } = string.Empty;

    public DateTime DataHora { get; set; } 

    [MaxLength(105)] // IPv4 = 15 chars, IPv6 = 45 chars
    public string? Ip { get; set; }
}