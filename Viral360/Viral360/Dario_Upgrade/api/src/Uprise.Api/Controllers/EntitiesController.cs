using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Uprise.Api.Domain;
using Uprise.Api.Domain.Identity;
using Uprise.Api.Infrastructure.UserManagement;

namespace Uprise.Api.Controllers
{
    [Route( "[controller]" )]
    [ApiController]
    public class EntitiesController : ControllerBase
    {
        private readonly UpriseContext _upriseContext;
        private readonly ICurrentUserAccessor _currentUserAccessor;


        public EntitiesController( ICurrentUserAccessor currentUserAccessor, UpriseContext upriseContext )
        {
            _currentUserAccessor = currentUserAccessor;
            _upriseContext = upriseContext;
        }


        [HttpGet("Industries")]
        public IEnumerable<Industry> Industries()
        {
            return _upriseContext.Industries.AsEnumerable();
        }


        [HttpGet( "Tags" )]
        public IEnumerable<Tag> Tags()
        {
            return _upriseContext.Tag.AsEnumerable();
        }


        [HttpGet( "SocialMedias" )]
        public IEnumerable<SocialMedia> SocialMedials()
        {
            return _upriseContext.SocialMedias.AsEnumerable();
        }


        [HttpGet( "DistributorStatuses" )]
        public IEnumerable<DistributorStatus> DistributorStatuses()
        {
            return _upriseContext.DistributorStatus.AsEnumerable();
        }


        [HttpGet( "CurrentUser" )]
        public ApplicationUser CurrentUser()
        {
            return _currentUserAccessor.GetCurrentUser();
        }
    }
}
