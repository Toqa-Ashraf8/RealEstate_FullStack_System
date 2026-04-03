using System.ComponentModel.DataAnnotations;

namespace WebApp1.Models
{
    public class ClientBooking
    {
        [Key]
        public int BookingID { get; set; }
        public int? ReservationAmount { get; set; }
        public string? PaymentMethod { get; set; }
        public string? CheckImagePath { get; set; }
        public int? DownPayment { get; set; }
        public int? FirstInstallmentDate { get; set; }
        public int? InstallmentYears { get; set; }
        public DateTime? BookingDate { get; set; }
        public int ClientID { get; set; }
        public int? ProjectCode { get; set; }
        public int? UnitID { get; set; }
        public Boolean? Reserved { get; set; }
    }
}
