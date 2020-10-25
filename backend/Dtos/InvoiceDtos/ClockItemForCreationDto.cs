using System;

namespace backend.Dtos
{
    public class ClockItemForCreationDto
    {
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Customer { get; set; }
        public string Hours { get; set; }
        public Boolean Invoiced { get; set; }
    }
}