using System.ComponentModel.DataAnnotations;

namespace WebApp1.Models
{
    public class Installment
    {
        [Key]
        public int InstallmentID { get; set; }
        public int TotalPrice { get; set; }
        public int DownPayment { get; set; }
        public int MonthsCount { get; set; }
        public int InstallmentNo { get; set; }
        public DateTime InstallmentDate { get; set; }
        public int EachMonthPrice { get; set; }
        public int InstallmentStatus { get; set; }
        public int ClientID { get; set; }
        public string ClientName { get; set; }
        public string ProjectName { get; set; }
        public string Unit { get; set; }
        public int BookingID { get; set; }

    }
}
