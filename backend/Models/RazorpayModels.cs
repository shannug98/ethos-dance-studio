namespace DanceStudio.API.Models
{
    public class CreateRazorpayOrderRequest
    {
        public decimal Amount { get; set; } // Amount in INR
        public string Currency { get; set; } = "INR";
        public string Receipt { get; set; } = string.Empty;
        public string ItemTitle { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
    }

    public class RazorpayOrderResponse
    {
        public string OrderId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "INR";
        public string KeyId { get; set; } = string.Empty;
    }

    public class VerifyRazorpayPaymentRequest
    {
        public string RazorpayPaymentId { get; set; } = string.Empty;
        public string RazorpayOrderId { get; set; } = string.Empty;
        public string RazorpaySignature { get; set; } = string.Empty;
        
        public string ItemTitle { get; set; } = string.Empty;
        public decimal PricePaid { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string BookingType { get; set; } = "Pass";
    }

    public class StudioSetting
    {
        public int Id { get; set; }
        public string Key { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
    }

    public class WhatsAppNotificationRequest
    {
        public string Phone { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
