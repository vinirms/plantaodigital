using QuestPDF.Drawing;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

public class MapaCulturaPdfDocument : IDocument
{
    private readonly List<Culturas> _culturas;
    private readonly string _setor;
    private readonly byte[] _logo;

    public MapaCulturaPdfDocument(List<Culturas> culturas, string setor)
    {
        _culturas = culturas;
        _setor = setor;

        var caminhoLogo = Path.Combine(
            AppContext.BaseDirectory,
            "wwwroot",
            "img",
            "logo.png"
        );

        _logo = File.Exists(caminhoLogo)
            ? File.ReadAllBytes(caminhoLogo)
            : Array.Empty<byte>();
    }

    public DocumentMetadata GetMetadata() => DocumentMetadata.Default;

    public void Compose(IDocumentContainer container)
    {
        container.Page(page =>
        {
            page.Size(PageSizes.A4.Landscape());
            page.Margin(0.5f, Unit.Centimetre);
            page.PageColor(Colors.White);

            page.Content().Column(column =>
            {
                Cabecalho(column);
                TabelaMapaCultura(column);
            });
        });
    }

    // ================= CABEÇALHO =================
    void Cabecalho(ColumnDescriptor column)
    {
        column.Item()
            .Height(50)
            .AlignMiddle()
            .AlignCenter()
            .Table(table =>
            {
                table.ColumnsDefinition(columns =>
                {
                    columns.ConstantColumn(100);
                    columns.RelativeColumn();
                    columns.ConstantColumn(200);
                });

                if (_logo.Length > 0)
                    table.Cell().AlignCenter().AlignMiddle().Image(_logo);
                else
                    table.Cell().AlignCenter().AlignMiddle().Text("");

                table.Cell()
                    .AlignCenter()
                    .AlignMiddle()
                    .Text("Mapa Culturas - CCIH")
                    .FontSize(24)
                    .FontColor(Color.FromHex("#009DC8"))
                    .SemiBold()
                    .FontFamily("DejaVu Sans");

                table.Cell()
                    .AlignRight()
                    .AlignMiddle()
                    .Text($"Setor: {_setor} | {DateTime.Now:dd/MM/yyyy}")
                    .FontColor(Color.FromHex("#009DC8"))
                    .FontSize(10)
                    .FontFamily("DejaVu Sans");
            });

        column.Item().PaddingVertical(5);
    }

