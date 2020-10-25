using System;

namespace backend.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int userId { get; set; }
        public DateTime Date { get; set; }
        public string Customer { get; set; }
        public string DateRange { get; set; }
        public decimal Hours { get; set; }
        public int InvoiceNumber { get; set; }
        public Boolean Paid { get; set; }
    }
}