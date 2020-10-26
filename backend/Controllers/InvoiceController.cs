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
using Microsoft.Extensions.Configuration;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly UserRepository _userRepo;
        private readonly InvoiceRepository _repo;
        private readonly SqlAccess _sqlAccess;
        private readonly IAuthRepository _authRepo;
        public InvoiceController(IMapper mapper, DataContext context, IAuthRepository authRepo, IConfiguration config)
        {
            _mapper = mapper;
            _userRepo = new UserRepository(context, mapper);
            _repo = new InvoiceRepository(context, mapper);
            _sqlAccess = new SqlAccess(config);
            _authRepo = authRepo;
        }


        [HttpPost("{startDate}/{endDate}")]
        public async Task<IActionResult> AddInvoice(string startDate, string endDate, InvoiceForCreationDto invoiceForCreation)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            string sql = $"EXEC dbo.spUpdateClockItemsInvoiced @Invoiced=1, @Date='{invoiceForCreation.Date}', @Customer='{invoiceForCreation.Customer}', " + 
                    $"@InvoiceNumber={invoiceForCreation.InvoiceNumber}, @StartDate='{startDate}', @EndDate='{endDate}', " + 
                    $"@DateRange='{invoiceForCreation.DateRange}', @UserId={userId}";

            Console.WriteLine(sql);

            Invoice invoice = await _sqlAccess.ExecuteProcedure<Invoice>(sql);

            InvoiceForReturnDto invoiceToReturn = _mapper.Map<InvoiceForReturnDto>(invoice);
            return CreatedAtRoute("GetInvoice", new {id = invoice.Id }, invoiceToReturn);

            throw new Exception("Creation of invoice failed on save");
        }


        [HttpGet("{id}", Name="GetInvoice")]
        public async Task<IActionResult> GetInvoice(int id)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            Invoice invoice = await _repo.GetSingleInvoice(userId, id);

            InvoiceForReturnDto invoiceForReturn = _mapper.Map<InvoiceForReturnDto>(invoice);

            return Ok(invoiceForReturn);
        }


        [HttpGet("byDateRange/{startTime}/{endTime}")]
        public async Task<IActionResult> GetInvoicesInDateRange(DateTime startTime, DateTime endTime)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            IEnumerable<Invoice> invoices = await _repo.GetInvoicesForPeriod(startTime, endTime, userId);

            IEnumerable<InvoiceForReturnDto> invoicesForReturn = _mapper.Map<IEnumerable<InvoiceForReturnDto>>(invoices);

            return Ok(invoicesForReturn);
        }


        [HttpGet("byDateRange/{startTime}/{endTime}/{paid}")]
        public async Task<IActionResult> GetInvoicesInDateRangeAndPaid(DateTime startTime, DateTime endTime, Boolean paid)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            IEnumerable<Invoice> invoices = await _repo.GetInvoicesForPeriodAndPaid(startTime, endTime, paid, userId);

            IEnumerable<InvoiceForReturnDto> invoicesForReturn = _mapper.Map<IEnumerable<InvoiceForReturnDto>>(invoices);

            return Ok(invoicesForReturn);
        }

        [HttpPut("{startDate}/{endDate}/{id}")]
        public async Task<IActionResult> UpdateDepartment(DateTime startDate, DateTime endDate, int id, InvoiceForCreationDto invoiceForCreationDto)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            string sql = $"EXEC dbo.spUpdateInvoice @Date='{invoiceForCreationDto.Date}', @Customer='{invoiceForCreationDto.Customer}', " + 
                    $"@InvoiceNumber={invoiceForCreationDto.InvoiceNumber}, @StartDate='{startDate}', @EndDate='{endDate}', " + 
                    $"@DateRange='{invoiceForCreationDto.DateRange}', @UserId={userId}";

            Invoice invoice = await _sqlAccess.ExecuteProcedure<Invoice>(sql);

            if (await _repo.SaveAll())
            {
                var invoiceToReturn = _mapper.Map<InvoiceForReturnDto>(invoice);
                return CreatedAtRoute("GetInvoice", new {id = invoice.Id }, invoiceToReturn);
            }

            throw new Exception("Updating invoice failed on save");
        }

        [HttpDelete("{startDate}/{endDate}/{id}")]
        public async Task<IActionResult> DeleteDepartment(DateTime startDate, DateTime endDate, int id)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            Invoice invoiceFromRepo = await _repo.GetSingleInvoice(userId, id);

            string sql = $"EXEC dbo.spUpdateClockItemsInvoiced @Invoiced=0, @Date='{invoiceFromRepo.Date}', @Customer='{invoiceFromRepo.Customer}', " + 
                    $"@InvoiceNumber={invoiceFromRepo.InvoiceNumber}, @StartDate='{startDate}', @EndDate='{endDate}', " + 
                    $"@DateRange='{invoiceFromRepo.DateRange}', @UserId={userId}";

            Invoice invoice = await _sqlAccess.ExecuteProcedure<Invoice>(sql);
            
            return Ok("Invoice was deleted!");
        
            throw new Exception("Deleting invoice failed on save");
        }

    }
}
