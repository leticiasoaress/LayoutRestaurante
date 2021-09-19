using LayoutRestaurante.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Mvc;

namespace LayoutRestaurante.Controllers
{
    public class ClienteController : Controller
    {
        HttpClient client = new HttpClient();

        public ClienteController()
        {
            client.BaseAddress = new Uri("http://localhost:52246");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        // GET: Cliente
        public ActionResult Index()
        {
            List<Cliente> LstCliente = new List<Cliente>();
            HttpResponseMessage response = client.GetAsync("/api/Cliente").Result;
            if (response.IsSuccessStatusCode)
            {
                LstCliente = response.Content.ReadAsAsync<List<Cliente>>().Result;
            }
            return View(LstCliente);
        }

        public ActionResult Perfil()
        {
            int IdCliente = Convert.ToInt32(Session["IdCliente"]);
            if (IdCliente <= 0)
            {
                return RedirectToAction("VerificarCPF", "Cliente");
            }
            return RedirectToAction("Edit", "Cliente", new { id = IdCliente });
        }

        // GET: Cliente/Details/5
        public ActionResult Details(int id)
        {
            HttpResponseMessage response = client.GetAsync($"/api/Cliente/{id}").Result;
            Cliente cliente = response.Content.ReadAsAsync<Cliente>().Result;
            if (cliente != null)
            {
                return View(cliente);
            }

            return HttpNotFound();
        }

        // GET: Cliente/Create
        public ActionResult Create()
        {
            string cpf = Session["CPFCliente"].ToString();
            Cliente cliente = new Cliente();
            cliente.CPF = cpf;

            return View(cliente);
        }

        // POST: Cliente/Create
        [HttpPost]
        public ActionResult Create(Cliente cliente)
        {
            try
            {
                HttpResponseMessage response = client.PostAsJsonAsync<Cliente>("/api/Cliente", cliente).Result;
                if (response.StatusCode == HttpStatusCode.Created) //201 http
                {
                    Session["IdCliente"] = response.Content.ReadAsAsync<Cliente>().Result.ID;
                    return RedirectToAction("Index", "Pedido");
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

        // GET: Cliente/Edit/5
        public ActionResult Edit(int id)
        {
            HttpResponseMessage response = client.GetAsync($"/api/Cliente/{id}").Result;
            Cliente cliente = response.Content.ReadAsAsync<Cliente>().Result;
            if (cliente != null)
            {
                return View(cliente);
            }
            return HttpNotFound();
        }

        // POST: Cliente/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, Cliente cliente)
        {
            try
            {
                HttpResponseMessage response = client.PutAsJsonAsync<Cliente>($"/api/Cliente/{id}", cliente).Result;
                if (response.StatusCode == HttpStatusCode.NoContent) //201 http
                {
                    ViewBag.Success = "Informações Alteradas com sucesso";
                    return View();
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

        // GET: Cliente/Delete/5
        public ActionResult Delete(int id)
        {
            HttpResponseMessage response = client.GetAsync($"/api/Cliente/{id}").Result;
            Cliente cliente = response.Content.ReadAsAsync<Cliente>().Result;
            if (cliente != null)
            {
                return View(cliente);
            }
            return HttpNotFound();
        }

        // POST: Cliente/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                HttpResponseMessage response = client.DeleteAsync($"/api/Cliente/{id}").Result;
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

        public ActionResult VerificarCPF()
        {
            return View();
        }

        public ActionResult ValidarCPF(string cpf)
        {
            cpf = cpf.Replace(".", "").Replace("-", "");
            HttpResponseMessage response = client.GetAsync($"/api/Validar/{cpf}").Result;
            Cliente cliente = response.Content.ReadAsAsync<Cliente>().Result;
            if (cliente != null)
            {
                Session["IdCliente"] = cliente.ID;
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            Session["CPFCliente"] = cpf;

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
