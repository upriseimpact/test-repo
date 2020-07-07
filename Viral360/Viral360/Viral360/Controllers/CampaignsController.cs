using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Identity.Client;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Web.Mvc;
using Uprise.Models;
using Uprise.Helpers;
using Uprise.Services;
using System.Configuration;
using Uprise.Repositories;
using Uprise.Adapters;

namespace Uprise.Controllers
{
    [Authorize]
    public class CampaignsController : Controller
    {

        private ApplicationDbContext _databaseContext = new ApplicationDbContext();
        private CampaignAdapter _campaignAdapter = new CampaignAdapter();

        // GET: Campaigns
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
                var campaignsList = _campaignAdapter.List(distributor);
                return Json(new { success = true, Response = campaignsList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // GET: Campaigns/Details/5
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
                var campaign = _campaignAdapter.GetById(id.Value, distributor);
                return Json(new { success = true, Response = campaign }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<JsonResult> Create([Bind(Include = "Id,DistributorId,CampaignTitle,SocialMediaId,IndustryId,City,Gender,Message,CampaignType, LaunchDate")] CampaignViewModel campaignViewModel)
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
                var createdCampaign = _campaignAdapter.Create(campaignViewModel, distributor);
                return Json(new { success = true, Response = createdCampaign, Error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }

        }

        // POST: Campaigns/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<JsonResult> Edit([Bind(Include = "Id,DistributorId,CampaignTitle,SocialMediaId,IndustryId,City,Gender,Message,CampaignType, LaunchDate")] CampaignViewModel campaignViewModel)
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
                _campaignAdapter.Update(campaignViewModel, distributor);

                return Json(new { success = true, Response = campaignViewModel, Error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // POST: Campaigns/Delete/5
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
                _campaignAdapter.Delete(id.Value, distributor);

                return Json(new { success = true, Response = "", Error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }

        }

        public async Task<JsonResult> PublishCampaign(int? campaignId)
        {
            if (campaignId == null)
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
                if (await _campaignAdapter.TryPublishCampaign(campaignId.Value, distributor))
                {
                    return Json(new { success = true, Response = "Campaign is on the way to the advocates.", Error = "" }, JsonRequestBehavior.AllowGet);
                }

                return Json(new { success = false, Response = "", Error = "Campaing could not be sent, see logs." }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _databaseContext.Dispose();
                _campaignAdapter.Dispose();
            }
            base.Dispose(disposing);
        }

        private void IsValidAdvocates(int[] advocatesIds, Distributor distributor)
        {
            foreach (var advocateId in advocatesIds)
            {
                var v = _databaseContext.Contacts.Find(advocateId);
                if (v != null)
                {
                    if (!distributor.Contacts.Contains(v))
                    {
                        throw new Exception(String.Format("Advocate {0} does not belong to the signed in distributor.", advocateId));
                    }
                }
                else
                {
                    throw new Exception(String.Format("Advocate {0} is not exisat in the database.", advocateId));
                }
            }
        }
    }
}
