using System.Threading.Tasks;

namespace DanceStudio.API.Services
{
    public interface IWhatsAppService
    {
        Task<bool> SendMessageAsync(string recipientPhone, string message);
        Task<(bool Success, string Message)> SendOtpAsync(string recipientPhone, string otpCode);
        Task<(bool Success, string Message)> SendPassConfirmationAsync(string recipientPhone, string customerName, string passId, string packageTitle);
    }
}
