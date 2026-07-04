using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("tbPacienteImagem")]
public class PacienteImagens
{
    [Key]
    public int Id { get; set; }

    public int? PacienteId { get; set; }

    public byte[] Imagem { get; set; }
    public string ContentType  { get; set; }
    public string? DescricaoImg  { get; set; }

    public string? CondutaImg  { get; set; }

    public DateTime DataUpload { get; set; }
    
}
