using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Uprise.Api.Domain;
using Uprise.Api.Infrastructure.Repositories;
using Uprise.Api.ViewModels;

namespace Uprise.Api.Infrastructure.Adapters
{
    public class PostAdapter : IAdapter<PostViewModel, Distributor>
    {
        private readonly PostRepository _postRepository;


        public PostAdapter( PostRepository postRepository )
        {
            _postRepository = postRepository;
        }


        public PostViewModel GetById( int id, Distributor distributor )
        {
            Post post = _postRepository.GetById( id );

            if ( post == null )
            {
                throw new Exception( "No posts associated to this user." );
            }

            if ( post.DistributorId != distributor.Id )
            {
                throw new Exception( string.Format( "The post with Id: {0} does not belong to this user.", id ) );
            }

            try
            {
                var postToReturn = new PostViewModel();
                postToReturn.DistributorId = distributor.Id;
                MapModelToViewModel( post, ref postToReturn );
                return postToReturn;
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        public IList<PostViewModel> List( Distributor distributor )
        {
            var posts = _postRepository.FilterBy( c => c.DistributorId == distributor.Id );

            if ( posts == null )
            {
                throw new Exception( "No posts associated to this user." );
            }

            try
            {
                var postsList = new List<PostViewModel>();
                foreach ( var post in posts )
                {
                    var postViewModel = new PostViewModel();
                    MapModelToViewModel( post, ref postViewModel );
                    postsList.Add( postViewModel );
                }

                return postsList;
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        public int Create( PostViewModel postViewModel, Distributor distributor )
        {
            try
            {
                var postToCreate = new Post();
                MapViewModelToModel( postViewModel, ref postToCreate );

                return _postRepository.Create( postToCreate );
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        public void Update( PostViewModel postViewModel, Distributor distributor )
        {

            try
            {
                var postToUpdate = _postRepository.GetById( postViewModel.Id );

                if ( postToUpdate.DistributorId != distributor.Id )
                {
                    throw new Exception( string.Format( "The post with Id: {0} doen not belong to this user.", postViewModel.Id ) );
                }

                MapViewModelToModel( postViewModel, ref postToUpdate );

                _postRepository.Update( postToUpdate );
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }

        private void MapViewModelToModel( PostViewModel postViewModel, ref Post post )
        {
            post.PostTitle = postViewModel.PostTitle;
            post.PostMessage = postViewModel.PostMessage;
            post.MediaType = postViewModel.MediaType;
            post.OriginalMediaLink = postViewModel.OriginalMediaLink;
            post.ThumbnailLink = postViewModel.ThumbnailLink;
        }

        private void MapModelToViewModel( Post post, ref PostViewModel postViewModel )
        {
            postViewModel.Id = post.Id;
            postViewModel.DistributorId = post.DistributorId;
            postViewModel.PostTitle = post.PostTitle;
            postViewModel.PostMessage = post.PostMessage;
            postViewModel.MediaType = post.MediaType;
            postViewModel.OriginalMediaLink = post.OriginalMediaLink;
            postViewModel.ThumbnailLink = post.ThumbnailLink;
        }

        public void Delete( int id, Distributor distributor )
        {

            try
            {
                var postToDelete = _postRepository.GetById( id );

                if ( postToDelete.DistributorId != distributor.Id )
                {
                    throw new Exception( string.Format( "The post with Id: {0} does not belong to this user.", distributor.Id ) );
                }

                _postRepository.Delete( postToDelete );
            }
            catch ( Exception exception )
            {
                throw new Exception( exception.Message );
            }
        }
    }
}
