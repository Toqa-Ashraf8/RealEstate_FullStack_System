

using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

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
         public string? unitStatus { get; set; }
         public string? unitImage { get; set; }
          public int projectCode { get; set; }
}

