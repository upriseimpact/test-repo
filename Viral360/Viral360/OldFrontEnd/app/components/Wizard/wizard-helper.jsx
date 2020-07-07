
import { socialMediaEnum } from '../api-helper/index.jsx';

// fetches link, assigns title, description, and link
// converts link to file if file is currently null
export const resolveFormLink = (formValue) => {
    return new Promise((resolve, reject) => {
        try {
            if (!(formValue.addMedia) || formValue.addMedia.externalLink == '') resolve(formValue);
            fetch('http://api.linkpreview.net/?key=5c93da82d92693d9728c728f49af2642c560be7cc3f79&q=' + formValue.addMedia.externalLink)
                .then((response) => {
                    return response.json();
                })
                .then((jsonResponse) => {
                    formValue.addMedia.linkTitle = jsonResponse.title;
                    formValue.addMedia.linkSubtitle = jsonResponse.description;
                    // fetch and assign limga
                    formValue.addMedia.imageLink = jsonResponse.image;
                    // will be converted to file by resolveFormMedia
                    resolve(formValue);
                })
        } catch (err) {
            resolve(formValue);
        }
    });
}


//expects currentState to be well defined
export const mergeFormStateIntoCurrentState = (formState, currentState) => {
    if (!formState) return currentState;
    
    // update from LinkPagesStep (add null entry to Posts)
    // map all the postChecks: if post with socialMediaId already exists do nothing
    // otherwise create array of empty posts (with SocialMediaId)
    // append together states?
    if (formState.SelectPosts !== undefined) {
        const oldPosts = Array.from(currentState.campaign.Posts);
        currentState.campaign.Posts = [];
        Object.values(formState.SelectPosts).forEach((v) => {
            if (Object.values(socialMediaEnum).includes(v)) {
                // if post selected AND already exists then just grab it
                let vObject = oldPosts.find((p) => { return p.socialMediaId == v; });
                if (vObject) {
                    currentState.campaign.Posts.push(Object.create(vObject));
                // if post selected AND doesn't exist create it
                } else {
                    currentState.campaign.Posts.push({
                        'Id': 0, // does this matter? will i be assigned later?
                        'SocialMediaId': v,
                        'DistributorId': currentState.campaign.DistributorId, // redundant? unless its on behalf of another?
                        'Author': currentState.distributor.FullName, // placeholder for actual posts? can be static with same account?
                        'PostMessage': '',
                        'PostTitle': 'Post' + v, // do posts have titles?
                        'MediaType': 1, // enum defined where? file? external link? video/image
                        'MediaUpload': null,
                        'Link': '',
                        'LinkTitle': '',
                        'MediaLink': '',
                        'LinkDescription': '',
                        'Interactable': false,
                        'Disabled': false,
                        'Group': null,
                        'Selected': false,
                        'Value': null
                    });
                }
            }
        });
    }

    // update from detilsStep:
    // CampaignTitle, DistributorMessage, LaunchDate, TargetDate
    // distributor.campaignLogoUrl, addMedia.imageUpload, addMedia.externalLink
    // linkpreview.net for link details, fetch blob for image url
    if (formState.CampaignTitle || formState.DistributorMessage || formState.IncentiveText || formState.addMedia || formState.LaunchDate || formState.TargetDate) { // use as flag for details step
        currentState.campaign.CampaignTitle = formState.CampaignTitle;
        currentState.campaign.DistributorMessage = formState.DistributorMessage;
        currentState.campaign.LaunchDate = (formState.LaunchDate ? formState.LaunchDate + "T00:00:00" : '');
        currentState.campaign.TargetDate = (formState.TargetDate ? formState.TargetDate + "T00:00:00" : '');
        currentState.campaign.Incentive.RawText = formState.IncentiveText;
        // map message to relevant post
        currentState.campaign.Posts = currentState.campaign.Posts.map((p) => {
            if (formState["postDescription_" + p.SocialMediaId.toString()] == undefined) {
                p.PostMessage = ' '; // backend expects something, test if it can be empty!
            } else {
                p.PostMessage = formState["postDescription_" + p.SocialMediaId.toString()].text;
            }
            //if (p.PostMessage == '') p.PostMessage ='~'; //required for backend atm
            return p;
        });

        // this is disabled in form so don't use yet or it will always set null
        //currentState.distributor.LogoUrl = formState.distributor ? formState.distributor.companyLogoUrl : null;
        
        currentState.campaign.Posts = currentState.campaign.Posts.map((p) => {
            // acounts for addMedia throwing validation error
            p.Link = formState.addMedia ? formState.addMedia.externalLink : '';
            p.LinkTitle = formState.linkTitle;
            p.LinkDescription = formState.linkSubtitle;
            return p;
        });

        // override with uploaded image if present
        if (formState.addMedia) {
            currentState.campaign.Posts = currentState.campaign.Posts.map((p) => {
                p.MediaUpload = formState.addMedia.imageUpload;
                p.MediaLink = formState.addMedia.imageLink;
                return p;
            });
        }
    }
    // update from targettingStep
    if (formState.targetAdvocates !== undefined) {
        currentState.campaign.TargetAdvocates = formState.targetAdvocates.advocatesNumber;
        currentState.campaign.IndustryTags = formState.industryTags.tags.split(',');
        currentState.campaign.CampaignLocation.City = formState.addLocation.location.split(',')[0].trim();
        currentState.campaign.CampaignLocation.Region = (formState.addLocation.location.split(',').length > 1 ? formState.addLocation.location.split(',')[1].trim() : '');
        currentState.campaign.CampaignLocation.Country = (formState.addLocation.location.split(',').length > 2 ? formState.addLocation.location.split(',')[2].trim() : '');
        currentState.campaign.Gender = formState.genderSelect.gender;
        if (formState.AgeRange) {
            currentState.campaign.AgeRange.LowerBound = formState.AgeRange.LowerBound;
            currentState.campaign.AgeRange.UpperBound = formState.AgeRange.UpperBound;
        }
    }

    // update from advocates step
    if (formState.advocates) {
        currentState.campaign.Advocates.Ids = formState.advocates.Ids;
    }

    return currentState;
};
