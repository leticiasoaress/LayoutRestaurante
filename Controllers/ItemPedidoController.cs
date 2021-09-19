using LayoutRestaurante.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;

namespace LayoutRestaurante.Controllers
{
    public class ItemPedidoController : Controller
    {
        HttpClient client = new HttpClient();
        private static int IdCliente;
        private static int IdPedido;

        public ItemPedidoController()
        {
            client.BaseAddress = new Uri("http://localhost:52246");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        // GET: ItemPedido
        public ActionResult Index()
        {
            IdPedido = Convert.ToInt32(Session["IdPedido"]);
            IdCliente = Convert.ToInt32(Session["IdCliente"]);
            VW_ListaInformacao lstInformacao = new VW_ListaInformacao();

            HttpResponseMessage response = client.GetAsync("/api/Informacao").Result;
            if (response.IsSuccessStatusCode)
            {
                lstInformacao = response.Content.ReadAsAsync<List<VW_ListaInformacao>>().Result.FirstOrDefault(m=>m.ID_PEDIDO == IdPedido);
            }
            return View(lstInformacao);
        }

        // GET: ItemPedido/Create
        public ActionResult Create()
        {
            ItemPedido itemPedido = new ItemPedido();
            List<Produto> LstProduto = new List<Produto>();
            HttpResponseMessage response = client.GetAsync("/api/Produto").Result;
            if (response.IsSuccessStatusCode)
            {
                LstProduto = response.Content.ReadAsAsync<List<Produto>>().Result;
                ViewBag.LstProduto = LstProduto.Select(m => new SelectListItem()
                {
                    Value = m.ID.ToString(),
                    Text = m.NOME
                });
            }
            else
            {
                ViewBag.Error = "Não possui produtos cadastrados no banco de dados.";
            }
                      
            return PartialView(itemPedido);
        }

        // POST: ItemPedido/Create
        [HttpPost]
        public ActionResult Create(ItemPedido itemPedido)
        {
            try
            {
                itemPedido.ID_PEDIDO = IdPedido;
                HttpResponseMessage response = client.PostAsJsonAsync<ItemPedido>("/api/ItemPedido", itemPedido).Result;
                if (response.StatusCode == HttpStatusCode.Created) //201 http
                {
                    List<Produto> LstProduto = new List<Produto>();
                    HttpResponseMessage responseProd = client.GetAsync("/api/Produto").Result;
                    LstProduto = responseProd.Content.ReadAsAsync<List<Produto>>().Result;
                    ViewBag.LstProduto = LstProduto.Select(m => new SelectListItem()
                    {
                        Value = m.ID.ToString(),
                        Text = m.NOME
                    });
                    return PartialView(new ItemPedido());
                }   
            }
            catch
            {

            }
            ViewBag.Error = "Ocorreu um erro durante o processo de adicionar o item";
            return PartialView(itemPedido);
        }

        public ActionResult ListaItens()
        {
            if (IdPedido <= 0)
            {
                return RedirectToAction("Create", "Pedido");
            }
            List<VW_ListaItem> LstItem = new List<VW_ListaItem>();
            HttpResponseMessage response = client.GetAsync($"/api/ItemPedido").Result;
            if (response.IsSuccessStatusCode)
            {
                LstItem = response.Content.ReadAsAsync<List<VW_ListaItem>>().Result.FindAll(m => m.ID_PEDIDO == IdPedido);
            }          
            return PartialView(LstItem);
        }


        // GET: ItemPedido/Delete/5
        public ActionResult Delete(int id)
        {
            HttpResponseMessage response = client.GetAsync($"/api/ItemPedido/{id}").Result;
            ItemPedido item = response.Content.ReadAsAsync<ItemPedido>().Result;
            if (item != null)
            {
                HttpResponseMessage responseProdut = client.GetAsync($"/api/Produto/{item.ID_PRODUTO}").Result;
                Produto produto = new Produto();
                produto = responseProdut.Content.ReadAsAsync<Produto>().Result;
                ViewBag.Produto = produto.NOME;
                return View(item);
            }
            return HttpNotFound();
        }

        // POST: ItemPedido/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                HttpResponseMessage response = client.DeleteAsync($"/api/ItemPedido/{id}").Result;
                if (response.StatusCode == HttpStatusCode.OK) //200 http
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    ViewBag.Error = "Ocorreu um erro durante o processo de adicionar o cliente";
                    return View();
                }
            }
            catch
            {
                return View();
            }
        }

        public ActionResult ValorItem(int IdProduto)
        {
            decimal valor = 0;
            HttpResponseMessage response = client.GetAsync($"/api/Produto/{IdProduto}").Result;
            if (response.IsSuccessStatusCode)
            {
                Produto produto = response.Content.ReadAsAsync<Produto>().Result;
                valor = produto.VL_PRODUTO;
            }
            return Json(valor, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CalculoTotal(int IdProduto, int? qtd)
        {
            decimal total = 0;
            HttpResponseMessage response = client.GetAsync($"/api/Produto/{IdProduto}").Result;
            if (response.IsSuccessStatusCode)
            {
                Produto produto = response.Content.ReadAsAsync<Produto>().Result;
                decimal valor = produto.VL_PRODUTO;
                total = valor * Convert.ToDecimal(qtd);
            }
            return Json(total, JsonRequestBehavior.AllowGet);
        }
    }
}
