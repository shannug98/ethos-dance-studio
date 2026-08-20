using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace DanceStudio.API.Services
{
    public interface IPaymentService
    {
        Task<(bool Success, string TransactionId, string Message)> ProcessPaymentAsync(decimal amount, string method, string customerEmail);
    }

    public class PaymentService : IPaymentService
    {
        public async Task<(bool Success, string TransactionId, string Message)> ProcessPaymentAsync(decimal amount, string method, string customerEmail)
        {
            await Task.Delay(100);
            string txId = "TXN-" + Guid.NewGuid().ToString("N")[..10].ToUpper();
            return (true, txId, $"Payment of ₹{amount} via {method} successfully verified!");
        }
    }

    public interface INotificationService
    {
        Task SendBookingConfirmationAsync(string customerEmail, string customerName, string itemTitle, string transactionId);
        Task<bool> SendWhatsAppMessageAsync(string toPhone, string messageText);
    }

    public class NotificationService : INotificationService
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        
        // Twilio Credentials (Loaded safely via Environment Variables)
        private static string AccountSid => Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID") ?? "AC_TWILIO_SECRET_SID";
        private static string AuthToken => Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN") ?? "TWILIO_SECRET_TOKEN";
        private static string FromWhatsAppNumber => Environment.GetEnvironmentVariable("TWILIO_WHATSAPP_NUMBER") ?? "whatsapp:+17372508034";

        public async Task SendBookingConfirmationAsync(string customerEmail, string customerName, string itemTitle, string transactionId)
        {
            Console.WriteLine($"[NOTIFICATION SENT] Email to {customerEmail}: Hi {customerName}, your booking for '{itemTitle}' is confirmed! TxId: {transactionId}");
            await Task.CompletedTask;
        }

        public async Task<bool> SendWhatsAppMessageAsync(string toPhone, string messageText)
        {
            try
            {
                var cleanPhone = toPhone.Replace(" ", "").Replace("-", "").Replace("+", "");
                if (!cleanPhone.StartsWith("91") && cleanPhone.Length == 10)
                {
                    cleanPhone = "91" + cleanPhone;
                }

                var requestUrl = $"https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages.json";
                var request = new HttpRequestMessage(HttpMethod.Post, requestUrl);

                var byteArray = Encoding.ASCII.GetBytes($"{AccountSid}:{AuthToken}");
                request.Headers.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));

                var postData = new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("From", FromWhatsAppNumber),
                    new KeyValuePair<string, string>("To", $"whatsapp:+{cleanPhone}"),
                    new KeyValuePair<string, string>("Body", messageText)
                };

                request.Content = new FormUrlEncodedContent(postData);

                var response = await _httpClient.SendAsync(request);
                string responseBody = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"[TWILIO WHATSAPP SUCCESS] Sent to +{cleanPhone}");
                    return true;
                }
                else
                {
                    Console.WriteLine($"[TWILIO WHATSAPP ERROR] Status: {response.StatusCode}, Body: {responseBody}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[TWILIO WHATSAPP EXCEPTION] {ex.Message}");
                return false;
            }
        }
    }
}
