using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/teste")]
    public class TesteController : ControllerBase
    {
        [HttpGet("rota")]
        public IActionResult Teste()
        {
            return Ok("ROTA OK");
        }
    }
}
