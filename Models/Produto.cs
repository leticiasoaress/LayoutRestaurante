using LayoutRestaurante.Base;
using System.ComponentModel.DataAnnotations;

namespace LayoutRestaurante.Models
{
    public class Produto : BaseModel
    {
        [Required(ErrorMessage = "{0} obrigatório")]
        [StringLength(250, ErrorMessage = "{0} suporta no máximo {1} caracteres")]
        [Display(Name = "Nome")]
        public string NOME { get; set; }

        [Required(ErrorMessage = "{0} obrigatório")]
        [StringLength(500, ErrorMessage = "{0} suporta no máximo {1} caracteres")]
        [Display(Name = "Descrição")]
        public string DESCRICAO { get; set; }

        [Required(ErrorMessage = "{0} obrigatório")]
        [Display(Name = "Valor do Produto")]
        public decimal VL_PRODUTO { get; set; }

        [Required(ErrorMessage = "{0} obrigatório")]
        [Display(Name = "Acressimo")]
        public bool ISACRESSIMO { get; set; }
    }
}