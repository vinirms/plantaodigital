using System.ComponentModel.DataAnnotations;

public class PacienteCreateDTO

{   


    [Required(ErrorMessage = "EnfLeito é obrigatório")]
    public string EnfLeito { get; set; } = string.Empty;

   [Required(ErrorMessage = "NomePaciente é obrigatório")]
   [StringLength(250)]
    public string NomePaciente { get; set; } = string.Empty;

   [Required(ErrorMessage = "Idade é obrigatório")]
    public string Idade { get; set; } = string.Empty;

   [Required(ErrorMessage = "Prontuario é obrigatório")]
    public string Prontuario { get; set; } = string.Empty;
    public string? DataInternacao { get; set; }
    public string? Clinica { get; set; }
    public string? Dieta { get; set; }
    public string? DietaDescricao { get; set; }


   [StringLength(250)]
    public string? Diagnostico { get; set; }
    public string? Alergias { get; set; }  

   [StringLength(250)]
    public string? AlergiaDescricao { get; set; }
    public string? AcessoAvpTipo { get; set; }
    public string? JelcoAvp{ get; set; }

    public string? AcessoAvpData { get; set; }
    public string? AcessoCvcTipo { get; set; }
    public string? AcessoCvcData { get; set; }
    public string? AcessoCdlTipo { get; set; }
    public string? AcessoCdlData { get; set; }
    public string? AcessoPaiTipo { get; set; }
    public string? AcessoPaiData { get; set; }

       [MaxLength(500)]

    public string? Curativo { get; set; }
       [MaxLength(500)]

    public string? Exames { get; set; }
    public string? Diurese { get; set; }
    public string? Evacuacao { get; set; }
    public string? EvacuacaoUFI { get; set; }
    public string? Drenos { get; set; }
       [MaxLength(500)]


    public string? DrenosDescricao { get; set; }
    public string? Ostomias { get; set; }
    public string? OstomiasDescricao { get; set; }
    public string? SwabData { get; set; }
    [MaxLength(500)]


    public string? Intercorrencias { get; set; }
    [MaxLength(500)]


    public string? Cirurgias { get; set; }
    public string? Ventilacao { get; set; }
   
    [MaxLength(500)]

    public string? VentilacaoDescricao { get; set; }
    public string? Setor { get; set; }
    public string? Mobilidade { get; set; }

    public string? PulseiraID { get; set; }
    public string? NivConsciencia { get; set; }
    public string? Infusoes { get; set; }
    public string? Comorbidades { get; set; }

    public string? ChaveComposta { get; set; }
   public string? AdmPor { get; set; }

   // [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime? UltimaAtt { get; set; }

   public string? AttProfissional { get; set; }
    public string? Pendencia { get; set; }

}
