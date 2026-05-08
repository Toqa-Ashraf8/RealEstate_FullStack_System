using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics.Contracts;
using WebApp1.EF;
using WebApp1.Models;
using WebApp1.ViewModels;

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

        // Get Client Data Automatically to Complete Booking
        [Route("GetBookingClientData")]
        [HttpPost]
        public async Task<IActionResult> GetBookingClientData([FromBody] BookingClient cl)
        {
            int id = Convert.ToInt32(cl.ClientID);
            DataTable dt = new DataTable();
            DataTable clientData = new DataTable();
            bool isExist = false;
            DataTable clientDetails = new DataTable();
            await conn.OpenAsync();
            using(SqlTransaction transaction = conn.BeginTransaction())
            {
                 try
                {
                    if (id > 0)
                    {

                        string sqlget = @"select * from Negotiations 
                                    where ClientID=@ClientID AND 
                                    ProjectCode=@ProjectCode AND
                                    UnitID=@UnitID";
                        using (SqlCommand cmd = new SqlCommand(sqlget, conn, transaction))
                        {
                            cmd.Parameters.Clear();
                            cmd.Parameters.AddWithValue("@ClientID", id);
                            cmd.Parameters.AddWithValue("@ProjectCode", cl.ProjectCode);
                            cmd.Parameters.AddWithValue("@UnitID", cl.UnitID);
                            SqlDataAdapter da = new SqlDataAdapter(cmd);
                            da.Fill(dt);
                        }

                        string get = @"select * from ClientExtraDetails where ClientID=@ClientID";

                        using (SqlCommand cmd = new SqlCommand(get, conn, transaction))
                        {
                            DataTable clientInformationDT = new DataTable();
                            cmd.Parameters.AddWithValue("@ClientID", cl.ClientID);
                            SqlDataAdapter da = new SqlDataAdapter(cmd);
                            da.Fill(clientInformationDT);
                            if (clientInformationDT.Rows.Count > 0)
                            {
                                clientData = clientInformationDT;
                                isExist = true;
                            }
                            else
                            {
                                isExist = false;
                            }
                        }

                    }
                    await transaction.CommitAsync();
                    return Ok(new { dt = dt, clientData = clientData, isExist = isExist });
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    return BadRequest(new { message = "حدث خطأ" });
                }
            }
           
        }
        //Save NationalID Cards Images 
        [Route("NationalIdUploadRequest")]
        [HttpPost]
        public async Task<IActionResult> NationalIdUploadRequest ([FromForm] upload_NationalID_Images cardimg)
        {
            var postedFile = cardimg.formFile;
            string fileName = postedFile.FileName;
            var physicalPath = _env.ContentRootPath + "/NationalIDCard_Images/" + fileName;
            using (var stream = new FileStream(physicalPath, FileMode.Create))
            {
                await postedFile.CopyToAsync(stream);
            }
            return Ok(fileName);
        }
        //Save Client Checks Images
        [Route("CheckUploadRequest")]
        [HttpPost]
        public async Task<IActionResult> CheckUploadRequest([FromForm] upload_Checks_Images checkimg)
        {
            var postedFile = checkimg.file_c;
            string fileName = postedFile.FileName;
            var physicalPath = _env.ContentRootPath + "/Checks_Images/" + fileName;
            using (var stream = new FileStream(physicalPath, FileMode.Create))
            {
                await postedFile.CopyToAsync(stream);
            }
            return Ok(fileName);
        }
        //Save Installment Checks Images 
        [Route("InstallmentCheckUploadRequest")]
        [HttpPost]
        public async Task<IActionResult> InstallmentCheckUploadRequest([FromForm] upload_Installment_Checks check)
        {
            var postedFile = check.checkfile;
            string fileName=postedFile.FileName;
            var physicalPath = _env.ContentRootPath + "/InstallmentChecks_Images/" + fileName;
            using(var stream=new FileStream(physicalPath, FileMode.Create))
            {
               await postedFile.CopyToAsync(stream);
            }
            return Ok(fileName);

        }

        [Route("ConfirmFullBooking")]
        [HttpPost]
        public async Task<IActionResult> ConfirmFullBooking([FromBody] FullBookingRequest request)
        {
            bool savedBooking = false;
            bool updatedBooking = false;
            int booking_id = Convert.ToInt32(request.UnitBooking.BookingID);
            if (request == null || request.ClientExtraDetails == null || request.UnitBooking == null)
             return BadRequest(new { success = false, message = "بيانات ناقصة" });

            await conn.OpenAsync();
            using (SqlTransaction transaction = conn.BeginTransaction())
            {

                try
                {
                    if (booking_id == 0)
                    {
                        string checkSql = "SELECT COUNT(*) FROM ClientExtraDetails WHERE ClientID=@ClientID";
                        int exists = 0;
                        using (SqlCommand cmdCheck = new SqlCommand(checkSql, conn, transaction))
                        {
                            cmdCheck.Parameters.AddWithValue("@ClientID", request.ClientExtraDetails.ClientID);
                            exists = (int)await cmdCheck.ExecuteScalarAsync();
                        }

                        if (exists == 0)
                        {
                            string sqlInsertClient = @"INSERT INTO ClientExtraDetails (NationalID, NationalIdImagePath, 
                                                   SecondaryPhone, Address, Job, ClientID, ClientName) 
                                                   VALUES (@NationalID, @NationalIdImagePath, @SecondaryPhone, 
                                                   @Address, @Job, @ClientID, @ClientName)";
                            using (SqlCommand cmd = new SqlCommand(sqlInsertClient, conn, transaction))
                            {
                                FillClientParams(cmd, request.ClientExtraDetails);
                                await cmd.ExecuteNonQueryAsync();
                                savedBooking = false;
                            }
                        }
                        else
                        {
                            string sqUpdateClient = @"Update ClientExtraDetails set NationalID=@NationalID, 
                                                  NationalIdImagePath=@NationalIdImagePath, 
                                                  SecondaryPhone=@SecondaryPhone,Address=@Address, 
                                                  Job=@Job,ClientID=@ClientID,ClientName=@ClientName";
                            using (SqlCommand cmd = new SqlCommand(sqUpdateClient, conn, transaction))
                            {
                                FillClientParams(cmd, request.ClientExtraDetails);
                                await cmd.ExecuteNonQueryAsync();
                                savedBooking = false;
                            }
                        }

                        string sqlBooking = @"INSERT INTO UnitBooking (ReservationAmount, PaymentMethod, CheckImagePath, DownPayment, 
                     FirstInstallmentDate, InstallmentYears, BookingDate, ClientID, ProjectCode, UnitID, Reserved) 
                     VALUES (@ReservationAmount, @PaymentMethod, @CheckImagePath, @DownPayment, @FirstInstallmentDate, @InstallmentYears, 
                     @BookingDate, @ClientID, @ProjectCode, @UnitID, @Reserved);
                     SELECT SCOPE_IDENTITY()";

                        using (SqlCommand cmd = new SqlCommand(sqlBooking, conn, transaction))
                        {
                            FillBookingParams(cmd, request.UnitBooking);
                            booking_id = Convert.ToInt32(await cmd.ExecuteScalarAsync());
                            savedBooking = true;
                        }
                        if (savedBooking == true)
                        {
                            string sqlUnit = "UPDATE Units SET ReservedStatus=1 WHERE ProjectCode=@ProjectCode AND UnitID=@UnitID";
                            using (SqlCommand cmd = new SqlCommand(sqlUnit, conn, transaction))
                            {
                                cmd.Parameters.AddWithValue("@ProjectCode", request.UnitBooking.ProjectCode);
                                cmd.Parameters.AddWithValue("@UnitID", request.UnitBooking.UnitID);
                                await cmd.ExecuteNonQueryAsync();
                            }
                        }

                    }
                    else
                    {

                        string sqUpdateClient = @"Update ClientExtraDetails set NationalID=@NationalID, 
                                                  NationalIdImagePath=@NationalIdImagePath, 
                                                  SecondaryPhone=@SecondaryPhone,Address=@Address, 
                                                  Job=@Job,ClientID=@ClientID,ClientName=@ClientName";
                        using (SqlCommand cmd = new SqlCommand(sqUpdateClient, conn, transaction))
                        {
                            FillClientParams(cmd, request.ClientExtraDetails);
                            await cmd.ExecuteNonQueryAsync();
                            updatedBooking = true;
                        }

                        string sqlBooking = @" Update UnitBooking set ReservationAmount=@ReservationAmount, 
                                           PaymentMethod=@PaymentMethod, CheckImagePath=@CheckImagePath, 
                                           DownPayment=@DownPayment, FirstInstallmentDate=@FirstInstallmentDate,
                                           InstallmentYears=@InstallmentYears, BookingDate=@BookingDate, 
                                           ClientID=@ClientID,ProjectCode=@ProjectCode,UnitID=@UnitID, Reserved=@Reserved 
                                           where BookingID=@BookingID";

                        using (SqlCommand cmd = new SqlCommand(sqlBooking, conn, transaction))
                        {
                            FillBookingParams(cmd, request.UnitBooking);
                            await cmd.ExecuteNonQueryAsync();
                            updatedBooking = true;
                        }

                    }

                    if (request.UnitBooking.installments != null && request.UnitBooking.installments.Count > 0)
                    {

                        string sqldelete = @"delete Installments where BookingID=@BID";
                        if (conn.State == ConnectionState.Closed) conn.Open();
                        using (SqlCommand cmd = new SqlCommand(sqldelete, conn, transaction))
                        {
                            cmd.Parameters.AddWithValue("@BID", booking_id);
                            await cmd.ExecuteNonQueryAsync();
                        }

                    }


                    string sqlInstallment = @"INSERT INTO Installments (InstallmentNumber, DueDate, 
                                            Months, MonthlyAmount, Paid, PaymentType, CheckImage, BookingID) 
                                            VALUES (@Num, @Date, @Months, @Amt, @Paid, @Type, @Img, @BID)";

                    foreach (var item in request.UnitBooking.installments)
                    {
                        using (SqlCommand cmd = new SqlCommand(sqlInstallment, conn, transaction))
                        {
                            cmd.Parameters.AddWithValue("@Num", item.InstallmentNumber);
                            cmd.Parameters.AddWithValue("@Date", item.DueDate);
                            cmd.Parameters.AddWithValue("@Months", item.Months);
                            cmd.Parameters.AddWithValue("@Amt", item.MonthlyAmount);
                            cmd.Parameters.AddWithValue("@Paid", item.Paid);
                            cmd.Parameters.AddWithValue("@Type", item.PaymentType);
                            cmd.Parameters.AddWithValue("@Img", item.CheckImage);
                            cmd.Parameters.AddWithValue("@BID", booking_id);
                            await cmd.ExecuteNonQueryAsync();
                        }
                    }

                    await transaction.CommitAsync();
                    return Ok(new
                    {
                        success = true,
                        bookingId = booking_id,
                        savedBooking = savedBooking,
                        updatedBooking = updatedBooking
                    });


                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    return BadRequest(new { success = false, message = "حدث خطأ: " + ex.Message });
                }


            }
        }   
        private void FillClientParams(SqlCommand cmd, ClientExtraDetails cl)
        {
            cmd.Parameters.AddWithValue("@NationalID", cl.NationalID);
            cmd.Parameters.AddWithValue("@NationalIdImagePath",cl.NationalIdImagePath);
            cmd.Parameters.AddWithValue("@SecondaryPhone", cl.SecondaryPhone);
            cmd.Parameters.AddWithValue("@Address",cl.Address);
            cmd.Parameters.AddWithValue("@Job", cl.Job );
            cmd.Parameters.AddWithValue("@ClientID", cl.ClientID );
            cmd.Parameters.AddWithValue("@ClientName", cl.ClientName );
        }
        private void FillBookingParams(SqlCommand cmd, UnitBooking ub)
        {
            cmd.Parameters.AddWithValue("@BookingID", ub.BookingID );
            cmd.Parameters.AddWithValue("@ReservationAmount", ub.ReservationAmount );
            cmd.Parameters.AddWithValue("@PaymentMethod", ub.PaymentMethod );
            cmd.Parameters.AddWithValue("@CheckImagePath", ub.CheckImagePath );
            cmd.Parameters.AddWithValue("@DownPayment", ub.DownPayment );
            cmd.Parameters.AddWithValue("@FirstInstallmentDate", ub.FirstInstallmentDate );
            cmd.Parameters.AddWithValue("@InstallmentYears", ub.InstallmentYears );
            cmd.Parameters.AddWithValue("@BookingDate", ub.BookingDate );
            cmd.Parameters.AddWithValue("@ClientID", ub.ClientID );
            cmd.Parameters.AddWithValue("@ProjectCode", ub.ProjectCode);
            cmd.Parameters.AddWithValue("@UnitID", ub.UnitID);
            cmd.Parameters.AddWithValue("@Reserved", ub.Reserved);
        }
        //Generate installment Table 
        [Route("GenerateInstallments")]
        [HttpPost]
        public async Task<IActionResult> GenerateInstallments([FromBody]InstallmentDetails request)
        {
            int initial_payment_status = 0;
            if (request == null || request.InstallmentYears <= 0)
                return new JsonResult("بيانات غير صالحة");
            var installments = new List<InstallmentViewModel>();
            //الحساب المتبقي من غير المقدم
            int remainingAmount = request.TotalAmount - request.DownPayment;
            //حساب عدد الشهور من عدد السنين
            int TotalMonths = request.InstallmentYears * 12;
            //قيمة القسط الشهري 
            decimal monthlyPrice = remainingAmount / TotalMonths;

            for (int i = 1; i <= TotalMonths; i++)
            {
                installments.Add(new InstallmentViewModel
                {
                    InstallmentNumber = i,
                    // إضافة شهر في كل لفة بناءً على تاريخ أول قسط
                    DueDate = request.FirstInstallmentDate.AddMonths(i - 1),
                    Months = TotalMonths,
                    MonthlyAmount = monthlyPrice,
                    Paid = initial_payment_status

                });

            }
            return Ok(installments);

        }
        //Updated Negotiation Requests to Reserved 
        [Route("ConfirmReservation")]
        [HttpPost]
        public async Task<IActionResult> ConfirmReservation([FromBody] NegotiationViewModel neg)
        {
            bool saved = false;
            string sqlup = @"Update Negotiations set Reserved=1 
                             where ClientID=@ClientID AND 
                             ProjectCode=@ProjectCode AND
                             UnitID=@UnitID";
            using (SqlCommand cmd = new SqlCommand(sqlup, conn))
            {
                await conn.OpenAsync();
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@ClientID", neg.ClientID);
                cmd.Parameters.AddWithValue("@ProjectCode", neg.ProjectCode);
                cmd.Parameters.AddWithValue("@UnitID", neg.UnitID);
                await cmd.ExecuteNonQueryAsync();
                saved = true;
            }
            return Ok(saved);
        }
        //Get Reserved Data
        [Route("GetAllReservedClients")]
        [HttpGet]
        public async Task<IActionResult> GetAllReservedClients()
        {
            DataTable dt = new DataTable();
            string sqls = "Select * from reserved_clients_details where Reserved=1";
            SqlDataAdapter da = new SqlDataAdapter(sqls, conn);
            da.Fill(dt);
            return Ok(dt);
        }
            //Get Rserved Clients with Installments to enable editing data 
            [Route("GetReservedClientById")]
        [HttpPost]
        public async Task<IActionResult> GetReservedClientById(int id)
        {
            var clientdata = new List<BookingClient>();
            var reservationData = new List<InstallmentData>();
            DataTable clientdt = new DataTable();
            DataTable installmentdt = new DataTable();
            await conn.OpenAsync();
            using(SqlTransaction transaction = conn.BeginTransaction())
            {
                try
                {
                    string sqls = "Select * from reserved_clients_details where BookingID=@BookingID";

                    using (SqlCommand cmd = new SqlCommand(sqls, conn,transaction))
                    {
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@BookingID", id);
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        da.Fill(clientdt);
                        if (clientdt.Rows.Count > 0)
                        {
                            foreach (DataRow row in clientdt.Rows)
                            {
                                clientdata.Add(new BookingClient
                                {
                                    ClientID = Convert.ToInt32(row["ClientID"]),
                                    ClientName = row["ClientName"].ToString(),
                                    ProjectCode = Convert.ToInt32(row["ProjectCode"]),
                                    ProjectName = row["ProjectName"].ToString(),
                                    UnitID = Convert.ToInt32(row["UnitID"]),
                                    unitName = row["unitName"].ToString(),


                                });
                                reservationData.Add(new InstallmentData
                                {
                                    BookingID = Convert.ToInt32(row["BookingID"]),
                                    ReservationAmount = Convert.ToInt32(row["ReservationAmount"]),
                                    PaymentMethod = row["PaymentMethod"].ToString(),
                                    DownPayment = Convert.ToInt32(row["DownPayment"]),
                                    FirstInstallmentDate = Convert.ToDateTime(row["FirstInstallmentDate"]),
                                    InstallmentYears = Convert.ToInt32(row["InstallmentYears"]),
                                    CheckImagePath = row["CheckImagePath"].ToString(),
                                    BookingDate = Convert.ToDateTime(row["BookingDate"]),
                                });
                            }

                        }
                    }
                    string sqlg = "Select * from reserved_clients_installments where BookingID=@BookingID";
                    using (SqlCommand cmd = new SqlCommand(sqlg, conn,transaction))
                    {

                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@BookingID", id);
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        da.Fill(installmentdt);
                    }

                    var data = new
                    {
                        clientdt = clientdt,
                        installmentdt = installmentdt,
                        reservationData = reservationData,
                        clientdata = clientdata
                    };
                    await transaction.CommitAsync();
                    return Ok(data);

                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    return BadRequest(new { error = "حدث خطأ" });

                }
            } 
        }
        [Route("DeleteBookingData")]
        [HttpPost]
        public async Task<IActionResult> DeleteBookingData([FromBody] UnitBooking client)
        {
            bool isDeleted = false;
            await conn.OpenAsync();
            using(SqlTransaction transaction = conn.BeginTransaction())
            {
                try
                {
                    string deleteInstallment = "delete Installments where BookingID=@BookingID";

                    using (SqlCommand cmd = new SqlCommand(deleteInstallment, conn,transaction))
                    {
                        await conn.OpenAsync();
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@BookingID", client.BookingID);
                        int rows = await cmd.ExecuteNonQueryAsync();
                        isDeleted = true;

                    }
                    if (isDeleted)
                    {
                         string deleteClient = "delete UnitBooking where BookingID=@BookingID";
                            using (SqlCommand cmd = new SqlCommand(deleteClient, conn,transaction))
                            {
                                cmd.Parameters.Clear();
                                cmd.Parameters.AddWithValue("@BookingID", client.BookingID);
                                await cmd.ExecuteNonQueryAsync();
                                isDeleted = true;
                            }
                            string sqlp = "Update Units set ReservedStatus=0 where UnitID=@UnitID";
                            using (SqlCommand cmd = new SqlCommand(sqlp, conn, transaction))
                            {
                                cmd.Parameters.Clear();
                                cmd.Parameters.AddWithValue("@UnitID", client.UnitID);
                                await cmd.ExecuteNonQueryAsync();
                                isDeleted = true;

                            }

                    }
                    await transaction.CommitAsync();
                    return Ok(new { isDeleted = isDeleted });

                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    return BadRequest(new { message = "حدث خطأ أثناء مسح الحجز" });
                }

            }
          
        }

        [Route("SearchBookings")]
        [HttpPost]
        public async Task<IActionResult> SearchBookings([FromBody]Search term)
        {
            DataTable dt = new DataTable();
            List<string> conditions = new List<string>();
            foreach (var field in term.Fields)
            {
                conditions.Add($"{field} LIKE @searchterm");
            }
            string whereClause = string.Join(" OR ", conditions);
            string search = @"select * from reserved_clients_details where " + whereClause;
            using (SqlCommand cmd = new SqlCommand(search, conn))
            {
                await conn.OpenAsync();
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@searchterm", "%" + term.Term + "%");
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            } 
            if (dt.Rows.Count > 0)
            {
               
               return Ok(dt);
            }
            else
            {
                return Ok(new DataTable());
            }
        }

        [Route("SearchClients")]
        [HttpPost]
        public async Task<IActionResult> SearchClients([FromBody] Search term)
        {
            DataTable dt = new DataTable();
            List<string> conditions = new List<string>();
            foreach (var field in term.Fields)
            {
                conditions.Add($"{field} LIKE @searchterm");
            }
            string whereClause = string.Join(" OR ", conditions);
            string search = @"select * from Clients where " + whereClause;
           
            using (SqlCommand cmd = new SqlCommand(search, conn))
            {
                await conn.OpenAsync();
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@searchterm", "%" + term.Term + "%");
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            if (dt.Rows.Count > 0)
            {
                return Ok(dt);
            }
            else
            {
                return Ok(new DataTable());
            }
            
        }

    }
}
