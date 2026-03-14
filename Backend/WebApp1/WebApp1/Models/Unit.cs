

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApp1.Models;

public class Unit
 {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? serial { get; set; }
        public string? unitName{ get; set; }
        public string? Floor { get; set; }
         public float? TotalArea { get; set; }
         public int? MeterPrice { get; set; }
         public float? TotalPrice { get; set; }
         public string? Unitstatus { get; set; }
         public string? unitImage { get; set; }
         public int ProjectCode { get; set; }
         [ForeignKey("ProjectCode")]
         public virtual project Projects { get; set; }
}

