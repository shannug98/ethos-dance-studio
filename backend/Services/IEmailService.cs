using System.Threading.Tasks;

namespace DanceStudio.API.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(
            string toEmail,
            string toName,
            string subject,
            string htmlContent,
            string? attachmentName = null,
            byte[]? attachmentContent = null);
    }
}
