using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Uprise.Api.Domain;
using Uprise.Api.Infrastructure.Helpers;
using Uprise.Api.Infrastructure.Repositories.Interfaces;

namespace Uprise.Api.Infrastructure.Repositories
{
    public class ContactRepository : IRepository<Contact>
    {
        private readonly UpriseContext _upriseContext;


        public ContactRepository( UpriseContext upriseContext )
        {
            _upriseContext = upriseContext ?? throw new ArgumentNullException( nameof( upriseContext ) );
        }


        public Contact GetById( int id )
        {
            try
            {
                return _upriseContext.Contacts.Find( id );
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }

        public IEnumerable<Contact> FilterBy( Expression<Func<Contact, bool>> filter )
        {
            try
            {
                return _upriseContext.Set<Contact>().Where( filter );
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }

        public IEnumerable<Contact> GetAll()
        {
            try
            {
                return _upriseContext.Contacts;
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }

        public int Create( Contact contact )
        {
            try
            {
                _upriseContext.Contacts.Add( contact );
                _upriseContext.SaveChanges();
                return contact.Id;
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }

        public void Update( Contact contact )
        {
            try
            {
                _upriseContext.Entry( contact ).State = EntityState.Modified;
                _upriseContext.SaveChanges();
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }

        public void Delete( Contact contact )
        {
            try
            {
                _upriseContext.Contacts.Remove( contact );
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
