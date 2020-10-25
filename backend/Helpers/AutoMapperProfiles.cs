using System;
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
            CreateMap<ClockItemForCreationDto, ClockItem>().ReverseMap();
            CreateMap<ClockItem, ClockItemForReturnDto>();
            CreateMap<Invoice, InvoiceForReturnDto>();
            CreateMap<Customer, CustomerForReturnDto>();
            CreateMap<CustomerForCreationDto, Customer>().ReverseMap();
        }
    }
}