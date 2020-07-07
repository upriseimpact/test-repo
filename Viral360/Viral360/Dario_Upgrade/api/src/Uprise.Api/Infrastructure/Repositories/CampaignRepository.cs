using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Uprise.Api.Domain;
using Uprise.Api.Infrastructure.Helpers;
using Uprise.Api.Infrastructure.Repositories.Interfaces;

namespace Uprise.Api.Infrastructure.Repositories
{
    public class CampaignRepository : IRepository<Campaign>
    {
        private readonly UpriseContext _upriseContext;


        public CampaignRepository( UpriseContext upriseContext )
        {
            _upriseContext = upriseContext ?? throw new ArgumentNullException( nameof( upriseContext ) );
        }


        public Campaign GetById( int id )
        {
            try
            {
                return _upriseContext.Campaigns.Find( id );
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }


        public IEnumerable<Campaign> FilterBy( Expression<Func<Campaign, bool>> filter )
        {
            try
            {
                return _upriseContext.Set<Campaign>().Where( filter );
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }


        public IEnumerable<Campaign> GetAll()
        {
            try
            {
                return _upriseContext.Campaigns;
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }


        public int Create( Campaign campaign )
        {
            try
            {
                _upriseContext.Campaigns.Add( campaign );
                _upriseContext.SaveChanges();
                return campaign.Id;
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }


        public void Update( Campaign campaign )
        {
            try
            {
                _upriseContext.Entry( campaign ).State = EntityState.Modified;
                _upriseContext.SaveChanges();
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }

        public void Delete( Campaign campaign )
        {
            try
            {
                _upriseContext.Campaigns.Remove( campaign );
                _upriseContext.SaveChanges();
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }
    }
}
