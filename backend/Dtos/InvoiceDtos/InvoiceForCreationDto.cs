using System;

namespace backend.Dtos
{
    public class InvoiceForCreationDto
    {
        public string Date { get; set; }
        public string Customer { get; set; }
        public string DateRange { get; set; }
        public int InvoiceNumber { get; set; }
    }
}