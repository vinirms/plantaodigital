using QuestPDF.Drawing;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

public class PacientePdfDocument : IDocument
{
    private readonly List<Paciente> _pacientes;
    private readonly string _setor;
    private readonly byte[] _logo;

    public PacientePdfDocument(List<Paciente> pacientes, string setor)
    {
        _pacientes = pacientes;
        _setor = setor;

        // var caminhoLogo = Path.Combine(
        //     AppContext.BaseDirectory,
        //     "img",
        //     "logo.png"
        // );
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

                foreach (var p in _pacientes)
                {
                    TabelaPaciente(column, p);
                    column.Item().PaddingBottom(8);
                }
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
                    columns.ConstantColumn(300);
                    columns.ConstantColumn(200);
                });

                 if (_logo.Length > 0)
                    {
                        table.Cell()
                            .AlignCenter()
                            .AlignMiddle()
                            .Image(_logo); // ou nome do sistema

                    }
                    else
                    {
                        table.Cell()
                            .AlignCenter()
                            .AlignMiddle()
                            .Text(""); // ou nome do sistema
                    }

                table.Cell()
                    .AlignCenter()
                    .AlignMiddle()
                    .Text("Passagem de Plantão")
                    .FontSize(24)
                    .FontColor(Color.FromHex("#009DC8"))
                    .SemiBold();

                table.Cell()
                    .AlignRight()
                    .AlignMiddle()
                    .Text($"Setor: {_setor} | {DateTime.Now:dd/MM/yyyy}")
                    .FontColor(Color.FromHex("#009DC8"))
                    .FontSize(12);
            });

        column.Item().PaddingVertical(5);
    }

    // ================= TABELA DO PACIENTE =================
    void TabelaPaciente(ColumnDescriptor column, Paciente p)
    {
        var CinzaBorda = Color.FromHex("#636e72");
        var EspessuraBorda = 0.5f;
        var fontSizeHeader = 7;

        column.Item().Table(table =>
        {
            table.ColumnsDefinition(columns =>
            {
                columns.ConstantColumn(45);
                columns.ConstantColumn(150);
                columns.ConstantColumn(70);
                columns.ConstantColumn(100);
                columns.ConstantColumn(60);
                columns.ConstantColumn(70);
                columns.RelativeColumn();
                columns.RelativeColumn();
            });

            void Header(string text)
            {
                table.Cell()
                    .Border(EspessuraBorda)
                    .BorderColor(CinzaBorda)
                    .Padding(3)
                    .AlignCenter()
                    .AlignMiddle()
                    .Text(text)
                    .FontSize(fontSizeHeader)
                    .SemiBold();
            }

            void Cell(string text)
            {
                table.Cell()
                    .Border(EspessuraBorda)
                    .BorderColor(CinzaBorda)
                    .Padding(5)
                    .Text(text ?? "")
                    .FontSize(fontSizeHeader);
            }

            Header("Enf/Leito");
            Header("Nome / Pront. / Idade");
            Header("Dieta");
            Header("Tegumentar");
            Header("Ventilação");
            Header("Acesso");
            Header("Obs");
            Header("Eliminações");

            Cell(p.EnfLeito ?? "");

//             Cell(
// $@"{p.NomePaciente}
// Idade: {p.Idade}
// Pront.: {p.Prontuario}
// Swab: {p.SwabData ?? ""}
// Internação: {p.DataInternacao}
// Diag.: {p.Diagnostico ?? ""}
// Alergia: {p.Alergias ?? ""}"
//             );
    table.Cell()
        .Border(EspessuraBorda)
        .BorderColor(CinzaBorda)
        .Padding(5)
        .Text(text =>
        {
            text.Span(p.NomePaciente).Bold().FontSize(7);
            text.Line("");
            text.Span($"Idade: {p.Idade}").FontSize(8);
            text.Line("");
            text.Span($"Pront.: {p.Prontuario}").FontSize(8);
            text.Line("");
            text.Span($"Swab: {p.SwabData ?? ""}").FontSize(8);
            text.Line("");
            text.Span($"Internação: {p.DataInternacao}").FontSize(8);
            text.Line("");
            text.Span($"Diag.: {p.Diagnostico ?? ""}").FontSize(8);
            text.Line("");
            text.Span($"Alergia: {p.Alergias ?? ""}").FontSize(8);
        });
    
            Cell(p.Dieta ?? "");
            Cell(p.Curativo ?? "");
            Cell(p.Ventilacao ?? "");
            Cell(p.AcessoData ?? "");

            Cell(
$@"Intercorrências: {p.Intercorrencias ?? ""}
Cirurgias: {p.Cirurgias ?? ""}
Exames: {p.Exames ?? ""}"
            );

            Cell(
$@"Diurese: {p.Diurese ?? ""}
Evacuação: {p.Evacuacao ?? ""}
Drenos: {p.Drenos ?? ""}"
            );
       });
    }
}
