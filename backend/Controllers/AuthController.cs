using Microsoft.AspNetCore.Authorization;
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
        private readonly ILogger<AuthController> _logger;
        private readonly AuthService _authService;
        private readonly IConfiguration _configuration;
        private readonly LogService _logService;
        private readonly byte[] _jwtKey;

        private static readonly JwtSecurityTokenHandler _tokenHandler = new();

        public AuthController(AuthService authService, LogService logService, IConfiguration configuration, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logService = logService;
            _jwtKey = Encoding.UTF8.GetBytes(configuration["Jwt:Key"]);
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var usuario = await _authService.AuthenticateAsync(request.Login, request.Senha);

            if (usuario == null)
                return Unauthorized("Login ou senha inválidos");

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Name, usuario.user),
                new Claim("setor", request.Setor),
                new Claim("profissional", request.Profissional)
            };

            // ✅ token_type agora é injetado corretamente em cada token
            var accessToken  = GerarToken(claims, minutosDeExpiracao: 30,  tokenType: "access");
            var refreshToken = GerarToken(claims, minutosDeExpiracao: 720, tokenType: "refresh");

            Response.Cookies.Append("auth_token", accessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.UtcNow.AddMinutes(30)
            });

            Response.Cookies.Append("refresh_token", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.UtcNow.AddMinutes(720)
            });

            try
            {
                await _logService.RegistrarAsync(
                    profissional: request.Profissional,
                    acaoRealizada: $"Realizou login no setor {request.Setor}"
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao registrar login do profissional {Profissional}", request.Profissional);
            }

            return Ok(new { usuario = usuario.user });
        }

        [HttpPost("refresh")]
        public IActionResult Refresh()
        {
            var refreshToken = Request.Cookies["refresh_token"];
            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized("Refresh token ausente");

            try
            {
                var principal = _tokenHandler.ValidateToken(refreshToken,
                    new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(_jwtKey),
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidIssuer = _configuration["Jwt:Issuer"],
                        ValidAudience = _configuration["Jwt:Audience"],
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    }, out _);

                // ✅ Agora essa verificação funciona de verdade
                if (principal.FindFirst("token_type")?.Value != "refresh")
                    return Unauthorized("Token inválido");

                var novoAccessToken = GerarToken(principal.Claims, 30, tokenType: "access");

                Response.Cookies.Append("auth_token", novoAccessToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Lax,
                    Expires = DateTimeOffset.UtcNow.AddMinutes(30)
                });

                return Ok();
            }
            catch
            {
                Response.Cookies.Delete("auth_token");
                Response.Cookies.Delete("refresh_token");
                return Unauthorized("Sessão expirada");
            }
        }

        [HttpPost("logout")]
        [Authorize]   // ✅ protegido — só aceita requisição com token válido
        public async Task<IActionResult> Logout()
        {
            var profissional = User.FindFirst("profissional")?.Value ?? "Desconhecido";

            try
            {
                await _logService.RegistrarAsync(
                    profissional: profissional,
                    acaoRealizada: "Realizou logout!"
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Falha ao registrar logout do profissional {profissional}", profissional);
            }

            Response.Cookies.Delete("auth_token");
            Response.Cookies.Delete("refresh_token");

            return Ok();
        }

        private string GerarToken(IEnumerable<Claim> claims, int minutosDeExpiracao, string tokenType = "access")
        {
            var now = DateTime.UtcNow;

            // ✅ Remove token_type anterior se existir, depois adiciona o correto
            var claimsList = claims
                .Where(c => c.Type != "token_type")
                .ToList();
            claimsList.Add(new Claim("token_type", tokenType));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claimsList),
                Expires = now.AddMinutes(minutosDeExpiracao),
                NotBefore = now,
                IssuedAt = now,
                Issuer = _configuration["Jwt:Issuer"],     // ✅ sem hardcode
                Audience = _configuration["Jwt:Audience"], // ✅ sem hardcode
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(_jwtKey),
                    SecurityAlgorithms.HmacSha256
                )
            };

            var token = _tokenHandler.CreateToken(tokenDescriptor);
            return _tokenHandler.WriteToken(token);
        }
    }
}