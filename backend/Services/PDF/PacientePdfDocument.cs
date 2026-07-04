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
                    .SemiBold()
                    .FontFamily("DejaVu Sans");

             
                table.Cell()
                    .AlignRight()
                    .AlignMiddle()
                    .Text($"Setor: {_setor} | {DateTime.Now:dd/MM/yy} |Carimbo:")
                    .FontColor(Color.FromHex("#009DC8"))
                    .FontSize(10)
                    .FontFamily("DejaVu Sans");
            });

        column.Item().PaddingVertical(5);
    }

    // ================= TABELA DO PACIENTE =================
    void TabelaPaciente(ColumnDescriptor column, Paciente p)
    {
        var CinzaBorda = Color.FromHex("#bbbfc0");
        var EspessuraBorda = 0.5f;
        var fontSizeHeader =9;

        column.Item().PreventPageBreak().Table(table =>
        {
            table.ColumnsDefinition(columns =>
            {
                columns.ConstantColumn(45);
                columns.ConstantColumn(190);
                columns.ConstantColumn(50);
                columns.ConstantColumn(80);
                columns.ConstantColumn(60);
                columns.ConstantColumn(80);
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
                    .Bold()
                    .FontFamily("DejaVu Sans");

            }

            void Cell(string text)
            {
                table.Cell()
                    .Border(EspessuraBorda)
                    .BorderColor(CinzaBorda)
                    .Padding(5)
                    .Text(text ?? "")
                    .FontSize(fontSizeHeader)
                    .FontFamily("DejaVu Sans");

            }

            Header("Enf/Leito");
            Header("Nome / Pront. / Idade");
            Header("Dieta");
            Header("Tegumentar");
            Header("Ventilação");
            Header("Acesso");
            Header("Eliminações");
            Header("Obs/Ocorrencias");

        table.Cell()
            .Border(EspessuraBorda)
            .BorderColor(CinzaBorda)
            .Padding(5)
            .AlignCenter() 
            .AlignMiddle()
            .Text(text =>
            {
                text.Span(p.EnfLeito ?? "").FontSize(9).FontFamily("DejaVu Sans");

             });

            // Cell(p.EnfLeito ?? "");

    table.Cell()
        .Border(EspessuraBorda)
        .BorderColor(CinzaBorda)
        .Padding(5)
        .Text(text =>
        {
            text.Span(p.NomePaciente).Bold().FontSize(9).FontFamily("DejaVu Sans");
            text.Line("");
            text.Span($"Idade: ").Bold().FontSize(8).FontFamily("DejaVu Sans");
            text.Span(p.Idade ?? "").FontSize(9).FontFamily("DejaVu Sans");
            // text.Line("");
            text.Span($"            Prontuário: ").Bold().FontSize(8).FontFamily("DejaVu Sans");
            text.Span(p.Prontuario ?? "").FontSize(9).FontFamily("DejaVu Sans");
            text.Line("");
            if (DateTime.TryParse(p.DataInternacao, out DateTime data))
                {
                    int diasInternado = (DateTime.Today - data.Date).Days;
                    
                    text.Span("Internação: ").Bold().FontSize(8).FontFamily("DejaVu Sans");
                    text.Span($"{data:dd/MM/yy} | {diasInternado}d").FontSize(9).FontFamily("DejaVu Sans");
                }
           text.Line("");

            text.Span($"Precaução: ").Bold().FontSize(8).FontFamily("DejaVu Sans");
            text.Span(p.SwabData ?? " -- ").FontSize(9).FontFamily("DejaVu Sans");

            
            text.Line("");

            text.Span($"Mob.: ").Bold().FontSize(8).FontFamily("DejaVu Sans");
            text.Span(p.Mobilidade ?? " --").FontSize(9).FontFamily("DejaVu Sans");

            text.Span($"      Clinica: ").Bold().FontSize(8).FontFamily("DejaVu Sans");
            text.Span(p.Clinica ?? " -- ").FontSize(8).FontFamily("DejaVu Sans");
            // text.Line("");
            
            text.Line("");
            text.Span($"N. Consciencia: ").Bold().FontSize(8).FontFamily("DejaVu Sans");
            text.Span(p.NivConsciencia ?? " -- ").FontSize(8).FontFamily("DejaVu Sans");
            text.Line("");

            if ( p.Alergias == "SIM")
                {   
                    text.Span($"Alergia: ").Bold().FontSize(8).FontFamily("DejaVu Sans");
                    text.Span(p.AlergiaDescricao).FontSize(9).FontFamily("DejaVu Sans");

                }
            else
            {
                text.Span($"Alergia: ").Bold().FontSize(8).FontFamily("DejaVu Sans");
                text.Span(p.Alergias).FontSize(9).FontFamily("DejaVu Sans");
            }
            text.Line("");
            text.Span($"Comorb.: ").Bold().FontSize(8).FontFamily("DejaVu Sans");
            text.Span(p.Comorbidades ?? " -- ").FontSize(8).FontFamily("DejaVu Sans");

            text.Line("");
            text.Span($"Diag: ").Bold().FontSize(8).FontFamily("DejaVu Sans");
            text.Span(p.Diagnostico ?? "").FontSize(9).FontFamily("DejaVu Sans");

         
            

        });
    
        table.Cell()
            .Border(EspessuraBorda)
            .BorderColor(CinzaBorda)
            .Padding(5)
            .AlignCenter() 
            .Text(text =>
            {
                 if (p.Dieta == "Outro")
                    {
                        
                        text.Span(p.DietaDescricao).FontSize(8).FontFamily("Segoe UI");;

                    }
                    else
                    {
                         text.Span(p.Dieta ?? "").FontSize(8).FontFamily("DejaVu Sans");
                        // text.Span(p.Drenos).FontSize(9).FontFamily("Segoe UI");
                    }

             });

         table.Cell()
            .Border(EspessuraBorda)
            .BorderColor(CinzaBorda)
            .Padding(5)
            .Text(text =>
            {
                text.Span(p.Curativo ?? "").FontSize(8).FontFamily("DejaVu Sans");

             });
         table.Cell()
            .Border(EspessuraBorda)
            .BorderColor(CinzaBorda)
            .Padding(5)
            .AlignCenter() 
            .Text(text =>
            {
                    if (p.Ventilacao == "OUTRO")
                    {
                        
                        text.Span(p.VentilacaoDescricao).FontSize(8).FontFamily("Segoe UI");;

                    }
                    else
                    {
                         text.Span(p.Ventilacao ?? "").FontSize(8).FontFamily("DejaVu Sans");
                        // text.Span(p.Drenos).FontSize(9).FontFamily("Segoe UI");
                    }
                    

             });
            // Cell(p.Dieta ?? "");
            // Cell(p.Curativo ?? "");
            // Cell(p.Ventilacao ?? "");

            //Cell(p.AcessoAvpTipo ?? "");
            table.Cell()
            .Border(EspessuraBorda)
            .BorderColor(CinzaBorda)
            .Padding(5)
            .Text(text =>
            {
                if (!string.IsNullOrEmpty(p.AcessoAvpTipo))
                {
                    text.Span($"AVP: ").Bold().FontSize(7).FontFamily("DejaVu Sans");
                    text.Span(p.AcessoAvpTipo).FontSize(8).FontFamily("DejaVu Sans");

                      if (!string.IsNullOrEmpty(p.JelcoAvp))
                        {
                            text.Span($" : Jelco-").Bold().FontSize(7).FontFamily("DejaVu Sans");
                            text.Span(p.JelcoAvp).FontSize(8).FontFamily("DejaVu Sans");
                        
                        }

                    text.Line("");
                    if (DateTime.TryParse(p.AcessoAvpData, out DateTime data))
                        text.Span($"{data:dd/MM/yy}").FontSize(7).FontFamily("Segoe UI");;

                    text.Line("");
                }

                if (!string.IsNullOrEmpty(p.AcessoCvcTipo))
                {
                    text.Span($"CVC: ").Bold().FontSize(7).FontFamily("DejaVu Sans");
                    text.Span(p.AcessoCvcTipo).FontSize(8).FontFamily("Segoe UI");; ;

                    if (DateTime.TryParse(p.AcessoCvcData, out DateTime data))
                            text.Span($"- {data:dd/MM/yy}").FontSize(7).FontFamily("Segoe UI");;
                    text.Line("");
                }

                if (!string.IsNullOrEmpty(p.AcessoCdlTipo))
                {
                    text.Span($"CDL: ").Bold().FontSize(7).FontFamily("DejaVu Sans");
                    text.Span(p.AcessoCdlTipo).FontSize(8).FontFamily("Segoe UI");; ;

                    if (DateTime.TryParse(p.AcessoCdlData, out DateTime data))
                            text.Span($"- {data:dd/MM/yy}").FontSize(7).FontFamily("Segoe UI");;
                    text.Line("");
                }

                if (!string.IsNullOrEmpty(p.AcessoPaiTipo))
                {
                    text.Span($"PAI: ").Bold().FontSize(7).FontFamily("DejaVu Sans");
                    text.Span(p.AcessoPaiTipo).FontSize(8).FontFamily("Segoe UI");

                    if (DateTime.TryParse(p.AcessoPaiData, out DateTime data))
                            text.Span($"- {data:dd/MM/yy}").FontSize(7).FontFamily("Segoe UI");;
                }

                if (!string.IsNullOrEmpty(p.Infusoes))
                {
                    text.Line("");
                    text.Span($"Infusões:").Bold().FontSize(7).FontFamily("DejaVu Sans");
                    text.Line("");
                    text.Span(p.Infusoes).FontSize(7).FontFamily("Segoe UI");

                }

            });


       table.Cell()
        .Border(EspessuraBorda)
        .BorderColor(CinzaBorda)
        .Padding(5)
        .Text(text =>
        {
            if (!string.IsNullOrEmpty(p.Diurese))
                {
                    text.Span($"Diurese: ").Bold().FontSize(7).FontFamily("DejaVu Sans");
                    text.Span(p.Diurese).FontSize(9); 
                    text.Line("");  
                    
                }
           if ( p.Evacuacao == "Ausente")
                {
                    text.Span($"Evacuação - UFI:").Bold().FontSize(7).FontFamily("DejaVu Sans");
                     if (DateTime.TryParse(p.EvacuacaoUFI, out DateTime data))
                        text.Span($"{data:dd/MM/yy}").FontSize(9).FontFamily("Segoe UI");;

                }
            else
            {
                text.Span($"Evacuação: ").Bold().FontSize(7).FontFamily("DejaVu Sans");
                text.Span(p.Evacuacao).FontSize(9).FontFamily("Segoe UI");; 
            }
            
            text.Line("");
       

           if (p.Drenos == "SIM")
                {
                    text.Span($"Drenos: ").Bold().FontSize(7).FontFamily("DejaVu Sans");
                    text.Span(p.DrenosDescricao).FontSize(9).FontFamily("Segoe UI");;

            }
            else
            {
                text.Span($"").Bold().FontSize(7).FontFamily("DejaVu Sans");
                // text.Span(p.Drenos).FontSize(9).FontFamily("Segoe UI");
            }
        });

        table.Cell()
            .Border(EspessuraBorda)
            .BorderColor(CinzaBorda)
            .Padding(5)
            .Text(text =>
            {
                if (!string.IsNullOrEmpty(p.Intercorrencias))
                    {
                        text.Span($"Intercorrencias: ").Bold().FontSize(7).FontFamily("DejaVu Sans");
                        text.Span(p.Intercorrencias).FontSize(9).FontFamily("Segoe UI");; ;
                        text.Line("");  
                        
                    }
                if (!string.IsNullOrEmpty(p.Cirurgias))
                    {
                        text.Span($"Cirurgias: ").Bold().FontSize(7).FontFamily("DejaVu Sans");
                        text.Span(p.Cirurgias).FontSize(9).FontFamily("Segoe UI");; ;
                        text.Line("");  
                        
                    }
            if (!string.IsNullOrEmpty(p.Exames))
                    {
                        text.Span($"Exames: ").Bold().FontSize(7).FontFamily("DejaVu Sans");
                        text.Span(p.Exames).FontSize(9).FontFamily("Segoe UI");; ;
                        
                        
                    }
            });
    
       
    

       });
    }
}
