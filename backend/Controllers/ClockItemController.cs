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
    public class ClockItemController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly UserRepository _userRepo;
        private readonly InvoiceRepository _repo;
        private readonly IAuthRepository _authRepo;
        public ClockItemController(IMapper mapper, DataContext context, IAuthRepository authRepo)
        {
            _mapper = mapper;
            _userRepo = new UserRepository(context, mapper);
            _repo = new InvoiceRepository(context, mapper);
            _authRepo = authRepo;
        }


        [HttpPost]
        public async Task<IActionResult> AddClockItem(ClockItemForCreationDto clockItemForCreation)
        {
            var creator = await _userRepo.GetUser(int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value));

            var clockItem = _mapper.Map<ClockItem>(clockItemForCreation);

            clockItem.User = creator;

            _repo.Add(clockItem);

            if (await _repo.SaveAll())
            {
                var clockItemToReturn = _mapper.Map<ClockItemForReturnDto>(clockItem);
                return CreatedAtRoute("GetClockItem", new {id = clockItem.Id }, clockItemToReturn);
            }
            
            throw new Exception("Creation of clock item failed on save");
        }


        [HttpGet("{id}", Name="GetClockItem")]
        public async Task<IActionResult> GetClockItem(int id)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            ClockItem clockItem = await _repo.GetSingleClockItem(userId, id);

            ClockItemForReturnDto clockItemForReturn = _mapper.Map<ClockItemForReturnDto>(clockItem);

            return Ok(clockItemForReturn);
        }


        [HttpGet("byDateRange/{startTime}/{endTime}")]
        public async Task<IActionResult> GetClockItemsInDateRange(DateTime startTime, DateTime endTime)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            IEnumerable<ClockItem> clockItems = await _repo.GetClockItemsForPeriod(startTime, endTime, userId);

            IEnumerable<ClockItemForReturnDto> clockItemsForReturn = _mapper.Map<IEnumerable<ClockItemForReturnDto>>(clockItems);

            return Ok(clockItemsForReturn);
        }


        [HttpGet("byDateRange/{startTime}/{endTime}/{invoiced}")]
        public async Task<IActionResult> GetClockItemsInDateRangeAndInvoiced(DateTime startTime, DateTime endTime, Boolean invoiced)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            IEnumerable<ClockItem> clockItems = await _repo.GetClockItemsForPeriodAndInvoiced(startTime, endTime, invoiced, userId);

            IEnumerable<ClockItemForReturnDto> clockItemsForReturn = _mapper.Map<IEnumerable<ClockItemForReturnDto>>(clockItems);

            return Ok(clockItemsForReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment(int id, ClockItemForCreationDto clockItemForCreationDto)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            ClockItem clockItemFromRepo = await _repo.GetSingleClockItem(userId, id);

            _mapper.Map(clockItemForCreationDto, clockItemFromRepo);

            if (await _repo.SaveAll())
            {
                var clockItemToReturn = _mapper.Map<ClockItemForReturnDto>(clockItemFromRepo);
                return CreatedAtRoute("GetClockItem", new {id = clockItemFromRepo.Id }, clockItemToReturn);
            }

            throw new Exception("Updating clock item failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            ClockItem clockItemFromRepo = await _repo.GetSingleClockItem(userId, id);
            
            _repo.Delete(clockItemFromRepo);
            
            if (await _repo.SaveAll())
                return Ok("Clock item was deleted!");
        
            throw new Exception("Deleting clock item failed on save");
        }

    }
}