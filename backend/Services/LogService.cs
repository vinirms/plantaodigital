public class LogService
{
    private readonly AppDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public LogService(AppDbContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task RegistrarAsync(string profissional, string acaoRealizada, string nomePaciente = null)
    {
        
         var httpContext = _httpContextAccessor.HttpContext;

    // Tenta pegar o IP real via X-Forwarded-For, senão usa o RemoteIpAddress
    var ip = httpContext?.Request.Headers["X-Forwarded-For"].FirstOrDefault()
             ?? httpContext?.Connection?.RemoteIpAddress?.ToString()
             ?? "IP desconhecido";

    // Remove portas e IPs extras caso venha uma lista (ex: "203.0.113.5, 10.0.0.1")
    ip = ip.Split(',').First().Trim();

    var log = new LogAcesso
    {
        Profissional    = profissional,
        AcaoRealizada   = acaoRealizada,
        DataHora        = DateTime.Now,
        Ip              = ip
    };

    _context.LogsAcesso.Add(log);
    await _context.SaveChangesAsync();
    }
}