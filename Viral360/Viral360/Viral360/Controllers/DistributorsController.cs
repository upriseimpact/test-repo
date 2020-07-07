using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Uprise.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System.Threading.Tasks;
using Uprise.Helpers;

namespace Uprise.Controllers
{
    //[Authorize]
    //[Authorize(Roles = "Admin, Distributor")]
    public class DistributorsController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Distributors
        [Authorize(Roles = "Admin, Distributor")]
        public ActionResult Index()
        {
            var distributor = db.Distributor.Include(d => d.DistributorStatus).Include(d => d.UserId);
            return View(distributor.ToList());
        }

        // GET: Distributors/Details/5
        public async Task<JsonResult> Details(int? id)
        {
            var result = Json(new { success = false, Response = "", Error = "Id is null, please provide it in the request." }, JsonRequestBehavior.AllowGet);
            if (id == null)
            {
                return result;
            }
            Distributor distributor = await db.Distributor.FindAsync(id);
            if (distributor == null)
            {
                result = Json(new { success = false, Response = "", Error = "No distributor associated to this ID." }, JsonRequestBehavior.AllowGet);
                return result;
            }
            result = Json(new { success = true, Response = Serializer.DeserializeDistributor(distributor) }, JsonRequestBehavior.AllowGet);
            return result;
        }

        public ActionResult DistributorHome()
        {
            DistributorHomeViewModel distributorViewModel;

            if (TempData["distributorViewModel"] == null)
            {
                var userId = User.Identity.GetUserId<int>();
                var distributor = db.Distributor.Where(d => d.Id == userId).FirstOrDefault();


                if (distributor != null)
                {
                    distributorViewModel = Serializer.DeserializeDistributor(distributor);
                }
                else
                {
                    TempData["ErrorMessage"] = "Not authorized.";
                    return RedirectToAction("Index", "Home");
                }

            }
            else
            {
                distributorViewModel = new DistributorHomeViewModel();
                distributorViewModel = (DistributorHomeViewModel)TempData["distributorViewModel"];
            }
            return View(distributorViewModel);
        }

        [Authorize(Roles = "Admin, Distributor")]
        // GET: Distributors/Create
        public ActionResult Create()
        {
            ViewBag.StatusId = new SelectList(db.DistributorStatus, "Id", "StatusName");
            ViewBag.Id = new SelectList(db.Users, "Id", "Email");
            return View();
        }

        // POST: Distributors/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Authorize(Roles = "Admin, Distributor")]
        //[ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,StatusId")] Distributor distributor)
        {
            if (ModelState.IsValid)
            {
                db.Distributor.Add(distributor);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.StatusId = new SelectList(db.DistributorStatus, "Id", "StatusName", distributor.StatusId);
            ViewBag.Id = new SelectList(db.Users, "Id", "Email", distributor.Id);
            return View(distributor);
        }

        // GET: Distributors/Edit/5
        [Authorize(Roles = "Admin, Distributor")]
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Distributor distributor = db.Distributor.Find(id);
            if (distributor == null)
            {
                return HttpNotFound();
            }
            ViewBag.StatusId = new SelectList(db.DistributorStatus, "Id", "StatusName", distributor.StatusId);
            ViewBag.Id = new SelectList(db.Users, "Id", "Email", distributor.Id);
            return View(distributor);
        }

        // POST: Distributors/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin, Distributor")]
        public ActionResult Edit([Bind(Include = "Id,StatusId")] Distributor distributor)
        {
            if (ModelState.IsValid)
            {
                db.Entry(distributor).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.StatusId = new SelectList(db.DistributorStatus, "Id", "StatusName", distributor.StatusId);
            ViewBag.Id = new SelectList(db.Users, "Id", "Email", distributor.Id);
            return View(distributor);
        }

        // GET: Distributors/Delete/5
        [Authorize(Roles = "Admin, Distributor")]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Distributor distributor = db.Distributor.Find(id);
            if (distributor == null)
            {
                return HttpNotFound();
            }
            return View(distributor);
        }

        // POST: Distributors/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin, Distributor")]
        public ActionResult DeleteConfirmed(int id)
        {
            Distributor distributor = db.Distributor.Find(id);
            db.Distributor.Remove(distributor);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        //public ActionResult DistributorHome(int? id)
        //{

        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
