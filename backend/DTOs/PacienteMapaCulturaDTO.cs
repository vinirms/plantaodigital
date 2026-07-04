using System.ComponentModel.DataAnnotations;

public class PacienteMapaCulturaDTO
{
    public int Id { get; set; }
    // obrigatórios
    [Required(ErrorMessage = "Enf/Leito é obrigatório")]
    public string? EnfLeito { get; set; } 

    [Required(ErrorMessage = "Nome do paciente é obrigatório")]
    public string? NomePaciente { get; set; }

    [Required(ErrorMessage = "Prontuario é obrigatória")]
    public string? Prontuario { get; set; }

    [Required(ErrorMessage = "Setor é obrigatório")]
    public string? Setor { get; set; } 
 

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
    public DateTime? Atualizado { get; set; }

    public string? TagERC { get; set; }
    public string? TagMRSA { get; set; }
    public string? TagCRAB { get; set; }
    public string? TagTB { get; set; }
    public string? TagKPC { get; set; }
    public string? Precaucao { get; set; }
    public string? ChaveComposta { get; set; }


    // public DateTime? UltimaColeta { get; set; }




}