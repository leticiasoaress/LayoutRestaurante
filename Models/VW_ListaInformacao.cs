using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LayoutRestaurante.Models
{
    public class VW_ListaInformacao
    {
        [Display(Name = "Cliente")]
        public string NOME { get; set; }
        [Display(Name = "CPF")]
        public string CPF { get; set; }
        [Display(Name = "Nascimento")]
        public string DT_NASCIMENTO { get; set; }
        [Display(Name = "Codigo Pedido")]
        public int? ID_PEDIDO { get; set; }
        [Display(Name = "Mesa")]
        public int? NR_MESA { get; set; }
        [Display(Name = "Valor Total")]
        public double? VL_TOTAL { get; set; }
        [Display(Name = "Data Pedido")]
        public string DT_CREATE { get; set; }
    }
}