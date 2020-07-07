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
using Microsoft.AspNet.Identity;
using Uprise.Helpers;
using Uprise.Helpers;
using System.IO;
using Uprise.Models;
using Uprise.Enums;
using Uprise.Adapters;

namespace Uprise.Controllers
{
    //[Authorize(Roles = "Admin, Distributor")]
    [Authorize]
    public class ContactsController : Controller
    {
        private ApplicationDbContext _databaseContext = new ApplicationDbContext();
        private ContactAdapter _contactAdapter = new ContactAdapter();

        // GET: Contacts
        public JsonResult Index()
        {
            var errorMessage = "";
            var distributor = new Distributor();

            if (!IdentityHelper.TryGetDistributor(User, out distributor, out errorMessage))
            {
                return Json(new { success = false, Response = "", Error = errorMessage }, JsonRequestBehavior.AllowGet);
            }

            try
            {
                var contactsList = _contactAdapter.List(distributor);
                return Json(new { success = true, Response = contactsList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // GET: Contacts/Details/5
        public async Task<JsonResult> Details(int? id)
        {
            if (id == null)
            {
                throw new ArgumentNullException("Id");
            }

            var errorMessage = "";
            var distributor = new Distributor();

            if (!IdentityHelper.TryGetDistributor(User, out distributor, out errorMessage))
            {
                return Json(new { success = false, Response = "", Error = errorMessage }, JsonRequestBehavior.AllowGet);
            }

            try
            {
                var contact = _contactAdapter.GetById(id.Value, distributor);
                return Json(new { success = true, Response = contact }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // POST: Contacts/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<JsonResult> Create([Bind(Include = "DistributorId,Platform,Email,FirstName,LastName,Age,Country,Province,City,Gender")] ContactViewModel contactViewModel)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, Response = "", Error = ErrorHelper.GetModelStateErrorMessages(ModelState) }, JsonRequestBehavior.AllowGet);
            }

            var errorMessage = "";
            var distributor = new Distributor();

            if (!IdentityHelper.TryGetDistributor(User, out distributor, out errorMessage))
            {
                return Json(new { success = false, Response = "", Error = errorMessage }, JsonRequestBehavior.AllowGet);
            }

            try
            {
                var createdContact = _contactAdapter.Create(contactViewModel, distributor);
                return Json(new { success = true, Response = createdContact, Error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // POST: Contacts/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<JsonResult> Edit([Bind(Include = "Id,DistributorId,Platform,Email,FirstName,LastName,Age,Country,Province,City,Gender")] ContactViewModel contactViewModel)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, Response = "", Error = ErrorHelper.GetModelStateErrorMessages(ModelState) }, JsonRequestBehavior.AllowGet);
            }

            var errorMessage = "";
            var distributor = new Distributor();

            if (!IdentityHelper.TryGetDistributor(User, out distributor, out errorMessage))
            {
                return Json(new { success = false, Response = "", Error = errorMessage }, JsonRequestBehavior.AllowGet);
            }

            try
            {
                _contactAdapter.Update(contactViewModel, distributor);

                return Json(new { success = true, Response = contactViewModel, Error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // POST: Contacts/Delete/5
        [HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        public async Task<JsonResult> DeleteConfirmed(int? id)
        {
            if (id == null)
            {
                return Json(new { success = false, Response = "", Error = "Id is null, please provide it in the request." }, JsonRequestBehavior.AllowGet);
            }

            var errorMessage = "";
            var distributor = new Distributor();

            if (!IdentityHelper.TryGetDistributor(User, out distributor, out errorMessage))
            {
                return Json(new { success = false, Response = "", Error = errorMessage }, JsonRequestBehavior.AllowGet);
            }

            try
            {
                _contactAdapter.Delete(id.Value, distributor);

                return Json(new { success = true, Response = "", Error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult PushContacts()
        {
            var errorMessage = "";
            var distributor = new Distributor();

            if (!IdentityHelper.TryGetDistributor(User, out distributor, out errorMessage))
            {
                return Json(new { success = false, Response = "", Error = errorMessage }, JsonRequestBehavior.AllowGet);
            }

            try
            {
                if (Request.Files.Count <= 0)
                {
                    return Json(new { success = false, Response = "", Error = "Upload the contacts csv file." }, JsonRequestBehavior.AllowGet);
                }

                var contactsFile = Request.Files[0];
                _contactAdapter.AddContacts(contactsFile, distributor);
                return Json(new { success = true, Response = "contacts have been added successfully." }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { failure = false, Response = "", Error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _databaseContext.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
