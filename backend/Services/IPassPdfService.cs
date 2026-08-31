using DanceStudio.API.Models;

namespace DanceStudio.API.Services
{
    public interface IPassPdfService
    {
        byte[] GeneratePassPdf(PassPdfData data);
    }
}
