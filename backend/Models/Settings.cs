namespace backend.Models
{
    public class Settings
    {
        public User User { get; set; }
        public int userId { get; set; }
        public int LastInvoiceNumber { get; set; }
        public string DefaultPointOfContact { get; set; }
        public string DefaultEmail { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public string DefaultPhone { get; set; }
    }
}