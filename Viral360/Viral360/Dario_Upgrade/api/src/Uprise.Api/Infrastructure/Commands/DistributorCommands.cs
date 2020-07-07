namespace Uprise.Api.Infrastructure.Commands
{
    public abstract class AbstractDstributorDataCmd
    {
        public int StatusId { get; set; }
        public int UserId { get; set; }
    }


    public class CreateDistributorCmd : AbstractDstributorDataCmd
    {
    }


    public class EditDistributorCmd : AbstractDstributorDataCmd
    {
        public int Id { get; set; }
    }
}
