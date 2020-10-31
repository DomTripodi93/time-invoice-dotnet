using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class CustomerRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        public CustomerRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Customer>> GetCustomers(int userId)
        {
            IEnumerable<Customer> customers = await _context.Customers
                .Where(c => c.userId == userId)
                .ToListAsync();
            
            return customers;
        }

        public async Task<IEnumerable<Customer>> GetCustomerGroups(int userId)
        {
            IEnumerable<Customer> customers = await _context.Customers
                .Where(c => c.userId == userId)
                .Where(c => c.IsGroup == true)
                .ToListAsync();
            
            return customers;
        }

        public async Task<Customer> GetSingleCustomer(int userId, int id)
        {
            Customer customer = await _context.Customers
                .Where(c => c.userId == userId)
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();
            
            return customer;
        }

        public async Task<Customer> GetSingleCustomerByCompany(int userId, string company)
        {
            Customer customer = await _context.Customers
                .Where(c => c.userId == userId)
                .Where(c => c.CompanyName == company)
                .FirstOrDefaultAsync();
            
            return customer;
        }
    }
}