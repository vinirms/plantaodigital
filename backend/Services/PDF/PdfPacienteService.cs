using QuestPDF.Fluent;
using QuestPDF.Infrastructure;

public static class PdfPacienteService
{
    public static byte[] Gerar(List<Paciente> pacientes, string setor)
    {
        QuestPDF.Settings.License = LicenseType.Community;

        var document = new PacientePdfDocument(pacientes, setor);

        return document.GeneratePdf();
    }
}
