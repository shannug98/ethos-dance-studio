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
            // Simulate 100ms async payment gateway processing
            await Task.Delay(100);

            string txId = "TXN-" + Guid.NewGuid().ToString("N")[..10].ToUpper();
            return (true, txId, $"Payment of ₹{amount} via {method} successfully verified!");
        }
    }

    public interface INotificationService
    {
        Task SendBookingConfirmationAsync(string customerEmail, string customerName, string itemTitle, string transactionId);
    }

    public class NotificationService : INotificationService
    {
        public Task SendBookingConfirmationAsync(string customerEmail, string customerName, string itemTitle, string transactionId)
        {
            // Simulated notification log
            Console.WriteLine($"[NOTIFICATION SENT] Email to {customerEmail}: Hi {customerName}, your booking for '{itemTitle}' is confirmed! TxId: {transactionId}");
            return Task.CompletedTask;
        }
    }
}
