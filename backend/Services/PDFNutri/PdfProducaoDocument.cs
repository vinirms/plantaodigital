using QuestPDF.Drawing;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

public class PdfProducaoDocument : IDocument
{
    private readonly List<PacienteNutri> _pacientes;
    private readonly string _setor;
    private readonly string _tituloSecao;
    private readonly byte[] _logo;

    private static readonly Color AzulHeader = Color.FromHex("#008DB6");
    private static readonly Color CinzaObsHeader = Color.FromHex("#DFE6E9");
    private static readonly Color CinzaBorda = Color.FromHex("#BBBFC0");
    private const float EspessuraBorda = 0.5f;
    private const int FontSize = 8;

    public PdfProducaoDocument(List<PacienteNutri> pacientes, string setor)
    {
        _pacientes = pacientes;
        _setor = setor;
        // _tituloSecao = tituloSecao;

        var caminhoLogo = Path.Combine(AppContext.BaseDirectory, "wwwroot", "img", "logo.png");
        _logo = File.Exists(caminhoLogo) ? File.ReadAllBytes(caminhoLogo) : Array.Empty<byte>();
    }

    public DocumentMetadata GetMetadata() => DocumentMetadata.Default;

    public void Compose(IDocumentContainer container)
    {
        container.Page(page =>
        {
            page.Size(PageSizes.A4.Landscape());
            page.Margin(0.5f, Unit.Centimetre);
            page.PageColor(Colors.White);

            page.Content().Column(col =>
            {
                Cabecalho(col);
                TituloSecao(col, _tituloSecao);
                GridDeCards(col);
            });
        });
    }

    // ── CABEÇALHO ──────────────────────────────────────────────────────────────
    void Cabecalho(ColumnDescriptor col)
    {
        col.Item().Height(50).Table(table =>
        {
            table.ColumnsDefinition(c =>
            {
                c.ConstantColumn(100);
                c.RelativeColumn();
                c.ConstantColumn(200);
            });

            // Logo
            if (_logo.Length > 0)
                table.Cell().AlignCenter().AlignMiddle().Image(_logo);
            else
                table.Cell();

            // Título
            table.Cell().AlignCenter().AlignMiddle()
                .Text("Mapa de Produção")
                .FontSize(20).SemiBold()
                .FontColor(AzulHeader)
                .FontFamily("DejaVu Sans");

            // Setor + Data
            table.Cell().AlignRight().AlignMiddle()
                .Text($"Setor: {"TESTE"} | {DateTime.Now:dd/MM/yyyy}")
                .FontSize(10)
                .FontColor(AzulHeader)
                .FontFamily("DejaVu Sans");
        });

        col.Item().PaddingVertical(4);
    }

    // ── TÍTULO DA SEÇÃO ────────────────────────────────────────────────────────
    void TituloSecao(ColumnDescriptor col, string titulo)
    {
        col.Item()
            .PaddingBottom(6)
            .AlignCenter()
            .Text(titulo)
            .FontSize(13).Bold()
            .FontColor(AzulHeader)
            .FontFamily("DejaVu Sans");
    }

    // ── GRID DE CARDS (4 por linha) ────────────────────────────────────────────
    void GridDeCards(ColumnDescriptor col)
    {
        const int CardsPorLinha = 4;

        for (int i = 0; i < _pacientes.Count; i += CardsPorLinha)
        {
            var linha = _pacientes.Skip(i).Take(CardsPorLinha).ToList();

            col.Item().PaddingBottom(4).Table(table =>
            {
                table.ColumnsDefinition(c =>
                {
                    for (int k = 0; k < CardsPorLinha; k++)
                        c.RelativeColumn();
                });

                // Cards preenchidos
                foreach (var p in linha)
                {
                    table.Cell()
                        .Border(EspessuraBorda)
                        .BorderColor(CinzaBorda)
                        .Column(card => MontarCard(card, p));
                }

                // Células vazias para completar a linha
                for (int empty = linha.Count; empty < CardsPorLinha; empty++)
                {
                    table.Cell().Border(0);
                }
            });
        }
    }

    // ── CARD INDIVIDUAL ────────────────────────────────────────────────────────
    void MontarCard(ColumnDescriptor card, PacienteNutri p)
    {
        // Header: Enf/Leito + Nome
        card.Item().Table(header =>
        {
            header.ColumnsDefinition(c =>
            {
                c.ConstantColumn(40); // Enf/Leito
                c.RelativeColumn();   // Nome
            });

            // Badge azul — Enf/Leito
            header.Cell()
                .Background(AzulHeader)
                .Padding(4)
                .AlignCenter()
                .AlignMiddle()
                .Text(p.EnfLeito ?? "")
                .FontSize(FontSize).Bold()
                .FontColor(Colors.White)
                .FontFamily("DejaVu Sans");

            // Nome do paciente
            header.Cell()
                .Padding(4)
                .AlignLeft()
                .AlignMiddle()
                .Text(p.NomePaciente ?? "")
                .FontSize(FontSize).Bold()
                .FontFamily("DejaVu Sans");
        });

        // Informações
        InfoLinha(card, "Prontuário", p.Prontuario);
        InfoLinha(card, "Dieta", p.DietaPrescrita);
        InfoLinha(card, "Jejum", p.DataAvaliacao ?? "");  // ajuste o campo conforme seu model

        // Header Obs (fundo cinza)
        card.Item()
            .Background(CinzaObsHeader)
            .Border(EspessuraBorda)
            .BorderColor(CinzaBorda)
            .Padding(3)
            .AlignCenter()
            .Text("Obs")
            .FontSize(FontSize).Bold()
            .FontFamily("DejaVu Sans");

        // Conteúdo Obs
        card.Item()
            .Border(EspessuraBorda)
            .BorderColor(CinzaBorda)
            .MinHeight(40)
            .Padding(4)
            .AlignCenter()
            .Text(p.BigRefeicoes ?? "")
            .FontSize(FontSize)
            .FontFamily("DejaVu Sans");
    }

    // ── LINHA DE INFO (Prontuário, Dieta, Jejum) ───────────────────────────────
    void InfoLinha(ColumnDescriptor card, string label, string valor)
    {
        card.Item()
            .PaddingHorizontal(4)
            .PaddingVertical(1)
            .Text(text =>
            {
                text.Span($"{label}: ").FontSize(FontSize).FontFamily("DejaVu Sans");
                text.Span(valor ?? "").FontSize(FontSize).FontFamily("DejaVu Sans");
            });
    }
}