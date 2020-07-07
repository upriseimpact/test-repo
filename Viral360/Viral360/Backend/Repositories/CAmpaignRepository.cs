using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Uprise.Models;
using Uprise.Repositories.Interfaces;
using Uprise.Helpers;
using System.Data.Entity;
using System.Linq.Expressions;

namespace Uprise.Repositories
{
    public class CampaignRepository : IRepository<Campaign>, IDisposable
    {
        private ApplicationDbContext _databaseContext;

        public CampaignRepository()
        {
            _databaseContext = new ApplicationDbContext();
        }

        public Campaign GetById(int id)
        {
            try
            {
                return _databaseContext.Campaigns.Find(id);
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public IEnumerable<Campaign> FilterBy(Expression<Func<Campaign, bool>> filter)
        {
            try
            {
                return _databaseContext.Set<Campaign>().Where(filter);
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public IEnumerable<Campaign> GetAll()
        {
            try
            {
                return _databaseContext.Campaigns;
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public int Create(Campaign campaign)
        {
            try
            {
                _databaseContext.Campaigns.Add(campaign);
                _databaseContext.SaveChanges();
                return campaign.Id;
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public void Update(Campaign campaign)
        {
            try
            {
                _databaseContext.Entry(campaign).State = EntityState.Modified;
                _databaseContext.SaveChanges();
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public void Delete(Campaign campaign)
        {
            try
            {
                _databaseContext.Campaigns.Remove(campaign);
                _databaseContext.SaveChanges();
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public void Dispose()
        {
            ((IDisposable)_databaseContext).Dispose();
        }
    }
}