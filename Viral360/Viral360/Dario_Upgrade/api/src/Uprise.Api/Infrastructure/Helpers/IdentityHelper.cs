using System;
using Uprise.Api.Domain;
using Uprise.Api.Infrastructure.Services;

namespace Uprise.Api.Infrastructure.Helpers
{
    public class IdentityHelper
    {
        private UpriseContext _upriseContext;
        private readonly UsersService _usersService;


        public IdentityHelper( UpriseContext upriseContext, UsersService usersService )
        {
            _upriseContext = upriseContext;
            _usersService = usersService;
        }


        public bool TryGetDistributor( out Distributor distributor, out string errorMessage )
        {
            errorMessage = "Not authorized";
            distributor = null;

            try
            {

                var currentUser = _usersService.GetCurrentUser();

                distributor = _upriseContext.Distributor.Find( currentUser.Id );

                if ( distributor == null )
                {
                    errorMessage = "The user does not have a Distributor role.";
                    return false;
                }

                return true;
            }
            catch ( Exception ex )
            {
                throw new Exception( ex.Message );
            }
        }
    }
}
