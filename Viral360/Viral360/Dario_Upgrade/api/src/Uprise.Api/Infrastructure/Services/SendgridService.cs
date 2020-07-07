using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using Uprise.Api.Domain;
using Uprise.Api.Infrastructure.Configuration;

namespace Uprise.Api.Infrastructure.Services
{
    public class SendgridService
    {
        private const string UpriseSupportEmail = "brayden@uprise.ai";
        private const string UpriseSupportUser = "Uprise Support";
        private const string FirstName = "user_firstname";
        private const string LastName = "user_lastname";
        private const string DistributorName = "distributor_name";
        private const string CampaignName = "campaign_name";
        private const string LaunchDate = "campaign_launch_date";

        private readonly string _apiKey;
        private readonly bool _sendEmails;

        private readonly UpriseContext _databaseContext;
        private readonly UsersService _usersService;

        public SendgridService
        (
            UpriseApiConfiguration configuration,
            UpriseContext databaseContext,
            UsersService usersService
        )
        {
            _databaseContext = databaseContext ?? throw new ArgumentNullException( nameof( databaseContext ) );
            _usersService = usersService ?? throw new ArgumentNullException( nameof( usersService ) );
            _apiKey = configuration?.Sendgrid?.ApiKey ?? throw new ArgumentNullException( "apiKey" );
            _sendEmails = configuration?.Sendgrid?.SendEmails ?? false;
        }


        public async Task Send( string fromEmail, string fromUser, string subject, string toEmail, string toUser, string body, string postLink )
        {
            if ( !_sendEmails )
            {
                return;
            }

            var client = GetClient();
            var from = new EmailAddress( fromEmail, fromUser );
            //var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress( toEmail, toUser );
            var plainTextContent = body;
            var htmlContent = "<strong>" + body + " <br> <a href = '" + postLink + "'>" + postLink + "</a></strong>";
            var msg = MailHelper.CreateSingleEmail( from, to, subject, plainTextContent, htmlContent );
            await client.SendEmailAsync( msg );
        }

        public async Task SendEmailVerification( int userId, string userEmail, string subject, string link )
        {
            if ( !_sendEmails )
            {
                return;
            }

            var client = GetClient();
            var from = new EmailAddress( UpriseSupportEmail, UpriseSupportUser );
            //var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress( userEmail );
            var plainTextContent = link;
            var htmlContent = link;
            var msg = MailHelper.CreateSingleEmail( from, to, subject, plainTextContent, htmlContent );
            await client.SendEmailAsync( msg );
        }

