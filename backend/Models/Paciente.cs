using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


[Table("tbpacientes")]
public class Paciente
{
    [Key]
    public int Id { get; set; }
    public string EnfLeito { get; set; }
    public string NomePaciente { get; set; }
    public string Idade { get; set; }
    public string Prontuario { get; set; }
    public string DataInternacao { get; set; }
    public string Clinica { get; set; }
    // dados completos

    public string Dieta { get; set; }
    public string Diagnostico { get; set; }
    public string Alergias { get; set; }
    public string AcessoData { get; set; }
    public string Curativo { get; set; }
    public string Exames { get; set; }
    public string Diurese { get; set; }
    public string Evacuacao { get; set; }
    public string Drenos { get; set; }
    public string Ostomias { get; set; }
    public string SwabData { get; set; }
    public string Intercorrencias { get; set; }
    public string Cirurgias { get; set; }
    public string Ventilacao { get; set; }
    public string Setor { get; set; }
   public string Mobilidade { get; set; }
   

}
