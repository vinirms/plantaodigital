// public class LoginRequest
// {
//     public string Login { get; set; }
//     public string Senha { get; set; }
//     public string Setor { get; set; }
//     public string Profissional { get; set; }

// }
using System.ComponentModel.DataAnnotations;

public class LoginRequest
{
    [Required(ErrorMessage = "Login é obrigatório")]
    public string? Login { get; set; } 

    [Required(ErrorMessage = "Senha é obrigatória")]
    public string? Senha { get; set; } 

    [Required(ErrorMessage = "Setor é obrigatório")]
    public string? Setor { get; set; } 

    [Required(ErrorMessage = "Profissional é obrigatório")]
    public string? Profissional { get; set; } 
}