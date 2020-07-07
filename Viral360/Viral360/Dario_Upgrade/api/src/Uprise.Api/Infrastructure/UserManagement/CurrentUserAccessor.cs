using System.Linq;
using System.Security.Claims;

using Microsoft.AspNetCore.Http;
using Uprise.Api.Domain.Identity;

namespace Uprise.Api.Infrastructure.UserManagement
{
    public class CurrentUserAccessor : ICurrentUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserAccessor( IHttpContextAccessor httpContextAccessor )
        {
            _httpContextAccessor = httpContextAccessor;
        }


        public ApplicationUser GetCurrentUser()
        {
            // TODO - replace when connected to identity provider
            return Constants.TestUser;
        }
    }
}
