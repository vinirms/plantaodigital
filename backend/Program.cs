using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using QuestPDF.Infrastructure;
using Microsoft.AspNetCore.HttpOverrides;
using Prometheus;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Controllers
builder.Services.AddControllers();

// 🔹 CORS — AllowCredentials() é obrigatório para cookies cross-origin
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirOrigem", policy =>
    {
        policy.WithOrigins(
                "https://passagemplantaodigital.com.br",
                "https://www.passagemplantaodigital.com.br"
            )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // ✅ ESSENCIAL para cookies HttpOnly funcionarem
    });
});
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("PermitirOrigem", policy =>
//     {
//         policy.WithOrigins(
//                 "http://localhost:5173"
//             )
//               .AllowAnyHeader()
//               .AllowAnyMethod()
//               .AllowCredentials()
//               .WithExposedHeaders("Content-Disposition");; // ✅ ESSENCIAL para cookies HttpOnly funcionarem
//     });
// });

// 🔹 Banco de dados
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(
            builder.Configuration.GetConnectionString("DefaultConnection")
        )
    )
);
builder.Services.AddScoped<CryptoService>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<LogService>();
// 🔹 REGISTRO DO AuthService
builder.Services.AddScoped<AuthService>();
builder.Services.AddHttpClient<GeminiService>();

var jwtKey = builder.Configuration["Jwt:Key"];

// 🔹 JWT — configurado para ler o token do cookie HttpOnly
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true, 
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtKey)
        ),
         ClockSkew = TimeSpan.Zero
    };

    // ✅ Lê o access token do cookie HttpOnly em vez do header Authorization
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            if (context.Request.Cookies.ContainsKey("auth_token"))
                context.Token = context.Request.Cookies["auth_token"];

            return Task.CompletedTask;
        }
    };
});


QuestPDF.Settings.License = LicenseType.Community;

var app = builder.Build();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseRouting();

app.UseCors("PermitirOrigem");

app.UseAuthentication();
app.UseAuthorization();

app.UseHttpMetrics(); // depois do auth, para capturar usuário autenticado nas métricas

app.MapControllers();
app.MapGet("/ping", () => "pong");
app.MapMetrics().RequireHost("localhost");; // manter como endpoint, não middleware

app.Run();