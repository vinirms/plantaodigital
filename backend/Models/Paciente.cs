using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


[Table("tbpacientes")]
public class Paciente
{
    [Key]
    public int Id { get; set; }
    public string? EnfLeito { get; set; }
    public string? NomePaciente { get; set; }
    public string? Idade { get; set; }
    public string? Prontuario { get; set; }
    public string? DataInternacao { get; set; }
    public string? Clinica { get; set; }
    // dados completos

    public string? Dieta { get; set; }
    public string? DietaDescricao { get; set; }

    public string? Diagnostico { get; set; }
    public string? AcessoAvpTipo { get; set; }
    public string? JelcoAvp{ get; set; }

    public string? AcessoAvpData { get; set; }
    public string? AcessoCvcTipo { get; set; }
    public string? AcessoCvcData { get; set; }
    public string? AcessoCdlTipo { get; set; }
    public string? AcessoCdlData { get; set; }
    public string? AcessoPaiTipo { get; set; }
    public string? AcessoPaiData { get; set; }
    public string? Alergias { get; set; }
    public string? AlergiaDescricao { get; set; }
    public string? Curativo { get; set; }
    public string? Exames { get; set; }
    public string? Diurese { get; set; }
    public string? Evacuacao { get; set; }
    public string? EvacuacaoUFI { get; set; }
    public string? Drenos { get; set; }
    public string? DrenosDescricao { get; set; }
    public string? Ostomias { get; set; }
    public string? OstomiasDescricao { get; set; }
    public string? SwabData { get; set; }
    public string? Intercorrencias { get; set; }
    public string? Cirurgias { get; set; }
    public string? Ventilacao { get; set; }
    public string? VentilacaoDescricao { get; set; }
    public string? Setor { get; set; }
    public string? Mobilidade { get; set; }
    public string? PulseiraID { get; set; }
    public string? NivConsciencia { get; set; }
    public string? Infusoes { get; set; }
    public string? Comorbidades { get; set; }
    public string? ChaveComposta { get; set; }
    public string? AdmPor { get; set; }

    public DateTime? UltimaAtt { get; set; }
    public string? AttProfissional { get; set; }
    public string? Pendencia { get; set; }




}
