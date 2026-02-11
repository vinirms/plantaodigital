using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using QuestPDF.Infrastructure;
var builder = WebApplication.CreateBuilder(args);

// 🔹 Controllers
builder.Services.AddControllers();

// 🔹 CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirOrigem", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 🔹 Banco de dados
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseMySql(
//         connectionString,
//         ServerVersion.AutoDetect(connectionString)
//     )
// );
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(
            builder.Configuration.GetConnectionString("DefaultConnection")
        )
    )
);

// 🔹 REGISTRO DO AuthService (🔥 ESSENCIAL 🔥)
builder.Services.AddScoped<AuthService>();

// 🔹 JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes("MINHA_CHAVE_SUPER_SECRETA_123456")
        )
    };
});
QuestPDF.Settings.License = LicenseType.Community;
var app = builder.Build();

// 🔹 Pipeline
app.UseCors("PermitirOrigem");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGet("/ping", () => "pong");

app.Run();
