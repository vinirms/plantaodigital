using Microsoft.EntityFrameworkCore;
public class AuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Usuario?> AuthenticateAsync(string login, string senha)
    {
        var usuario = await _context.Usuarios
        .AsNoTracking()
        .FirstOrDefaultAsync(u => u.user == login);

    if (usuario == null || usuario.senha != senha)
        return null;

    return usuario;
    }
}
