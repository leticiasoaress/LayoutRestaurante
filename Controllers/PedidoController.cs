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
    public class PedidoController : Controller
    {
        HttpClient client = new HttpClient();

        public PedidoController()
        {
            client.BaseAddress = new Uri("http://localhost:52246");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        // GET: Pedido
        public ActionResult Index()
        {
            int IdCliente = Convert.ToInt32(Session["IdCliente"]);
            if (IdCliente <= 0)
            {
                return RedirectToAction("VerificarCPF", "Cliente");
            }

            Cliente cliente = new Cliente();
            List<Pedido> LstPedidos = new List<Pedido>();
            HttpResponseMessage response = client.GetAsync("/api/Pedido").Result;
            if (response.IsSuccessStatusCode)
            {
                LstPedidos = response.Content.ReadAsAsync<List<Pedido>>().Result.FindAll(m => m.ID_CLIENTE == IdCliente);
                HttpResponseMessage responsecli = client.GetAsync($"/api/Cliente/{IdCliente}").Result;
                cliente = responsecli.Content.ReadAsAsync<Cliente>().Result;
                ViewBag.Cliente = cliente.NOME;
            }
            return View(LstPedidos);
        }

        // GET: Pedido/Details/5
        public ActionResult Details(int id)
        {
            HttpResponseMessage response = client.GetAsync($"/api/ItemPedido").Result;
            List<VW_ListaItem> lstItem = response.Content.ReadAsAsync<List<VW_ListaItem>>().Result.FindAll(m => m.ID_PEDIDO == id);
            if (lstItem.Count > 0)
            {
                return View(lstItem);
            }

            return HttpNotFound();
        }

        // GET: Pedido/Create
        public ActionResult Create()
        {
            int IdCliente = Convert.ToInt32(Session["IdCliente"]);
            if (IdCliente <= 0)
            {
                return RedirectToAction("VerificarCPF", "Cliente");
            }
            HttpResponseMessage responsecli = client.GetAsync($"/api/Cliente/{IdCliente}").Result;
            Cliente cliente = responsecli.Content.ReadAsAsync<Cliente>().Result;

            ViewBag.CPF = cliente.CPF;
            ViewBag.Nome = cliente.NOME;

            return View();
        }

        // POST: Pedido/Create
        [HttpPost]
        public ActionResult Create(Pedido pedido)
        {
            try
            {
                pedido.ID_CLIENTE = Convert.ToInt32(Session["IdCliente"]);
                pedido.VL_TOTAL = 0;

                HttpResponseMessage response = client.PostAsJsonAsync<Pedido>("/api/Pedido", pedido).Result;
                if (response.StatusCode == HttpStatusCode.Created) //201 http
                {
                    Session["IdPedido"] = response.Content.ReadAsAsync<Pedido>().Result.ID;
                    return RedirectToAction("Index", "ItemPedido");
                }
                else
                {
                    ViewBag.Error = "Ocorreu um erro durante o processo de adicionar o pedido";
                    return View();
                }
            }
            catch
            {
                return View();
            }
        }

        public ActionResult FinalizarPedido(int IdPedido)
        {
            if(IdPedido > 0)
            {
                HttpResponseMessage response = client.GetAsync($"/api/ItemPedido").Result;
                List<VW_ListaItem> lstItem = response.Content.ReadAsAsync<List<VW_ListaItem>>().Result.FindAll(m => m.ID_PEDIDO == IdPedido);
                if(lstItem.Count > 0)
                {
                    response = client.GetAsync($"/api/Pedido/{IdPedido}").Result;
                    Pedido pedido = response.Content.ReadAsAsync<Pedido>().Result;

                    response = client.PutAsJsonAsync<Pedido>($"/api/Validar/{IdPedido}", pedido).Result;
                    if (response.StatusCode == HttpStatusCode.NoContent) //204 http
                    {
                        Session["IdPedido"] = pedido.ID;
                        return Json(true, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            return Json(false, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PedidoFinalizado()
        {
            string CodPedido = Session["IdPedido"].ToString();
            ViewBag.Codigo = CodPedido;
            //Session.RemoveAll();

            return View();
        }
    }
}
