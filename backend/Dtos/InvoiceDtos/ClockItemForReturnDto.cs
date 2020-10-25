using System;

namespace backend.Dtos
{
    public class ClockItemForReturnDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Customer { get; set; }
        public string InvoiceNumber { get; set; }
        public decimal Hours { get; set; }
        public Boolean Invoiced { get; set; }
    }
}