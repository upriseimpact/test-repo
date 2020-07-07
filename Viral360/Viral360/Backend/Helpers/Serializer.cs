using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Uprise.Models;

namespace Uprise.Helpers
{
    public static class Serializer
    {
        public static DistributorHomeViewModel DeserializeDistributor(Distributor distributor)
        {
            if (distributor.Id == default(int))
            {
                return null;
            }

            var distributorViewModel = new DistributorHomeViewModel();

            if (distributor.Campaigns != null)
            {
                distributorViewModel.CampaignsList = new List<ReturnedCampaign>();

                foreach (var campaign in distributor.Campaigns)
                {
                    distributorViewModel.CampaignsList.Add(
                        DeserializeCampaign(campaign)
                        );
                }
            }

            if (distributor.Posts != null)
            {
                distributorViewModel.PostsList = new List<ReturnedPost>();
                foreach (var post in distributor.Posts)
                {
                    distributorViewModel.PostsList.Add(
                        DeserializePost(post)
                        );
                }
            }

            if (distributor.Contacts != null)
            {
                distributorViewModel.ContactsList = new List<ReturnedContact>();
                foreach (var contact in distributor.Contacts)
                {
                    distributorViewModel.ContactsList.Add(
                        DeserializeContact(contact)
                        );
                }
            }

            return distributorViewModel;
        }

        public static ReturnedCampaign DeserializeCampaign(Campaign campaign)
        {
            return new ReturnedCampaign()
            {
                Id = campaign.Id,
                CampaignTitle = campaign.CampaignTitle,
                CampaignType = campaign.CampaignType,
                City = campaign.City,
                DistributorId = campaign.DistributorId,
                Gender = campaign.Gender,
                IndustryId = campaign.IndustryId,
                Message = campaign.Message,
                PostId = campaign.PostId,
                SocialMediaId = campaign.SocialMediaId,
                Post = DeserializePost(campaign.Post)
            };
        }

        public static ReturnedPost DeserializePost(Post post)
        {
            return new ReturnedPost()
            {
                Id = post.Id,
                DistributorId = post.DistributorId,
                MediaType = post.MediaType,
                OriginalMediaLink = post.OriginalMediaLink,
                PostMessage = post.PostMessage,
                PostTitle = post.PostTitle,
                ThumbnailLink = post.ThumbnailLink
            };
        }

        public static ReturnedContact DeserializeContact(Contact contact)
        {
            return new ReturnedContact()
            {
                Id = contact.Id,
                Age = contact.Age,
                City = contact.City,
                Country = contact.Country,
                DistributorId = contact.DistributorId,
                Email = contact.Email,
                FirstName = contact.FirstName,
                Gender = contact.Gender,
                LastName = contact.LastName,
                Province = contact.Province,
                Platform = contact.Platform
            };
        }
    }
}