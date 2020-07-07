using System;
using System.Collections.Generic;
using System.Linq;
using Uprise.Models;
using Uprise.Repositories.Interfaces;
using Uprise.Helpers;
using System.Data.Entity;
using System.Linq.Expressions;

namespace Uprise.Repositories
{
    public class ContactRepository : IRepository<Contact>, IDisposable
    {
        private ApplicationDbContext _databaseContext;

        public ContactRepository()
        {
            _databaseContext = new ApplicationDbContext();
        }

        public Contact GetById(int id)
        {
            try
            {
                return _databaseContext.Contacts.Find(id);
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public IEnumerable<Contact> FilterBy(Expression<Func<Contact, bool>> filter)
        {
            try
            {
                return _databaseContext.Set<Contact>().Where(filter);
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public IEnumerable<Contact> GetAll()
        {
            try
            {
                return _databaseContext.Contacts;
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public int Create(Contact contact)
        {
            try
            {
                _databaseContext.Contacts.Add(contact);
                _databaseContext.SaveChanges();
                return contact.Id;
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public void Update(Contact contact)
        {
            try
            {
                _databaseContext.Entry(contact).State = EntityState.Modified;
                _databaseContext.SaveChanges();
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public void Delete(Contact contact)
        {
            try
            {
                _databaseContext.Contacts.Remove(contact);
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