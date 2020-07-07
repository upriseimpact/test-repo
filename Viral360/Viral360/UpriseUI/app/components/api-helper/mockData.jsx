/* eslint-disable linebreak-style */
// import upriseColourfullLogo from '../../assets/Uprise_Icon_Colourful.png';
// import { bigFile } from './bigfile.jsx';

const bigFile = null;

// need design for campaign object, distributor(account) object (needs info for advocates? advocate XOR distributor?)
/*
 socialmediaId > api-helper/index.jsx socialMediaEnum
 */

export const campaigns = {
    'success': true,
    'Response': [
        {
            'Id': 1,
            'CampaignTitle': 'Uprise App Soft Launch Testing 1',
            'CampaignType': 1, // enum defined where?
            'CampaignLocation': {
                'City': 'new yaaaaaaaaaaaaaaaaaawk',
                'Region': 'NY',
                'Country': 'United Blates'
            },            
            'DistributorId': 2,
            'Gender': 1, // enum defined where?
            'AgeRange': {
                'LowerBound': 0,
                'UpperBound': 0
            },
            'IndustryId': 1, // enum defined where?
            'DistributorMessage': 'We need your help to make uprise go viral. Join our campaign. Join our life. Join our clan. Join our momentum. Join our traction. Join our peer-centered, project focussed, client-driven, industry-driving leveraging initiative.',
            // 'SocialMediaId': 1, // move SocialMediaId into corresponding post to avoid mismatch
            'LaunchDate': '2019-04-02T17:00:00',
            'TargetDate': '2019-04-28T12:00:00',
            'Incentive': { // this value needs to be specified or expanded
                'RawText': '$2 for every 100 views',
                'rewardValue': 2, // only monetary?
                'rewardType': null, // define? money? compensation
                'conditionValue': 100,
                'conditionType': null // define? views? shares?
            },
            'CurrentReach': 300000, // current reach achieved (or estimated)
            'CurrentAdvocates': 1100, //new
            'TargetAdvocates': 1200, // advocates by TargetDate
            'Posts': [
                {
                    'Id': 2, // this is/was PostId
                    'SocialMediaId': 1,
                    'DistributorId': 2, // redundant? unless its on behalf of another?
                    'Author': 'Stephen Coupeck', // placeholder for actual posts? can be static with same account?
                    'PostMessage': 'Its the premiere launch of the Uprise Media campaigns app.\nHelp us help you spread your message, cause, or call to action ON FACEBOOK!\nGoddamn do we love Mondays.',
                    'PostTitle': 'Go viral with Uprise', // do posts have titles?
                    'MediaType': 1, // enum defined where? file? external link? video/image
                    'MediaUpload': bigFile,
                    'Link': 'https://oldschool.runescape.com', // link preview generated on the fly?
                    'LinkTitle': 'Big money', // these are generated by the wizard, maybe should be updated manually/auto?
                    'LinkDescription': 'Big problems',
                    'Interactable': false,
                    'Disabled': false,
                    'Group': null,
                    'Selected': false,
                    'Value': null
                },
                {
                    'Id': 3,
                    'SocialMediaId': 7,
                    'DistributorId': 2, // redundant? unless its on behalf of another?
                    'Author': 'Stephen Buick', // placeholder for actual posts? can be static with same account?
                    'PostMessage': 'Its the premiere launch of the Uprise Media campaigns app.\nHelp us help you spread your message, cause, or call to action ON TWITTER!\nGoddamn do we love Mondays.',
                    'PostTitle': 'Go viral with Uprise', // do posts have titles?
                    'MediaType': 1, // enum defined where? file? external link? video/image
                    'MediaUpload': bigFile,
                    'Link': 'https://robertsspaceindustries.com/', // link preview generated on the fly?
                    'LinkTitle': 'If you die in the game', // these are generated by the wizard, maybe should be updated manually/auto?
                    'LinkDescription': 'You die in real life',
                    'Interactable': false,
                    'Disabled': false,
                    'Group': null,
                    'Selected': false,
                    'Value': null
                },
            ],
            'Disabled': false,
            'Group': null,
            'Selected': false,
        },
        {
            'Id': 2,
            'CampaignTitle': 'Uprise App Soft Launch Testing dos',
            'CampaignType': 1, // enum defined where?
            'CampaignLocation': {
                'City': 'tilted towers',
                'Region': 'GG', 
                'Country': 'Egypt'
            },            
            'DistributorId': 2,
            'Gender': 2, // enum defined where?
            'AgeRange': {
                'LowerBound': 5,
                'UpperBound': 10
            },
            'IndustryId': 2, // enum defined where?
            'DistributorMessage': 'This is my swamp',
            // 'SocialMediaId': 1, // move SocialMediaId into corresponding post to avoid mismatch
            'LaunchDate': '2019-02-28T17:00:00',
            'TargetDate': '2019-03-01T12:00:00',
            'Incentive': { // this value needs to be specified or expanded
                'RawText': '$1 for every 10 shares',
                'rewardValue': 1, // only monetary?
                'rewardType': null, // define? money? compensation
                'conditionValue': 10,
                'conditionType': null // define? views? shares?
            },
            'CurrentReach': 250000, // current reach achieved (or estimated)
            'CurrentAdvocates': 800, //new
            'TargetAdvocates': 1800, // advocates by TargetDate
            'Posts': [
                {
                    'Id': 4, // this is/was PostId
                    'SocialMediaId': 1,
                    'DistributorId': 2, // redundant? unless its on behalf of another?
                    'Author': 'Stephen Shoeck', // placeholder for actual posts? can be static with same account?
                    'PostMessage': 'Hey Facebook friends, where we droppin\'?',
                    'PostTitle': 'GG', // do posts have titles?
                    'MediaType': 1, // enum defined where? file? external link? video/image
                    'MediaUpload': bigFile,
                    'Link': 'https://www.salviaerik.com', // link preview generated on the fly?
                    'LinkTitle': '', // these are generated by the wizard, maybe should be updated manually/auto?
                    'LinkDescription': '',
                    'Interactable': false,
                    'Disabled': false,
                    'Group': null,
                    'Selected': false,
                    'Value': null
                },
                {
                    'Id': 5,
                    'SocialMediaId': 7,
                    'DistributorId': 2, // redundant? unless its on behalf of another?
                    'Author': 'Stephen Jewek', // placeholder for actual posts? can be static with same account?
                    'PostMessage': 'Hey Twitter friends, where we droppin\'?',
                    'PostTitle': 'gg', // do posts have titles?
                    'MediaType': 1, // enum defined where? file? external link? video/image
                    'MediaUpload': bigFile,
                    'Link': 'http://comeonandsl.am/', // link preview generated on the fly?
                    'LinkTitle': '', // these are generated by the wizard, maybe should be updated manually/auto?
                    'LinkDescription': '',
                    'Interactable': false,
                    'Disabled': false,
                    'Group': null,
                    'Selected': false,
                    'Value': null
                },
            ],
            'Disabled': false,
            'Group': null,
            'Selected': false,
        },
        {
            'Id': 2,
            'CampaignTitle': 'Uprise App Soft Launch Testing 3',
            'CampaignType': 1, // enum defined where?
            'CampaignLocation': {
                'City': 'hyrule castle',
                'Region': 'f', 
                'Country': 'mega'
            },            
            'DistributorId': 2,
            'Gender': 1, // enum defined where?
            'AgeRange': {
                'LowerBound': 5,
                'UpperBound': 10
            },
            'IndustryId': 2, // enum defined where?
            'DistributorMessage': 'This is my swamp',
            // 'SocialMediaId': 1, // move SocialMediaId into corresponding post to avoid mismatch
            'LaunchDate': '2019-04-27T17:00:00',
            'TargetDate': '2019-04-30T12:00:00',
            'Incentive': { // this value needs to be specified or expanded
                'RawText': '$10 for every 10 likes',
                'rewardValue': 1, // only monetary?
                'rewardType': null, // define? money? compensation
                'conditionValue': 10,
                'conditionType': null // define? views? shares?
            },
            'CurrentReach': 50000, // current reach achieved (or estimated)
            'CurrentAdvocates': 100, //new
            'TargetAdvocates': 1800, // advocates by TargetDate
            'Posts': [
                {
                    'Id': 6, // this is/was PostId
                    'SocialMediaId': 1,
                    'DistributorId': 2, // redundant? unless its on behalf of another?
                    'Author': 'Stephen sueck', // placeholder for actual posts? can be static with same account?
                    'PostMessage': 'Hey Facebook friends, :thinking:\'?',
                    'PostTitle': 'hmmmmmm', // do posts have titles?
                    'MediaType': 1, // enum defined where? file? external link? video/image
                    'MediaUpload': bigFile,
                    'Link': 'https://www.reddit.com', // link preview generated on the fly?
                    'LinkTitle': '', // these are generated by the wizard, maybe should be updated manually/auto?
                    'LinkDescription': '',
                    'Interactable': false,
                    'Disabled': false,
                    'Group': null,
                    'Selected': false,
                    'Value': null
                },
            ],
            'Disabled': true,
            'Group': null,
            'Selected': false,
        }
    ]
};

