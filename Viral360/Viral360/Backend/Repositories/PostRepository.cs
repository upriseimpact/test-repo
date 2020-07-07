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
    public class PostRepository : IRepository<Post>, IDisposable
    {
        private ApplicationDbContext _databaseContext;

        public PostRepository()
        {
            _databaseContext = new ApplicationDbContext();
        }

        public Post GetById(int id)
        {
            try
            {
                return _databaseContext.Post.Find(id);
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public IEnumerable<Post> FilterBy(Expression<Func<Post, bool>> filter)
        {
            try
            {
                return _databaseContext.Set<Post>().Where(filter);
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public IEnumerable<Post> GetAll()
        {
            try
            {
                return _databaseContext.Post;
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public int Create(Post post)
        {
            try
            {
                _databaseContext.Post.Add(post);
                _databaseContext.SaveChanges();
                return post.Id;
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public void Update(Post post)
        {
            try
            {
                _databaseContext.Entry(post).State = EntityState.Modified;
                _databaseContext.SaveChanges();
            }
            catch (Exception ex)
            {
                var message = "";
                ErrorHelper.GetExceptionMessages(ex, message);
                throw new Exception(message);
            }
        }

        public void Delete(Post post)
        {
            try
            {
                _databaseContext.Post.Remove(post);
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