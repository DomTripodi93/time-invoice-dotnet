using backend.Models;

namespace backend.Dtos
{
    public class UserForReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string RootId { get; set; }
        public SettingsForReturnDto Settings { get; set; }
        
    }
}