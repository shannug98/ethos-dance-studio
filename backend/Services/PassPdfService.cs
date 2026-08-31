using System;
using System.IO;
using DanceStudio.API.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using QRCoder;

namespace DanceStudio.API.Services
{
    public class PassPdfService : IPassPdfService
    {
        public PassPdfService()
        {
            // Configure QuestPDF Community license for development/testing
            QuestPDF.Settings.License = LicenseType.Community;
        }

        public byte[] GeneratePassPdf(PassPdfData data)
        {
            var verificationUrl = $"https://ethosdancestudio.com/verify/{data.PassId}";

            using var qrGenerator = new QRCodeGenerator();
            using var qrData = qrGenerator.CreateQrCode(verificationUrl, QRCodeGenerator.ECCLevel.Q);
            var qrCode = new PngByteQRCode(qrData);
            byte[] qrImage = qrCode.GetGraphic(10);

            var logoBytes = GetEthosLogoBytes();

            var pdf = Document.Create(document =>
            {
                document.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(36);
                    page.PageColor(Colors.White);

                    // 🌟 HEADER / LETTERHEAD (WITH OFFICIAL ETHOS DANCE STUDIO LOGO & BLACK TYPOGRAPHY)
                    page.Header().Column(header =>
                    {
                        header.Item().Row(row =>
                        {
                            row.RelativeItem().Row(logoRow =>
                            {
                                logoRow.Spacing(12);

                                // Official Ethos Studio Logo Image
                                if (logoBytes != null && logoBytes.Length > 0)
                                {
                                    logoRow.AutoItem()
                                        .Width(60)
                                        .Image(logoBytes);
                                }
                                else
                                {
                                    logoRow.AutoItem()
                                        .Width(34)
                                        .Height(34)
                                        .Background(Colors.Black)
                                        .AlignCenter()
                                        .AlignMiddle()
                                        .Text("❖")
                                        .FontSize(18)
                                        .Bold()
                                        .FontColor(Colors.White);
                                }

                                logoRow.RelativeItem().AlignMiddle().Column(titleCol =>
                                {
                                    titleCol.Item().Text("ETHOS DANCE STUDIO").FontSize(22).Bold().FontColor(Colors.Black);
                                });
                            });

                            row.RelativeItem().AlignRight().AlignMiddle().Column(col =>
                            {
                                col.Item().Text("+91 83417 01113").FontSize(10).Bold().FontColor(Colors.Black);
                                col.Item().Text("ethosdancestudio@gmail.com").FontSize(9).FontColor(Colors.Grey.Darken2);
                                col.Item().Text("ethosdancestudio.com").FontSize(9).FontColor(Colors.Black);
                            });
                        });

                        header.Item().PaddingTop(10).LineHorizontal(1.5f).LineColor(Colors.Black);
                    });

                    // 🌟 MAIN PASS CONTENT
                    page.Content().PaddingVertical(15).Column(column =>
                    {
                        column.Spacing(15);

                        // TITLE & STATUS BADGE
                        column.Item().AlignCenter().Column(titleCol =>
                        {
                            titleCol.Item().AlignCenter().Text("PREMIUM DANCE PASS").FontSize(22).Bold().FontColor(Colors.Black);
                            titleCol.Item().PaddingTop(4).AlignCenter().Background("#E6F4EA").PaddingHorizontal(12).PaddingVertical(4).Text("✓ PAID & ACTIVE").FontSize(10).Bold().FontColor("#137333");
                        });

                        // MEMBER DETAILS CARD CONTAINER
                        column.Item().Border(1).BorderColor(Colors.Grey.Lighten2).Background(Colors.Grey.Lighten5).Padding(16).Column(cardCol =>
                        {
                            cardCol.Spacing(8);

                            cardCol.Item().Text("MEMBER PASS SPECIFICATION").FontSize(11).Bold().FontColor(Colors.Black);
                            cardCol.Item().LineHorizontal(0.5f).LineColor(Colors.Grey.Lighten2);

                            cardCol.Item().Table(table =>
                            {
                                table.ColumnsDefinition(cols =>
                                {
                                    cols.ConstantColumn(120);
                                    cols.RelativeColumn();
                                });

                                AddTableRow(table, "Customer Name", data.CustomerName, true, Colors.Black);
                                AddTableRow(table, "Package / Event", data.PackageName, false);
                                AddTableRow(table, "Pass Reference ID", data.PassId, true, Colors.Black);
                                AddTableRow(table, "Purchase Date", $"{data.PurchaseDate:dd MMMM yyyy}", false);
                                AddTableRow(table, "Valid From", $"{data.ValidFrom:dd MMMM yyyy}", false);
                                AddTableRow(table, "Valid Until", $"{data.ValidUntil:dd MMMM yyyy}", false);
                                AddTableRow(table, "Payment Status", data.Status, true, "#137333");
                            });
                        });

                        // PASS VERIFICATION & QR CODE
                        column.Item().PaddingTop(10).AlignCenter().Column(qrCol =>
                        {
                            qrCol.Item().AlignCenter().Text("PASS VERIFICATION & GATE ACCESS").FontSize(11).Bold().FontColor(Colors.Black);
                            
                            qrCol.Item().PaddingTop(8).AlignCenter().Width(140).Height(140).Image(qrImage);

                            qrCol.Item().PaddingTop(6).AlignCenter().Text("Scan QR code at studio entrance gate scanner for reception desk check-in").FontSize(9).Italic().FontColor(Colors.Grey.Darken1);
                        });
                    });

                    // 🌟 FOOTER (WITH OFFICIAL LOGO & BLACK TYPOGRAPHY)
                    page.Footer().Column(footer =>
                    {
                        footer.Item().LineHorizontal(1).LineColor(Colors.Black);
                        footer.Item().PaddingTop(8).Row(row =>
                        {
                            row.RelativeItem().Row(logoRow =>
                            {
                                logoRow.Spacing(8);

                                if (logoBytes != null && logoBytes.Length > 0)
                                {
                                    logoRow.AutoItem()
                                        .Width(24)
                                        .Image(logoBytes);
                                }

                                logoRow.RelativeItem().Column(col =>
                                {
                                    col.Item().Text("ETHOS DANCE STUDIO").FontSize(10).Bold().FontColor(Colors.Black);
                                    col.Item().Text("Second Floor, 1/2/49/1, Nizampet Rd, Kukatpally, Hyderabad, Telangana 500085").FontSize(8).FontColor(Colors.Grey.Darken2);
                                    col.Item().Text("This pass is digitally generated, authoritative, and verified via entrance QR scanner.").FontSize(8).Italic().FontColor(Colors.Grey.Medium);
                                });
                            });

                            row.RelativeItem().AlignRight().Text(text =>
                            {
                                text.Span("Page ").FontSize(8).FontColor(Colors.Grey.Medium);
                                text.CurrentPageNumber().FontSize(8).Bold().FontColor(Colors.Black);
                                text.Span(" of ").FontSize(8).FontColor(Colors.Grey.Medium);
                                text.TotalPages().FontSize(8).Bold().FontColor(Colors.Black);
                            });
                        });
                    });
                });
            }).GeneratePdf();

            return pdf;
        }

        private static byte[]? GetEthosLogoBytes()
        {
            try
            {
                var paths = new[]
                {
                    Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "ethos_logo.png"),
                    Path.Combine(Directory.GetCurrentDirectory(), "ethos_logo.png"),
                    Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", "ethos_logo.png")
                };

                foreach (var path in paths)
                {
                    if (File.Exists(path))
                    {
                        return File.ReadAllBytes(path);
                    }
                }
            }
            catch
            {
                // Fallback gracefully if logo file read fails
            }

            return null;
        }

        private static void AddTableRow(TableDescriptor table, string label, string value, bool isBold, string? valueColor = null)
        {
            table.Cell().PaddingVertical(4).Text(label).FontSize(10).FontColor(Colors.Grey.Darken2);
            var valueText = table.Cell().PaddingVertical(4).Text(value).FontSize(10);
            if (isBold) valueText.Bold();
            if (!string.IsNullOrEmpty(valueColor)) valueText.FontColor(valueColor);
        }
    }
}
