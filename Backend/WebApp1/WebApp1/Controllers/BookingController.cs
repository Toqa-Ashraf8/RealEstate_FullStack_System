using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using WebApp1.EF;
using System.Data;
using System.Data.SqlClient;
using WebApp1.Models;

namespace WebApp1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _env;
        SqlConnection conn;
        public BookingController(DataContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
            conn = new SqlConnection(_context.Database.GetConnectionString());
        }
        [Route("GetBookingClientData")]
        [HttpPost]
        public JsonResult GetBookingClientData([FromBody] BookingClient cl)
        {
            int id = Convert.ToInt32(cl.ClientID);
            DataTable dt = new DataTable();
            if (id > 0){

            
            string sqlget = @"select * from Negotiations where ClientID=@ClientID AND ProjectName=@ProjectName
                              AND Unit=@Unit";
                    using(SqlCommand cmd=new SqlCommand(sqlget, conn))
                    {
                        if (conn.State == ConnectionState.Closed) conn.Open();
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@ClientID", id);
                        cmd.Parameters.AddWithValue("@ProjectName", cl.ProjectName);
                        cmd.Parameters.AddWithValue("@Unit", cl.Unit);
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        da.Fill(dt);
                        if (conn.State == ConnectionState.Open) conn.Close();

                    }
            }
            return new JsonResult(dt);
        }
    }
}
