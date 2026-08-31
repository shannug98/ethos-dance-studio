using System;

namespace DanceStudio.API.Models
{
    public class PassPdfData
    {
        public string CustomerName { get; set; } = string.Empty;
        public string PackageName { get; set; } = string.Empty;
        public string PassId { get; set; } = string.Empty;
        public DateTime PurchaseDate { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidUntil { get; set; }
        public string Status { get; set; } = "PAID";
    }
}
