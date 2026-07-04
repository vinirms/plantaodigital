using QuestPDF.Fluent;
using QuestPDF.Infrastructure;

public static class PdfMapaCulturaService
{
    public static byte[] Gerar(List<Culturas> culturas, string setor)
    {
        QuestPDF.Settings.License = LicenseType.Community;

        var document = new MapaCulturaPdfDocument(culturas, setor);

        return document.GeneratePdf();
    }
}
