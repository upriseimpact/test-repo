using Uprise.Api.Domain.Identity;

namespace Uprise.Api.Infrastructure.Services
{
    public class UsersService
    {
        // TODO - implement after identity provider setup
        public ApplicationUser GetCurrentUser()
        {
            return Constants.TestUser;
        }


        public ApplicationUser GetUserById( int id )
        {
            return Constants.TestUser;
        }
    }
}
