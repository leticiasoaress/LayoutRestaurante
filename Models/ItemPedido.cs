using LayoutRestaurante.Base;
using System.ComponentModel.DataAnnotations;

namespace LayoutRestaurante.Models
{
    public class ItemPedido : BaseModel
    {
        [Required(ErrorMessage = "{0} obrigatório")]
        [Display(Name = "Pedido")]
        public int ID_PEDIDO { get; set; }

        [Required(ErrorMessage = "{0} obrigatório")]
        [Display(Name = "Produto")]
        public int? ID_PRODUTO { get; set; }

        [Required(ErrorMessage = "{0} obrigatório")]
        [Display(Name = "Quantidade")]
        public int QTD { get; set; }

        [Required(ErrorMessage = "{0} obrigatório")]
        [Display(Name = "Valor do Total Item")]
        public decimal VL_ITEM { get; set; }
    }
}