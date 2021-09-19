using LayoutRestaurante.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Mvc;

namespace LayoutRestaurante.Controllers
{
    public class ProdutoController : Controller
    {
        HttpClient client = new HttpClient();

        public ProdutoController()
        {
            client.BaseAddress = new Uri("http://localhost:52246");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        // GET: Produto
        public ActionResult Index()
        {
            List<Produto> LstProduto = new List<Produto>();
            HttpResponseMessage response = client.GetAsync("/api/Produto").Result;
            if (response.IsSuccessStatusCode)
            {
                LstProduto = response.Content.ReadAsAsync<List<Produto>>().Result;
            }
            return View(LstProduto);
        }

        public ActionResult ListaBedidas()
        {
            List<Produto> LstProduto = new List<Produto>();
            HttpResponseMessage response = client.GetAsync("/api/Produto").Result;
            if (response.IsSuccessStatusCode)
            {
                LstProduto = response.Content.ReadAsAsync<List<Produto>>().Result.FindAll(m=>m.DESCRICAO == "BEBIDA");
            }
            return PartialView(LstProduto);
        }

        public ActionResult ListaLanches()
        {
            List<Produto> LstProduto = new List<Produto>();
            HttpResponseMessage response = client.GetAsync("/api/Produto").Result;
            if (response.IsSuccessStatusCode)
            {
                LstProduto = response.Content.ReadAsAsync<List<Produto>>().Result.FindAll(m => m.DESCRICAO != "BEBIDA" && m.ISACRESSIMO == false);
            }
            return PartialView(LstProduto);
        }

        public ActionResult ListaAcressimos()
        {
            List<Produto> LstProduto = new List<Produto>();
            HttpResponseMessage response = client.GetAsync("/api/Produto").Result;
            if (response.IsSuccessStatusCode)
            {
                LstProduto = response.Content.ReadAsAsync<List<Produto>>().Result.FindAll(m => m.ISACRESSIMO == true);
            }
            return PartialView(LstProduto);
        }

        // GET: Produto/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Produto/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Produto/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Produto/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Produto/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Produto/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Produto/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
