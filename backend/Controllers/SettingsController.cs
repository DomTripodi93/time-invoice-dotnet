using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _repo;
        private readonly IAuthRepository _authRepo;
        public SettingsController(IMapper mapper, IUserRepository repo, IAuthRepository authRepo)
        {
            _mapper = mapper;
            _repo = repo;
            _authRepo = authRepo;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetUser()
        {
            int id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var user = await _repo.GetUser(id);
            var userSettings = await _repo.GetUserSettings(id);

            var returnUser = _mapper.Map<UserForReturnDto>(user);
            returnUser.Settings = _mapper.Map<SettingsForReturnDto>(userSettings);

            return Ok(returnUser);
        }

        [HttpGet("settings/{id}")]
        public async Task<IActionResult> GetUserSettings(int id)
        {
            var userSettings = await _repo.GetUserSettings(id);
            var returnUser = _mapper.Map<SettingsForReturnDto>(userSettings);
            return Ok(returnUser);
        }
        
    }
}