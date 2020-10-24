namespace backend.Dtos
{
    public class SettingsForCreationDto
    {
        public int userId { get; set; }
        public bool IsNew { get; set; }
        public int LastInvoiceNumber { get; set; }
        public string DefaultPointOfContact { get; set; }
        public string DefaultEmail { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public string DefaultPhone { get; set; }
        
    }
}