    // ================= TABELA PRINCIPAL =================
    void TabelaMapaCultura(ColumnDescriptor column)
    {
        var CinzaBorda     = Color.FromHex("#bbbfc0");
        var AzulHeader     = Color.FromHex("#009DC8");
        const float EspessuraBorda = 0.5f;
        const int   fontSizeHeader = 9;
        const int   fontSizeCell   = 9;

        column.Item().Table(table =>
        {
            // Enf/Leito | Nome | Prontuário | Setor | Material | Bactéria | Precaução | Anotações
            table.ColumnsDefinition(cols =>
            {
                cols.RelativeColumn(0.8f); // Enf/Leito
                cols.RelativeColumn(3f); // Nome
                cols.RelativeColumn(1.0f); // Prontuário
                cols.RelativeColumn(1.5f); // Setor
                cols.RelativeColumn(1.5f);   // Material
                cols.RelativeColumn(3f);   // Bactéria
                cols.RelativeColumn(1.0f); // Precaução
                cols.RelativeColumn(2f);   // Anotações
            });

            // ---- Cabeçalho ----
            void HeaderCell(string text)
            {
                table.Cell()
                    .Background(AzulHeader)
                    .Border(EspessuraBorda)
                    .BorderColor(CinzaBorda)
                    .Padding(5)
                    .AlignCenter()
                    .AlignMiddle()
                    .Text(text)
                    .FontSize(fontSizeHeader)
                    .Bold()
                    .FontColor(Colors.White)
                    .FontFamily("DejaVu Sans");
            }

            HeaderCell("Enf/Leito");
            HeaderCell("Nome");
            HeaderCell("Prontuario");
            HeaderCell("Setor");
            HeaderCell("Material");
            HeaderCell("Bactéria");
            HeaderCell("Precaução");
            HeaderCell("Anotações");

            // ---- Linhas de dados ----
            foreach (var c in _culturas)
            {
                // Monta a lista de materiais × bactérias do paciente
                var linhas = new List<(string Material, string Bacteria)>();

                if (!string.IsNullOrWhiteSpace(c.SwabNasal))
                    linhas.Add(("Swab Nasal", c.SwabNasal));

                if (!string.IsNullOrWhiteSpace(c.SwabOral))
                    linhas.Add(("Swab Oral", c.SwabOral));

                if (!string.IsNullOrWhiteSpace(c.SwabRetal))
                    linhas.Add(("Swab Retal", c.SwabRetal));

                if (!string.IsNullOrWhiteSpace(c.SecrecaoTraqueal))
                    linhas.Add(("S. Traqueal", c.SecrecaoTraqueal));

                if (!string.IsNullOrWhiteSpace(c.Urocultura))
                    linhas.Add(("Urocultura", c.Urocultura));
                    
                if (!string.IsNullOrWhiteSpace(c.Hemocultura))
                    linhas.Add(("Hemocultura", c.Hemocultura));  
                // Garante pelo menos uma linha mesmo sem materiais
                if (linhas.Count == 0)
                    linhas.Add(("", ""));

                uint rowSpan = (uint)linhas.Count;

                // Colunas com rowspan (declaradas antes do loop)
                table.Cell()
                    .RowSpan(rowSpan)
                    .Border(EspessuraBorda).BorderColor(CinzaBorda)
                    .Padding(5).AlignMiddle().AlignCenter()
                    .Text(c.EnfLeito ?? "")
                    .FontSize(fontSizeCell).FontFamily("DejaVu Sans");

                table.Cell()
                    .RowSpan(rowSpan)
                    .Border(EspessuraBorda).BorderColor(CinzaBorda)
                    .Padding(5).AlignMiddle()
                    .Text(c.NomePaciente ?? "")
                    .FontSize(fontSizeCell).Bold().FontFamily("DejaVu Sans");

                table.Cell()
                    .RowSpan(rowSpan)
                    .Border(EspessuraBorda).BorderColor(CinzaBorda)
                    .Padding(5).AlignMiddle().AlignCenter()
                    .Text(c.Prontuario ?? "")
                    .FontSize(fontSizeCell).FontFamily("DejaVu Sans");

                table.Cell()
                    .RowSpan(rowSpan)
                    .Border(EspessuraBorda).BorderColor(CinzaBorda)
                    .Padding(5).AlignMiddle().AlignCenter()
                    .Text(c.Setor ?? "")
                    .FontSize(fontSizeCell).Bold()
                    .FontColor(Color.FromHex("#856404"))
                    .FontFamily("DejaVu Sans");

                // Loop de Material + Bactéria — Precaução e Anotações entram
                // na PRIMEIRA iteração com RowSpan, ficando nas colunas corretas
                bool primeiraLinha = true;

                foreach (var (material, bacteria) in linhas)
                {
                    table.Cell()
                        .Border(EspessuraBorda).BorderColor(CinzaBorda)
                        .Padding(5).AlignMiddle().AlignCenter()
                        .Text(material)
                        .FontSize(fontSizeCell).FontFamily("DejaVu Sans");

                    table.Cell()
                        .Border(EspessuraBorda).BorderColor(CinzaBorda)
                        .Padding(5).AlignMiddle()
                        .Text(bacteria)
                        .FontSize(fontSizeCell).Italic().FontFamily("DejaVu Sans");

                    if (primeiraLinha)
                    {
                        // Precaução com RowSpan — inserida após Bactéria na 1ª linha
                        table.Cell()
                            .RowSpan(rowSpan)
                            .Border(EspessuraBorda).BorderColor(CinzaBorda)
                            .Padding(5).AlignMiddle().AlignCenter()
                            .Background(Color.FromHex("#fff3cd"))
                            .Text(c.Precaucao ?? "")
                            .FontSize(fontSizeCell).Bold()
                            .FontColor(Color.FromHex("#856404"))
                            .FontFamily("DejaVu Sans");

                        // Anotações com RowSpan — inserida após Precaução na 1ª linha
                        table.Cell()
                            .RowSpan(rowSpan)
                            .Border(EspessuraBorda).BorderColor(CinzaBorda)
                            .Padding(5).AlignMiddle()
                            .Text(c.Infos ?? "")
                            .FontSize(fontSizeCell).FontFamily("DejaVu Sans");

                        primeiraLinha = false;
                    }
                }
            }
        });
    }
}