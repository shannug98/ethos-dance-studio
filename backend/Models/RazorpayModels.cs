namespace DanceStudio.API.Models
{
    public class CreateRazorpayOrderRequest
    {
        public string PackageId { get; set; } = string.Empty; // e.g. "DANCE_3_MONTHS" or "ETH_ROYAL_ADULT"
        public int? EventId { get; set; } // e.g. 202
        public decimal Amount { get; set; } // Fallback if no ID specified
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
        public string PackageId { get; set; } = string.Empty;
        public decimal AuthoritativePrice { get; set; }
    }

    public class VerifyRazorpayPaymentRequest
    {
        public string RazorpayPaymentId { get; set; } = string.Empty;
        public string RazorpayOrderId { get; set; } = string.Empty;
        public string RazorpaySignature { get; set; } = string.Empty;
        
        public string PackageId { get; set; } = string.Empty;
        public int? EventId { get; set; }
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

    public class RazorpayWebhookEvent
    {
        public string Entity { get; set; } = string.Empty;
        public string Event { get; set; } = string.Empty;
        public RazorpayWebhookPayload? Payload { get; set; }
    }

    public class RazorpayWebhookPayload
    {
        public RazorpayPaymentEntityContainer? Payment { get; set; }
        public RazorpayOrderEntityContainer? Order { get; set; }
    }

    public class RazorpayPaymentEntityContainer
    {
        public RazorpayPaymentEntity? Entity { get; set; }
    }

    public class RazorpayOrderEntityContainer
    {
        public RazorpayOrderEntity? Entity { get; set; }
    }

    public class RazorpayPaymentEntity
    {
        public string Id { get; set; } = string.Empty;
        public string Order_Id { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "INR";
        public string Status { get; set; } = string.Empty;
        public string Method { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Contact { get; set; } = string.Empty;
    }

    public class RazorpayOrderEntity
    {
        public string Id { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
