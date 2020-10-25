using System;

namespace backend.Models
{
    public class ClockItem
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int userId { get; set; }
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Customer { get; set; }
        public string InvoiceNumber { get; set; }
        public int Hours { get; set; }
        public Boolean Invoiced { get; set; }
    }
}