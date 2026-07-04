using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
public class GeminiService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public GeminiService(HttpClient httpClient,
                         IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

   public async Task<AnaliseFeridaDTO> AnalisarImagem(byte[] imagem, string contentType)
    {
        var apiKey = _configuration["GptMini:ApiKey"];

        var base64 = Convert.ToBase64String(imagem);
        var systemPrompt = @"Você é um enfermeiro especialista em tratamento de feridas.

Analise cuidadosamente a fotografia da lesão.

Sua resposta será utilizada como apoio ao registro de enfermagem..

A descrição deve sucinta, se for possivel analise: tipo da lesao,estagio, tecido predominante, bordas, pele perilesional, sinais de infeccao, utilizando linguagem técnica de enfermagem.

A conduta deve conter se possivel: como realizar a limpeza, tipo de coberturas (primaria e secundaria) a ser aplicada , demais orientaçoes. Nao sugerir agua e sabao.

Caso alguma informação não possa ser determinada, escreva ""Não foi possível avaliar"".

Nunca faça um diagnóstico definitivo.

A análise tem finalidade de apoio à decisão clínica.

Se houver qualquer incerteza, informe explicitamente.

Caso a imagem não tenha qualidade suficiente para avaliação, informe isso.

As condutas devem ser baseadas em boas práticas de enfermagem e tratamento de feridas.";

var body = new
{
    model = "gpt-4o-mini",
    messages = new object[]
    {
        new
        {
            role = "system",
            content = systemPrompt
        },
        new
        {
            role = "user",
            content = new object[]
            {
                new
                {
                    type = "image_url",
                    image_url = new
                    {
                        url = $"data:{contentType};base64,{base64}"
                    }
                }
            }
        }
    },
    response_format = new
    {
        type = "json_schema",
        json_schema = new
        {
            name = "analise_ferida",
            strict = true,
            schema = new
            {
                type = "object",
                properties = new
                {
                    descricaoImg = new { type = "string" },
                    condutaImg = new { type = "string" }
                },
                required = new[] { "descricaoImg", "condutaImg" },
                additionalProperties = false
            }
        }
    },
    temperature = 0.2,
    max_tokens = 2048
};
    var json = JsonSerializer.Serialize(body);

    var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
    {
        Content = new StringContent(json, Encoding.UTF8, "application/json")
    };
    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

    var response = await _httpClient.SendAsync(request);

    var respostaJson = await response.Content.ReadAsStringAsync();

    if (!response.IsSuccessStatusCode)
    {
        Console.WriteLine($"Erro OpenAI: {respostaJson}");
        throw new Exception($"Erro ao chamar a API da OpenAI: {response.StatusCode}");
    }

    var node = JsonNode.Parse(respostaJson);

    var texto = node?["choices"]?[0]?["message"]?["content"]?.ToString();

    if (string.IsNullOrWhiteSpace(texto))
        throw new Exception("O GPT não retornou nenhuma análise.");

    var resultado = JsonSerializer.Deserialize<AnaliseFeridaDTO>(
        texto,
        new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

    if (resultado == null)
        throw new Exception("Erro ao desserializar a resposta do GPT.");

    return resultado;
                    
        }
}