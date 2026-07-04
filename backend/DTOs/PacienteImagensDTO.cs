using System.ComponentModel.DataAnnotations;


public class PacienteImagensDTO
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
