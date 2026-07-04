using QuestPDF.Fluent;
using QuestPDF.Infrastructure;

public static class PdfProducaoService
{
    public static byte[] Gerar(List<PacienteNutri> NuPaciente, string setor)
    {
        QuestPDF.Settings.License = LicenseType.Community;

        var document = new PdfProducaoDocument(NuPaciente, setor);

        return document.GeneratePdf();
    }
}
