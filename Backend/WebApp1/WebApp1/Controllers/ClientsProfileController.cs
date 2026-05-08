using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Security.Cryptography;
using WebApp1.EF;
using WebApp1.Models;
using WebApp1.ViewModels;
namespace WebApp1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsProfileController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _environment;
        SqlConnection conn;
        
        public ClientsProfileController(DataContext context,IWebHostEnvironment env)
        {
            _context=context;
            _environment=env;
            conn = new SqlConnection(_context.Database.GetConnectionString());
        }
        [Route("GetAllClients")]
        [HttpGet]
        public async Task<IActionResult> GetAllClients()
        {
            DataTable dt = new DataTable();
            string sql = "select * from Clients";
            SqlDataAdapter da=new SqlDataAdapter(sql, conn);
            da.Fill(dt);
            return Ok(dt);
        }
        [Route("GetClientDetails")]
        [HttpPost]
        public async Task<IActionResult> GetClientDetails(int clientid)
        {
            DataTable bookingdt = new DataTable();
            DataTable dt = new DataTable();
            var units_installments = new List<UnitInstallments>();

            await conn.OpenAsync();
            string sqld = @"select * from ClientFullDetails where ClientID=@ClientID";
            using (SqlCommand cmd = new SqlCommand(sqld, conn))
            {
                cmd.Parameters.AddWithValue("@ClientID", clientid);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(bookingdt);
            }
            string sqlg = @"SELECT * FROM ClientUnitsBookings WHERE ClientID=@ClientID";
            using (SqlCommand cmd2 = new SqlCommand(sqlg, conn))
            {
                cmd2.Parameters.AddWithValue("@ClientID", clientid);
                SqlDataAdapter da2 = new SqlDataAdapter(cmd2);
                da2.Fill(dt);

                foreach (DataRow row in dt.Rows)
                {
                    int bID = Convert.ToInt32(row["BookingID"]);
                    var existingUnit = units_installments.FirstOrDefault(x => x.BookingID == bID);

                    if (existingUnit == null)
                    {
                       
                        units_installments.Add(new UnitInstallments
                        {
                            BookingID = bID,
                            UnitID = Convert.ToInt32(row["UnitID"]),
                            unitName = row["unitName"].ToString(),
                            ProjectName = row["ProjectName"].ToString(),
                            BookingDate = Convert.ToDateTime(row["BookingDate"]),
                            Installments = new List<dynamic>
                            {
                                new {
                                    InstallmentID = row["InstallmentID"],
                                    DueDate = row["DueDate"],
                                    MonthlyAmount = row["MonthlyAmount"],
                                    Paid = row["Paid"]
                                }
                            }
                        });
                    }
                    else
                    {
                        existingUnit.Installments.Add(new
                        {
                            InstallmentID = row["InstallmentID"],
                            DueDate = row["DueDate"],
                            MonthlyAmount = row["MonthlyAmount"],
                            Paid = row["Paid"]
                        });
                    }
                }
            }
            var data = new
            {
                clientData = bookingdt,
                bookedUnitsData = units_installments
            };
            await conn.CloseAsync();
            return Ok(data);
        }


    }
}
