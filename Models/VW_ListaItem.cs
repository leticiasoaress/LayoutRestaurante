using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LayoutRestaurante.Models
{
    public class VW_ListaItem
    {
        [Display(Name = "Cliente")]
        public string CLIENTE { get; set; }
        [Display(Name = "CPF")]
        public string CPF { get; set; }
        [Display(Name = "Data Nascimento")]
        public string DT_NASCIMENTO { get; set; }
        [Display(Name = "Código Pedido")]
        public int? ID_PEDIDO { get; set; }
        [Display(Name = "Produto")]
        public string PRODUTO { get; set; }
        [Display(Name = "Valor Unidade")]
        public double? VL_PRODUTO { get; set; }
        [Display(Name = "Quantidade")]
        public int? QTD_PEDIDO { get; set; }
        [Display(Name = "Valor Item")]
        public double? VALORTOTAL { get; set; }
        [Display(Name = "Código Item")]
        public int? ID_ITEMPEDIDO { get; set; }
    }
}