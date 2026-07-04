using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Paciente> Pacientes { get; set; }
    public DbSet<PacienteImagens> PacienteImagem { get; set; }


    public DbSet<Culturas> MapaCulturas { get; set; }
    public DbSet<PacienteNutri> NuPaciente { get; set; }
    public DbSet<LogAcesso> LogsAcesso { get; set; }

}
