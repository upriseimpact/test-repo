using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;
using Uprise.Models;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;
using System.Data.SqlClient;
using System.Data.Common;
using System.Web.Http.Results;
using System.IO;
using System.Reflection;

namespace Uprise.Services
{
    public static class SendGridService
    {
        private const string UpriseSupportEmail = "brayden@uprise.ai";
        private const string UpriseSupportUser = "Uprise Support";
        private const string FirstName = "user_firstname";
        private const string LastName = "user_lastname";
        private const string DistributorName = "distributor_name";
        private const string CampaignName = "campaign_name";
        private const string LaunchDate = "campaign_launch_date";

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fromEmail"></param>
        /// <param name="fromUser"></param>
        /// <param name="subject"></param>
        /// <param name="toEmail"></param>
        /// <param name="toUser"></param>
        /// <param name="body"></param>
        /// <param name="postLink"></param>
        /// <returns></returns>
        public static async Task Send(string fromEmail, string fromUser, string subject, string toEmail, string toUser, string body, string postLink)
        {
            var client = GetClient();
            var from = new EmailAddress(fromEmail, fromUser);
            //var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress(toEmail, toUser);
            var plainTextContent = body;
            var htmlContent = "<strong>" + body + " <br> <a href = '" + postLink + "'>" + postLink + "</a></strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        public static async Task SendEmailVerification(int userId, string userEmail, string subject, string link)
        {
            var client = GetClient();
            var from = new EmailAddress(UpriseSupportEmail, UpriseSupportUser);
            //var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress(userEmail);
            var plainTextContent = link;
            var htmlContent = link;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        public static async Task<string> SendCampaignEmail(int campaignId, ApplicationDbContext db)
        {
            var client = GetClient();
            var campaign = db.Campaigns.Find(campaignId);
            if (campaign == null)
            {
                throw new Exception(string.Format("Send Campaign Email, Campaign with ID {0} was not found.", campaignId));
            }
            var query = "SELECT Contacts.* FROM Contacts INNER JOIN CampaignContacts ON Contacts.Id = CampaignContacts.ContactId" +
                " AND CoampaignContacts.CampaignId = " + campaign.Id.ToString();

            var campaignContacts = db.CampaignContacts.Where(cc => cc.CampaignId == campaignId).Join(db.Contacts, cc => cc.ContactId, c => c.Id, (cc, c) => new
            {
                Id = c.Id,
                Email = c.Email,
                FirstName = c.FirstName,
                LastName = c.LastName
            });

            var user = campaign.Distributor.UserId;
            var from = new EmailAddress(UpriseSupportEmail, UpriseSupportUser);
            var subject = campaign.CampaignTitle;

            var campaignEmailTemplate = "";
            try
            {
                campaignEmailTemplate = Uprise.Properties.Resources.CampaignEmailTemplate.ToString();
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception: " + e.Message);
                throw new Exception(e.Message);
            }
            var plainTextContent = campaign.Message;
            var htmlContent = campaign.Post.PostMessage;

            foreach (var advocate in campaignContacts)
            {
                if (campaignEmailTemplate.Length > 0)
                {
                    if (campaignEmailTemplate.Contains(FirstName))
                    {
                        campaignEmailTemplate = campaignEmailTemplate.Replace(FirstName, advocate.FirstName);
                    }
                    if (campaignEmailTemplate.Contains(LastName))
                    {
                        campaignEmailTemplate = campaignEmailTemplate.Replace(LastName, advocate.LastName);
                    }
                    if (campaignEmailTemplate.Contains(CampaignName))
                    {
                        campaignEmailTemplate = campaignEmailTemplate.Replace(CampaignName, subject);
                    }
                    if (campaignEmailTemplate.Contains(DistributorName))
                    {
                        campaignEmailTemplate = campaignEmailTemplate.Replace(DistributorName, user.UserName);
                    }
                    if (campaignEmailTemplate.Contains(LaunchDate))
                    {
                        campaignEmailTemplate = campaignEmailTemplate.Replace(LaunchDate, campaign.LaunchDate.ToLongDateString());
                    }

                    htmlContent = campaignEmailTemplate;
                }
                var to = new EmailAddress(advocate.Email);
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                var response = await client.SendEmailAsync(msg);
                var campaignEmailResponse = new CampaignEmailResponse()
                {
                    CampaignId = campaign.Id,
                    ContactId = advocate.Id,
                    Response = response.ToString()
                };
                db.CampaignEmailResponses.Add(campaignEmailResponse);
            }
            db.SaveChanges();

            return "done";
        }

        private static SendGridClient GetClient()
        {
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY_VIRAL360");
            return new SendGridClient(apiKey);
        }
    }
}