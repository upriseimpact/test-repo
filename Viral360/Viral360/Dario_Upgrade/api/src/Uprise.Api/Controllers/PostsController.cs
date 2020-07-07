using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Uprise.Api.Domain;
using Uprise.Api.Infrastructure.Adapters;
using Uprise.Api.Infrastructure.Helpers;
using Uprise.Api.Infrastructure.Services;
using Uprise.Api.ViewModels;

namespace Uprise.Api.Controllers
{
    [Route( "[controller]" )]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly AzureBlobService _azureBlobService;
        private readonly PostAdapter _postAdapter;
        private readonly IdentityHelper _identityHelper;


        public PostsController( AzureBlobService azureBlobService, PostAdapter postAdapter, IdentityHelper identityHelper )
        {
            _azureBlobService = azureBlobService;
            _postAdapter = postAdapter;
            _identityHelper = identityHelper;
        }


        [HttpGet]
        public JsonResult Index()
        {
            if ( !_identityHelper.TryGetDistributor( out Distributor distributor, out string errorMessage ) )
            {
                return new JsonResult( new { success = false, Response = "", Error = errorMessage } );
            }

            try
            {
                var postsList = _postAdapter.List( distributor );
                return new JsonResult( new { success = true, Response = postsList } );
            }
            catch ( Exception exception )
            {
                return new JsonResult( new { success = false, Response = "", Error = exception.Message } );
            }
        }

        
        [HttpGet("Details")]
        public JsonResult Details( int? id )
        {
            if ( id == null )
            {
                throw new ArgumentNullException( "Id" );
            }

            if ( !_identityHelper.TryGetDistributor( out Distributor distributor, out string errorMessage ) )
            {
                return new JsonResult( new { success = false, Response = "", Error = errorMessage } );
            }

            try
            {
                var post = _postAdapter.GetById( id.Value, distributor );
                return new JsonResult( new { success = true, Response = post } );
            }
            catch ( Exception exception )
            {
                return new JsonResult( new { success = false, Response = "", Error = exception.Message } );
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create( PostViewModel postViewModel )
        {
            if ( !ModelState.IsValid )
            {
                return new JsonResult( new { success = false, Response = "", Error = ErrorHelper.GetModelStateErrorMessages( ModelState ) } );
            }

            if ( !_identityHelper.TryGetDistributor( out Distributor distributor, out string errorMessage ) )
            {
                return new JsonResult( new { success = false, Response = "", Error = errorMessage } );
            }

            try
            {
                //uploading post photo to azure storage. 
                string url = await _azureBlobService.UploadPostImage( postViewModel.DistributorId, postViewModel.Id, Request.Form.Files [ 0 ].FileName, Request.Form.Files [ 0 ].OpenReadStream() );
                postViewModel.OriginalMediaLink = url;

                var createdPost = _postAdapter.Create( postViewModel, distributor );
                return new JsonResult( new { success = true, Response = createdPost, Error = "" } );
            }
            catch ( Exception exception )
            {
                return new JsonResult( new { success = false, Response = "", Error = exception.Message } );
            }
        }

        [HttpPut]
        public ActionResult Edit( PostViewModel postViewModel )
        {
            if ( !ModelState.IsValid )
            {
                return new JsonResult( new { success = false, Response = "", Error = ErrorHelper.GetModelStateErrorMessages( ModelState ) } );
            }

            if ( !_identityHelper.TryGetDistributor( out Distributor distributor, out string errorMessage ) )
            {
                return new JsonResult( new { success = false, Response = "", Error = errorMessage } );
            }

            try
            {
                _postAdapter.Update( postViewModel, distributor );

                return new JsonResult( new { success = true, Response = postViewModel, Error = "" } );
            }
            catch ( Exception exception )
            {
                return new JsonResult( new { success = false, Response = "", Error = exception.Message } );
            }
        }

        [HttpDelete]
        public ActionResult DeleteConfirmed( int? id )
        {
            if ( id == null )
            {
                return new JsonResult( new { success = false, Response = "", Error = "Id is null, please provide it in the request." } );
            }

            if ( !_identityHelper.TryGetDistributor( out Distributor distributor, out string errorMessage ) )
            {
                return new JsonResult( new { success = false, Response = "", Error = errorMessage } );
            }

            try
            {
                _postAdapter.Delete( id.Value, distributor );

                return new JsonResult( new { success = true, Response = "", Error = "" } );
            }
            catch ( Exception exception )
            {
                return new JsonResult( new { success = false, Response = "", Error = exception.Message } );
            }
        }
    }
}