export const distributors = {
    'success': true,
    'Response': [
        {
            'FullName': 'U[B]rise [B]edia',
            'Id': 1,
            'LogoURL': 'https://emblemsbf.com/img/91632.jpg',
            'SocialMediaList': {
                'facebook': 'https://www.facebook.com',
                'twitter': 'https://www.twitter.com',
                'linkedin': 'https://www.linkedin.com',
                'uprise': 'http://uprise.ai'
            },
            'CampaignsList': [ { 'Id': 1 } ]
        },
        {
            'FullName': 'Uprise User',
            'Id': 0,
            'LogoURL': 'https://cdn.discordapp.com/attachments/268209621724823554/567385789302964249/1526679807_garfield.jpg',
            'SocialMediaList': {
                'facebook': 'https://www.facebook.com',
                'twitter': 'https://www.twitter.com',
                'linkedin': 'https://www.linkedin.com',
                'uprise': 'http://uprise.ai'
            },
            'CampaignsList': [ { 'Id': 2 } ]
        },
        {
            'FullName': 'Gremblo',
            'Id': 2,
            'LogoURL': 'https://vignette.wikia.nocookie.net/gremblo/images/6/6a/1497825390131.jpg/revision/latest/scale-to-width-down/310?cb=20170813181916',
            'SocialMediaList': {
                'facebook': 'https://www.facebook.com',
                'twitter': 'https://www.twitter.com',
                'linkedin': 'https://www.linkedin.com',
                'uprise': 'http://uprise.ai'
            },
            'CampaignsList': [ { 'Id': 4 } ]
        }
    ]
};


