using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly UserRepository _userRepo;
        private readonly CustomerRepository _repo;
        private readonly IAuthRepository _authRepo;
        public CustomerController(IMapper mapper, DataContext context, IAuthRepository authRepo)
        {
            _mapper = mapper;
            _userRepo = new UserRepository(context, mapper);
            _repo = new CustomerRepository(context, mapper);
            _authRepo = authRepo;
        }


        [HttpPost]
        public async Task<IActionResult> AddCustomer(CustomerForCreationDto customerForCreation)
        {
            var creator = await _userRepo.GetUser(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));

            var customer = _mapper.Map<Customer>(customerForCreation);

            customer.User = creator;

            _repo.Add(customer);

            if (await _repo.SaveAll())
            {
                var customerToReturn = _mapper.Map<CustomerForReturnDto>(customer);
                return CreatedAtRoute("GetCustomer", new {id = customer.Id }, customerToReturn);
            }
            
            throw new Exception("Creation of customer failed on save");
        }


        [HttpGet("byId/{id}", Name="GetCustomer")]
        public async Task<IActionResult> GetCustomer(int id)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            Customer customer = await _repo.GetSingleCustomer(userId, id);

            CustomerForReturnDto customerForReturn = _mapper.Map<CustomerForReturnDto>(customer);

            return Ok(customerForReturn);
        }

        [HttpGet("{company}")]
        public async Task<IActionResult> GetCustomerByCompany(string company)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            Customer customer = await _repo.GetSingleCustomerByCompany(userId, company);

            CustomerForReturnDto customerForReturn = _mapper.Map<CustomerForReturnDto>(customer);

            return Ok(customerForReturn);
        }


        [HttpGet]
        public async Task<IActionResult> GetCustomersForUser()
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            IEnumerable<Customer> customers = await _repo.GetCustomers(userId);

            IEnumerable<CustomerForReturnDto> customersForReturn = _mapper.Map<IEnumerable<CustomerForReturnDto>>(customers);

            return Ok(customersForReturn);
        }


        [HttpGet("group")]
        public async Task<IActionResult> GetCustomerGroupsForUser()
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            IEnumerable<Customer> customers = await _repo.GetCustomerGroups(userId);

            IEnumerable<CustomerForReturnDto> customersForReturn = _mapper.Map<IEnumerable<CustomerForReturnDto>>(customers);

            return Ok(customersForReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment(int id, CustomerForCreationDto customerForClientDto)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            Customer customerFromRepo = await _repo.GetSingleCustomer(userId, id);

            _mapper.Map(customerForClientDto, customerFromRepo);

            if (await _repo.SaveAll())
            {
                var customerToReturn = _mapper.Map<CustomerForReturnDto>(customerFromRepo);
                return CreatedAtRoute("GetCustomer", new {id = customerFromRepo.Id }, customerToReturn);
            }

            throw new Exception("Updating customer failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            Customer customerFromRepo = await _repo.GetSingleCustomer(userId, id);
            
            _repo.Delete(customerFromRepo);
            
            if (await _repo.SaveAll())
                return Ok("Customer was deleted!");
        
            throw new Exception("Deleting customer failed on save");
        }

    }
}