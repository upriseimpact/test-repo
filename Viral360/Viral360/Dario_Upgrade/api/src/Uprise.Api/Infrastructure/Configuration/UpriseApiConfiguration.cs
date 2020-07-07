namespace Uprise.Api.Infrastructure.Configuration
{
    public class UpriseApiConfiguration
    {
        public AzureConfiguration Azure { get; set; }
        public SendgridConfiguration Sendgrid { get; set; }
    }
}