        public async Task<string> SendCampaignEmail( int campaignId )
        {
            if ( !_sendEmails )
            {
                return null;

            }
            var client = GetClient();
            var campaign = _databaseContext.Campaigns.Find( campaignId );
            if ( campaign == null )
            {
                throw new Exception( string.Format( "Send Campaign Email, Campaign with ID {0} was not found.", campaignId ) );
            }
            var query = "SELECT Contacts.* FROM Contacts INNER JOIN CampaignContacts ON Contacts.Id = CampaignContacts.ContactId" +
                " AND CoampaignContacts.CampaignId = " + campaign.Id.ToString();

            var campaignContacts = _databaseContext.CampaignContacts.Where( cc => cc.CampaignId == campaignId ).Join( _databaseContext.Contacts, cc => cc.ContactId, c => c.Id, ( cc, c ) => new
            {
                Id = c.Id,
                Email = c.Email,
                FirstName = c.FirstName,
                LastName = c.LastName
            } );

            var user = _usersService.GetUserById( campaign.Distributor.UserId );
            var from = new EmailAddress( UpriseSupportEmail, UpriseSupportUser );
            var subject = campaign.CampaignTitle;

            var campaignEmailTemplate = EmailTemplate;
            

            var plainTextContent = campaign.Message;
            var htmlContent = campaign.Post.PostMessage;

            foreach ( var advocate in campaignContacts )
            {
                if ( campaignEmailTemplate.Length > 0 )
                {
                    if ( campaignEmailTemplate.Contains( FirstName ) )
                    {
                        campaignEmailTemplate = campaignEmailTemplate.Replace( FirstName, advocate.FirstName );
                    }
                    if ( campaignEmailTemplate.Contains( LastName ) )
                    {
                        campaignEmailTemplate = campaignEmailTemplate.Replace( LastName, advocate.LastName );
                    }
                    if ( campaignEmailTemplate.Contains( CampaignName ) )
                    {
                        campaignEmailTemplate = campaignEmailTemplate.Replace( CampaignName, subject );
                    }
                    if ( campaignEmailTemplate.Contains( DistributorName ) )
                    {
                        campaignEmailTemplate = campaignEmailTemplate.Replace( DistributorName, user?.Name );
                    }
                    if ( campaignEmailTemplate.Contains( LaunchDate ) )
                    {
                        campaignEmailTemplate = campaignEmailTemplate.Replace( LaunchDate, campaign.LaunchDate.ToLongDateString() );
                    }

                    htmlContent = campaignEmailTemplate;
                }
                var to = new EmailAddress( advocate.Email );
                var msg = MailHelper.CreateSingleEmail( from, to, subject, plainTextContent, htmlContent );
                var response = await client.SendEmailAsync( msg );
                var campaignEmailResponse = new CampaignEmailResponse()
                {
                    CampaignId = campaign.Id,
                    ContactId = advocate.Id,
                    Response = response.ToString()
                };
                _databaseContext.CampaignEmailResponses.Add( campaignEmailResponse );
            }
            _databaseContext.SaveChanges();

            return "done";
        }

        private SendGridClient GetClient()
        {
            return new SendGridClient( _apiKey );
        }

        private static readonly string EmailTemplate =
@"
<!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional//EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">
<html xmlns=""http://www.w3.org/1999/xhtml"">
<head>
    <meta http-equiv=""Content-Type"" content=""text/html; charset=UTF-8"" />
    <title>Uprise</title>
    <meta name = ""viewport"" content=""width=device-width, initial-scale=1.0"" />
</head>
<body style = ""font-family:Arial, Helvetica, sans-serif; font-weight: 500; margin: 20px;"">
    <p>
        Hi user_firstname user_lastname,
    </p>
    <p>
        My name is Wes and I work for Uprise.We're reaching out on behalf of distributor_name, for their upcoming campaign launch: campaign_name. We're banding together a select group to help spread their message.
    </p>
    <p>
        In return for your help, you'll receive $incentive_text just for doing your part!
    </p>
    <p>
        So what do we need you to do? It's simple! On campaign_launch_date you'll receive a reminder message to help us make their content go viral by sharing their post to your personal feed.Yes, really, its that easy!
    </p>
    <p>
        We're only allowing a limited amount of people to join this campaign, so its first come first serve.
    </p>
    <p>
        If you have any questions, don't hesitate to reply to this email
    </p>
    <a href = ""#"" style=""text-decoration: none;"">
        <div style = ""background-color:#3550be; color:white; border-radius: 10px; padding: 20px; text-align: center; cursor: pointer"">
            <b>Click here to view the details of the campaign & opt in</b>
        </div>
    </a>
    <hr />

    <p style = ""color:#999b9e; font-size: 12px"">
        Campaign hosted by<a href=""https://www.uprise.ai/"">Uprise.ai</a>, a smart software influencer marketing platform for optimizing viral success.
        <br />
        <br />
        This e-mail is intended only for the person or entity to which it is addressed and is considered confidential, subject to copyright and may be legally privileged.
        Any unauthorized use, review, copying, distribution, or disclosure is prohibited.
        If you received this in error, please contact the sender and delete all copies of the e-mail together with any attachments.

        <a href = ""https://uprise2018.azurewebsites.net/unsubscribe"" style= ""text-decoration: none; color:#999b9e; font-size: 12px;"">
            <div>
                Click here to <b style = ""color: black;"">unsubscribe</b> yourself from our email list
            </div>
        </a>
    </p>

</body>
</html>
";
    }

}
