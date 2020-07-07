using Uprise.Api.Domain.Identity;

namespace Uprise.Api.Infrastructure.UserManagement
{
    public interface ICurrentUserAccessor
    {
        ApplicationUser GetCurrentUser();
    }
}