export const advocates = [
    {
        id: '843452535',
        firstName: 'Sillje',
        lastName: 'Larsen',
        socialNetworks: ['facebook', 'twitter', 'linkedIn'],
        industry: 'Food Manufacturing',
        city: 'Waterloo',
        country: 'Canada',
        age: '32',
        gender: 'Male',
        reach: '23,300',
        testing: true
    },
    {
        id: '904823989',
        firstName: 'Storm',
        lastName: 'Hansen',
        socialNetworks: ['facebook', 'linkedIn'],
        industry: 'IT/Computer Science',
        city: 'Toronto',
        country: 'Canada',
        age: '24',
        gender: 'Male',
        reach: '1,700',
        testing: 'false'
    },
    {
        id: '768904353',
        firstName: 'Frida',
        lastName: 'Thomsen',
        socialNetworks: ['facebook', 'instagram', 'twitter'],
        industry: 'IT/Computer Science',
        city: 'Waterloo',
        country: 'Canada',
        age: '33',
        gender: 'Female',
        reach: '1,560',
        testing: 'false'
    },
    {
        id: '467893403',
        firstName: 'Aksel',
        lastName: 'Andersen',
        socialNetworks: ['facebook', 'instagram', 'linkedIn'],
        industry: 'IT/Computer Science',
        city: 'Waterloo',
        country: 'Canada',
        age: '28',
        gender: 'Female',
        reach: '2,854',
        testing: 'true'
    },
    {
        id: '523987654',
        firstName: 'Aksel',
        lastName: 'Andersen',
        socialNetworks: ['facebook', 'instagram', 'linkedIn'],
        industry: 'IT/Computer Science',
        city: 'Waterloo',
        country: 'Canada',
        age: '28',
        gender: 'Female',
        reach: '2,854',
        testing: 'true'
    },
    {
        id: '416578903',
        firstName: 'Aksel',
        lastName: 'Andersen',
        socialNetworks: ['facebook', 'instagram', 'linkedIn'],
        industry: 'IT/Computer Science',
        city: 'Waterloo',
        country: 'Canada',
        age: '28',
        gender: 'Female',
        reach: '2,854',
        testing: 'true'
    },
    {
        id: '335593403',
        firstName: 'Aksel',
        lastName: 'Andersen',
        socialNetworks: ['facebook', 'instagram', 'linkedIn'],
        industry: 'IT/Computer Science',
        city: 'Waterloo',
        country: 'Canada',
        age: '28',
        gender: 'Female',
        reach: '2,854',
        testing: 'true'
    },
    {
        id: '297845675',
        firstName: 'Aksel',
        lastName: 'Andersen',
        socialNetworks: ['facebook', 'instagram', 'linkedIn'],
        industry: 'IT/Computer Science',
        city: 'Waterloo',
        country: 'Canada',
        age: '28',
        gender: 'Female',
        reach: '2,854',
        testing: 'true'
    },
    {
        id: '902867463',
        firstName: 'Aksel',
        lastName: 'Andersen',
        socialNetworks: ['facebook', 'instagram', 'linkedIn'],
        industry: 'IT/Computer Science',
        city: 'Waterloo',
        country: 'Canada',
        age: '28',
        gender: 'Female',
        reach: '2,854',
        testing: 'true'
    },
    {
        id: '456478932',
        firstName: 'Aksel',
        lastName: 'Andersen',
        socialNetworks: ['facebook', 'instagram', 'linkedIn'],
        industry: 'IT/Computer Science',
        city: 'Waterloo',
        country: 'Canada',
        age: '28',
        gender: 'Female',
        reach: '2,854',
        testing: 'true'
    },
    {
        id: '367287456',
        firstName: 'Aksel',
        lastName: 'Andersen',
        socialNetworks: ['facebook', 'instagram', 'linkedIn'],
        industry: 'IT/Computer Science',
        city: 'Waterloo',
        country: 'Canada',
        age: '28',
        gender: 'Female',
        reach: '2,854',
        testing: 'true'
    }
];

