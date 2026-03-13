using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace WebApp1.Models
{
    public class Negotiation_Phase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ClientID { get; set; }
        public Boolean NegotiationCondition { get; set; }
        public int SuggestedPrice { get; set; }
        public string ReasonOfReject { get; set; }
        public DateTime CheckedDate { get; set; }


    }
}
