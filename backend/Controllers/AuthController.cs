using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var usuario = _authService.Authenticate(request.Login, request.Senha);

        if (usuario == null)
            return Unauthorized("Login ou senha inválidos");

        var key = Encoding.UTF8.GetBytes("MINHA_CHAVE_SUPER_SECRETA_123456");

        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Name, usuario.user),
                new Claim("setor", request.Setor)
            }),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature
            )
        };

    var token = tokenHandler.CreateToken(tokenDescriptor);

    return Ok(new
    {
        token = tokenHandler.WriteToken(token),
        usuario = usuario.user
       
    });
}

        
    }
}
