using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Helpers;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class InvoiceRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        public InvoiceRepository(DataContext context, IMapper mapper)
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

        public async Task<IEnumerable<ClockItem>> GetClockItemsForPeriod(DateTime startTime, DateTime endTime, int userId)
        {
            IEnumerable<ClockItem> clockItems = await _context.ClockItems
                .Where(c => c.userId == userId)
                .Where(c => c.StartTime > startTime)
                .Where(c => c.StartTime < endTime)
                .ToListAsync();
            
            return clockItems;
        }

        public async Task<IEnumerable<ClockItem>> GetClockItemsForPeriodAndInvoiced(DateTime startTime, DateTime endTime, Boolean invoiced, int userId)
        {
            IEnumerable<ClockItem> clockItems = await _context.ClockItems
                .Where(c => c.userId == userId)
                .Where(c => c.StartTime > startTime)
                .Where(c => c.StartTime < endTime)
                .Where(c => c.Invoiced == invoiced)
                .ToListAsync();
            
            return clockItems;
        }

        public async Task<ClockItem> GetSingleClockItem(int userId, int id)
        {
            ClockItem clockItems = await _context.ClockItems
                .Where(c => c.userId == userId)
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();
            
            return clockItems;
        }
    }
}