namespace WebApp1.Models
{
    public class UnitInstallments
    {
        public int BookingID { get; set; }
        public int UnitID { get; set; }
        public string unitName { get; set; }
        public string ProjectName { get; set; }
        public List<Installment> Installments { get; set; }
    }
}
