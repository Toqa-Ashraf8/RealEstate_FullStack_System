using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp1.EF;
using System.Data;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace WebApp1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly DataContext _context;
        SqlConnection conn;
        public DashboardController(DataContext context)
        {
            _context = context;
            conn=new SqlConnection(_context.Database.GetConnectionString());
        }
        
    }
}
