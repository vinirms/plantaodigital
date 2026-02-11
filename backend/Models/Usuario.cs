using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("tbUsuarios")]
public class Usuario
{
    [Key]
    public int Id { get; set; }

    [Column("user")]
    public string user { get; set; }

    [Column("senha")]
    public string senha { get; set; }
}