export const createCampaignResult = {
    // "success": true,
    //     "Response": {
    //         "id": 9,        // this ID will be coming from the backend. Just a placeholder for now.
    //         "campaignTitle": campaignTitle,
    //         "socialMediaID": socialMediaID,
    //         "industryID": industryID,
    //         "city": city,
    //         "gender": gender,
    //         "message": message,
    //         "Post": {
    //             "Id": postID,
    //             "DistributorId": distributorID,
    //             "MediaType": mediaType,
    //             "PostMessage":postMessage,
    //             "PostTitle": postTitle,
    //             "OriginalMediaLink": originalMediaLink,
    //             "ThumbnailLink":null,
    //             "Disabled":false,
    //             "Group":null,
    //             "Selected":false,
    //             "Text":null,
    //             "Value":null
    //         },
    //         "Disabled":false,
    //         "Group":null,
    //         "Selected":false,
    //         "Text":null,
    //         "Value":null
    //     },
    //     "Error":""
};

export const campaignDetails = {
    "success": true,
    "Response": {
        "Id": 5,
        "CampaignTitle": "API TEST CAMPAIGN",
        "CampaignType": 1,
        "City": "Waterloo",
        "DistributorId": 38,
        "Gender": 1,
        "IndustryId": 1,
        "Message": "TEST MESSAGE",
        "PostId": 4,
        "SocialMediaId": 1,
        "Post": {
            "Id": 4,
            "DistributorId": 38,
            "MediaType": 2,
            "PostMessage": "POST MESSAGE TEST",
            "PostTitle": "POST TITLE TEST",
            "OriginalMediaLink": "",
            "ThumbnailLink": "",
            "Disabled": false,
            "Group": null,
            "Selected": false,
            "Text": null,
            "Value": null
        },
        "Disabled": false,
        "Group": null,
        "Selected": false,
        "Text": null,
        "Value": null
    }
}
