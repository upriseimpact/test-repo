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
    public class PostRepository : IRepository<Post>
    {
        private readonly UpriseContext _upriseContext;


        public PostRepository( UpriseContext upriseContext )
        {
            _upriseContext = upriseContext ?? throw new ArgumentNullException( nameof( upriseContext ) );
        }


        public Post GetById( int id )
        {
            try
            {
                return _upriseContext.Post.Find( id );
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }

        public IEnumerable<Post> FilterBy( Expression<Func<Post, bool>> filter )
        {
            try
            {
                return _upriseContext.Set<Post>().Where( filter );
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }

        public IEnumerable<Post> GetAll()
        {
            try
            {
                return _upriseContext.Post;
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }

        public int Create( Post post )
        {
            try
            {
                _upriseContext.Post.Add( post );
                _upriseContext.SaveChanges();
                return post.Id;
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }

        public void Update( Post post )
        {
            try
            {
                _upriseContext.Entry( post ).State = EntityState.Modified;
                _upriseContext.SaveChanges();
            }
            catch ( Exception ex )
            {
                var message = "";
                ErrorHelper.GetExceptionMessages( ex, message );
                throw new Exception( message );
            }
        }

        public void Delete( Post post )
        {
            try
            {
                _upriseContext.Post.Remove( post );
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
