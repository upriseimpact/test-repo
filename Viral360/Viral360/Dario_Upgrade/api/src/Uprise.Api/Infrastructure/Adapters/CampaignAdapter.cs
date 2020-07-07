using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Uprise.Api.Domain;
using Uprise.Api.Infrastructure.Repositories;
using Uprise.Api.Infrastructure.Services;
using Uprise.Api.ViewModels;

namespace Uprise.Api.Infrastructure.Adapters
{
    public class CampaignAdapter : IAdapter<CampaignViewModel, Distributor>
    {
        private UpriseContext _databaseContext;
        private CampaignRepository _campaignRepository;
        private readonly SendgridService _sendGridService;

        public CampaignAdapter
        (
            UpriseContext databaseContext,
            CampaignRepository campaignRepository,
            SendgridService sendgridService
        )
        {
            _databaseContext = databaseContext ?? throw new ArgumentNullException( nameof( databaseContext ) );
            _campaignRepository = campaignRepository ?? throw new ArgumentNullException( nameof( campaignRepository ) );
            _sendGridService = sendgridService ?? throw new ArgumentNullException( nameof( sendgridService ) );
        }

        public CampaignViewModel GetById( int id, Distributor distributor )
        {
            Campaign campaign = _campaignRepository.GetById( id );

            if ( campaign == null )
            {
                throw new Exception( "No campaigns associated to this user." );
            }

            if ( campaign.DistributorId != distributor.Id )
            {
                throw new Exception( string.Format( "The campaign with Id: {0} doen not belong to this user.", id ) );
            }

            try
            {
                var campaignToReturn = new CampaignViewModel()
                {
                    DistributorId = campaign.DistributorId,
                    CampaignTitle = campaign.CampaignTitle,
                    SocialMediaId = campaign.SocialMediaId,
                    IndustryId = campaign.IndustryId,
                    City = campaign.City,
                    Gender = campaign.Gender,
                    Message = campaign.Message,
                    CampaignType = campaign.CampaignType,
                    LaunchDate = campaign.LaunchDate
                };

                return campaignToReturn;
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        public IList<CampaignViewModel> List( Distributor distributor )
        {
            var campaigns = _campaignRepository.FilterBy( c => c.DistributorId == distributor.Id );

            if ( campaigns == null )
            {
                throw new Exception( "No campaigns associated to this user." );
            }

            try
            {
                var campaignsList = new List<CampaignViewModel>();
                foreach ( var campaign in campaigns )
                {
                    campaignsList.Add( new CampaignViewModel()
                    {
                        DistributorId = campaign.DistributorId,
                        CampaignTitle = campaign.CampaignTitle,
                        SocialMediaId = campaign.SocialMediaId,
                        IndustryId = campaign.IndustryId,
                        City = campaign.City,
                        Gender = campaign.Gender,
                        Message = campaign.Message,
                        CampaignType = campaign.CampaignType,
                        LaunchDate = campaign.LaunchDate
                    }
                        );
                }

                return campaignsList;
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        public int Create( CampaignViewModel campaignViewModel, Distributor distributor )
        {
            try
            {
                var campaignToCreate = new Campaign()
                {
                    DistributorId = distributor.Id,
                    CampaignTitle = campaignViewModel.CampaignTitle,
                    SocialMediaId = campaignViewModel.SocialMediaId,
                    IndustryId = campaignViewModel.IndustryId,
                    City = campaignViewModel.City,
                    Gender = campaignViewModel.Gender,
                    Message = campaignViewModel.Message,
                    CampaignType = campaignViewModel.CampaignType,
                    LaunchDate = campaignViewModel.LaunchDate
                };

                return _campaignRepository.Create( campaignToCreate );
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        public void Update( CampaignViewModel campaignViewModel, Distributor distributor )
        {

            try
            {
                var campaignToUpdate = _campaignRepository.GetById( campaignViewModel.Id );

                if ( campaignToUpdate.DistributorId != distributor.Id )
                {
                    throw new Exception( string.Format( "The campaign with Id: {0} doen not belong to this user.", campaignViewModel.Id ) );
                }

                campaignToUpdate.CampaignTitle = campaignViewModel.CampaignTitle;
                campaignToUpdate.SocialMediaId = campaignViewModel.SocialMediaId;
                campaignToUpdate.IndustryId = campaignViewModel.IndustryId;
                campaignToUpdate.City = campaignViewModel.City;
                campaignToUpdate.Gender = campaignViewModel.Gender;
                campaignToUpdate.Message = campaignViewModel.Message;
                campaignToUpdate.CampaignType = campaignViewModel.CampaignType;
                campaignToUpdate.LaunchDate = campaignViewModel.LaunchDate;

                _campaignRepository.Update( campaignToUpdate );
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        public void Delete( int id, Distributor distributor )
        {
            try
            {
                var campaignToDelete = _campaignRepository.GetById( id );

                if ( campaignToDelete.DistributorId != distributor.Id )
                {
                    throw new Exception( string.Format( "The campaign with Id: {0} does not belong to this user.", distributor.Id ) );
                }

                _campaignRepository.Delete( campaignToDelete );
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        public async Task<bool> TryPublishCampaign( int campaignId, Distributor distributor )
        {
            Campaign campaign = distributor.Campaigns.Where( c => c.Id == campaignId ).FirstOrDefault();

            if ( campaign == null )
            {
                throw new Exception( "The user does not have a campaign with given ID." );
            }

            if ( !IsCampaignValid( campaign ) )
            {
                throw new Exception( String.Format( "The campaign '{0}' is not ready to be published. Fill in missing fields.", campaign.CampaignTitle ) );
            }
            try
            {
                string response = await _sendGridService.SendCampaignEmail( ( int ) campaignId );
                if ( response == "done" )
                    return true;
                else
                    return false;
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        private bool IsCampaignValid( Campaign campaign )
        {
            //check if campaign meets the required validations to be published.
            return true;
        }
    }
}
