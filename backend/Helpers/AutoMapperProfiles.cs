using AutoMapper;
using backend.Dtos;
using backend.Models;

namespace backend.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForReturnDto>();
            CreateMap<SettingsForCreationDto, Settings>().ReverseMap();
            CreateMap<SettingsForReturnDto, Settings>().ReverseMap();
        }
    }
}