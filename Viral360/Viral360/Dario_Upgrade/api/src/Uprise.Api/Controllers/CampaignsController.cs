using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Uprise.Api.Domain;
using Uprise.Api.Infrastructure.Adapters;
using Uprise.Api.Infrastructure.Helpers;
using Uprise.Api.ViewModels;

namespace Uprise.Api.Controllers
{
    [Route( "[controller]" )]
    [ApiController]
    public class CampaignsController : ControllerBase
    {
        private readonly CampaignAdapter _campaignAdapter;
        private readonly IdentityHelper _identityHelper;


        public CampaignsController
        (
            CampaignAdapter campaignAdapter,
            IdentityHelper identityHelper
        )
        {
            _campaignAdapter = campaignAdapter;
            _identityHelper = identityHelper;
        }


        [HttpGet]
        public IActionResult Index()
        {
            if ( !_identityHelper.TryGetDistributor( out Distributor distributor, out string errorMessage ) )
            {
                return new JsonResult( new { success = false, Response = "", Error = errorMessage } );
            }

            try
            {
                var campaignsList = _campaignAdapter.List( distributor );
                return new JsonResult( new { success = true, Response = campaignsList } );
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
                var campaign = _campaignAdapter.GetById( id.Value, distributor );
                return new JsonResult( new { success = true, Response = campaign } );
            }
            catch ( Exception exception )
            {
                return new JsonResult( new { success = false, Response = "", Error = exception.Message } );
            }
        }


        [HttpPost]
        public JsonResult Create( CampaignViewModel campaignViewModel )
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
                var createdCampaign = _campaignAdapter.Create( campaignViewModel, distributor );
                return new JsonResult( new { success = true, Response = createdCampaign, Error = "" } );
            }
            catch ( Exception exception )
            {
                return new JsonResult( new { success = false, Response = "", Error = exception.Message } );
            }
        }


        [HttpPut]
        public JsonResult Edit( CampaignViewModel campaignViewModel )
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
                _campaignAdapter.Update( campaignViewModel, distributor );

                return new JsonResult( new { success = true, Response = campaignViewModel, Error = "" } );
            }
            catch ( Exception exception )
            {
                return new JsonResult( new { success = false, Response = "", Error = exception.Message } );
            }
        }

        [HttpDelete]
        public JsonResult DeleteConfirmed( int? id )
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
                _campaignAdapter.Delete( id.Value, distributor );

                return new JsonResult( new { success = true, Response = "", Error = "" } );
            }
            catch ( Exception exception )
            {
                return new JsonResult( new { success = false, Response = "", Error = exception.Message } );
            }

        }

        [HttpPost("Publish")]
        public async Task<JsonResult> PublishCampaign( int? campaignId )
        {
            if ( campaignId == null )
            {
                return new JsonResult( new { success = false, Response = "", Error = "Id is null, please provide it in the request." } );
            }

            if ( !_identityHelper.TryGetDistributor( out Distributor distributor, out string errorMessage ) )
            {
                return new JsonResult( new { success = false, Response = "", Error = errorMessage } );
            }

            try
            {
                if ( await _campaignAdapter.TryPublishCampaign( campaignId.Value, distributor ) )
                {
                    return new JsonResult( new { success = true, Response = "Campaign is on the way to the advocates.", Error = "" } );
                }

                return new JsonResult( new { success = false, Response = "", Error = "Campaing could not be sent, see logs." } );
            }
            catch ( Exception exception )
            {
                return new JsonResult( new { success = false, Response = "", Error = exception.Message } );
            }
        }
    }
}
