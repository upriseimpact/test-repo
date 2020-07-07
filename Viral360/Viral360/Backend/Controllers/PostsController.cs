using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Uprise.Models;
using Uprise.Helpers;
using Uprise.Adapters;

namespace Uprise.Controllers
{
    //[Authorize(Roles = "Admin, Distributor")]
    [Authorize]
    public class PostsController : Controller
    {
        private ApplicationDbContext _databaseContext = new ApplicationDbContext();
        private PostAdapter _postAdapter = new PostAdapter();

        // GET: Posts
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
                var postsList = _postAdapter.List(distributor);
                return Json(new { success = true, Response = postsList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // GET: Posts/Details/5
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
                var post = _postAdapter.GetById(id.Value, distributor);
                return Json(new { success = true, Response = post }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // POST: Posts/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,DistributorId,PostTitle,PostMessage,MediaType,OriginalMediaLink,ThumbnailLink")] PostViewModel postViewModel)
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
                //uploading post photo to azure storage. 
                string url = ConnectToAzure.UploadPostImage(postViewModel.DistributorId, postViewModel.Id, Request.Files[0].FileName, Request.Files[0].InputStream);
                postViewModel.OriginalMediaLink = url;

                var createdPost = _postAdapter.Create(postViewModel, distributor);
                return Json(new { success = true, Response = createdPost, Error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // POST: Posts/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,DistributorId,PostTitle,PostMessage,MediaType,OriginalMediaLink,ThumbnailLink")] PostViewModel postViewModel)
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
                _postAdapter.Update(postViewModel, distributor);

                return Json(new { success = true, Response = postViewModel, Error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exception)
            {
                return Json(new { success = false, Response = "", Error = exception.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // POST: Posts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int? id)
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
                _postAdapter.Delete(id.Value, distributor);

                return Json(new { success = true, Response = "", Error = "" }, JsonRequestBehavior.AllowGet);
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
            }
            base.Dispose(disposing);
        }
    }
}
