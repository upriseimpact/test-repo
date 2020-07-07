using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Uprise.Models;

namespace Uprise.Controllers
{
    //[Authorize(Roles = "Admin, Sharer")]
    public class SharersController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Sharers
        public async Task<ActionResult> Index()
        {
            return View(await db.Sharer.ToListAsync());
        }

        // GET: Sharers/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sharer sharer = await db.Sharer.FindAsync(id);
            if (sharer == null)
            {
                return HttpNotFound();
            }
            return View(sharer);
        }

        // GET: Sharers/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Sharers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,FirstName,LastName")] Sharer sharer)
        {
            if (ModelState.IsValid)
            {
                db.Sharer.Add(sharer);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(sharer);
        }

        // GET: Sharers/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sharer sharer = await db.Sharer.FindAsync(id);
            if (sharer == null)
            {
                return HttpNotFound();
            }
            return View(sharer);
        }

        // POST: Sharers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,FirstName,LastName")] Sharer sharer)
        {
            if (ModelState.IsValid)
            {
                db.Entry(sharer).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(sharer);
        }

        // GET: Sharers/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Sharer sharer = await db.Sharer.FindAsync(id);
            if (sharer == null)
            {
                return HttpNotFound();
            }
            return View(sharer);
        }

        // POST: Sharers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            Sharer sharer = await db.Sharer.FindAsync(id);
            db.Sharer.Remove(sharer);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

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
