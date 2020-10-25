using System;

namespace backend.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public User User { get; set; }
        public int userId { get; set; }
        public string CompanyName { get; set; }
        public string Group { get; set; }
        public string PointOfContact { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string DefaultPhone { get; set; }
        public string DefaultEmail { get; set; }
        public Boolean IsGroup { get; set; }
    }
}