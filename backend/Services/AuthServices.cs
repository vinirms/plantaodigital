public class AuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public Usuario Authenticate(string login, string senha)
    {
        return _context.Usuarios.FirstOrDefault(u =>
            u.user == login && u.senha == senha
        );
    }
}
