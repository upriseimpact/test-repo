/* eslint-disable linebreak-style */
import axios from 'axios';
import React, { Component } from 'react';
import * as mockData from './mockData.jsx';

const BACKEND_SERVER = 'https://upriseai.azurewebsites.net';
const endpoints = {
    createCampaign: '/Campaigns/Create',
    viewCampaign: '/Campaigns/Details',
    editCampaign: '',
    deleteCampaign: '',
    listCampaigns: '/Campaigns',
    createAdvocate: '/Contacts/Create',
    viewAdvocate: '/Contacts/Details',
    editAdvocate: '/Contacts/Edit',
    deleteAdvocate: '/Contacts/Delete',
    importAdvocates: '/Contacts/PushContacts',
    listAdvocates: '/Contacts',
    viewDistributor: '/Distributors/details',
    sharers: '/Sharers',
    logout: '/Account/Signout'
};

/*
    ** User info **
*/

export const getSelf = () => {
    // use localStorage token to get own info from microsoft? or azure?
    return new Promise((resolve, reject) => {
        resolve(mockData.distributors.Response[1]);
    })
}

/*
    ** campaigns **
*/

function convertBackendCampaignToFrontEndCampaign(backObj) {
    return {
        'Id': (backObj.Id ? backObj.Id : 0),
        'CampaignTitle': (backObj.CampaignTitle ? backObj.CampaignTitle : ''),
        'CampaignType': (backObj.Id ? backObj.Id : 0), // enum defined where?
        'CampaignLocation': {
            'City': (backObj.City ? backObj.City : ''),
            'Region': (backObj.Region ? backObj.Region : ''), 
            'Country': (backObj.Country ? backObj.Country : '')
        },            
        'DistributorId': (backObj.DistributorId ? backObj.DistributorId : 0), // self?
        'Gender': (backObj.Gender ? backObj.Gender : 3), // enum defined where?
        'AgeRange': {
            'LowerBound': 0,
            'UpperBound': 0
        },
        'IndustryId': (backObj.IndustryId ? backObj.IndustryId : 1), // enum defined where?
        'IndustryTags': [],
        'DistributorMessage': (backObj.Message ? backObj.Message : ''),
        // 'SocialMediaId': 1, // move SocialMediaId into corresponding post to avoid mismatch
        'LaunchDate': (backObj.Launchdate ? backObj.LaunchDate : '2019-04-26T00:00:00'),
        'TargetDate': (backObj.Targetdate ? backObj.TargetDate : '2019-04-26T00:00:00'),
        'Incentive': { // this value needs to be specified or expanded
            'RawText': 'Graditude',
            'rewardValue': 0, // only monetary?
            'rewardType': null, // define? money? compensation
            'conditionValue': 0,
            'conditionType': null // define? views? shares?
        },
        'CurrentReach': 0, // current reach achieved (or estimated)
        'CurrentAdvocates': 0, // live value of advocates
        'TargetAdvocates': 0, // advocates by TargetDate
        'Posts': [{ // ONLY 1 CAMPAIGN ATM
            'Id': backObj.Post.Id,
            'SocialMediaId': backObj.SocialMediaId,
            'DistributorId': backObj.DistributorId, // redundant? unless its on behalf of another?
            'Author': 'Uprise User', // placeholder for actual posts? can be static with same account?
            'PostMessage': backObj.Post.PostMessage,
            'PostTitle': backObj.Post.PostMessage, // do posts have titles?
            'MediaType': backObj.Post.MediaType, // enum defined where? file? external link? video/image
            'MediaUpload': null,
            'Link': '',
            'LinkTitle': '',
            'LinkDescription': '',
            'MediaLink': backObj.Post.OriginalMediaLink,
            'Interactable': false,
            'Disabled': false,
            'Group': null,
            'Selected': false,
            'Value': null
        }],
        'Disabled': false,
        'Group': null,
        'Selected': false,
    };
}


export const createCampaign = (unifiedCampaignObject) => {
    return new Promise((resolve, reject)=>{
        const token = localStorage.getItem('token');
        //const headers = { Authorization: "Bearer " + token };
        const url = BACKEND_SERVER + endpoints.createCampaign;
        const config = { headers: { Authorization: "Bearer " + token, 'Content-Type': 'multipart/form-data' } };
        var formData = new FormData();
        formData.append("image", unifiedCampaignObject.Posts[0].MediaUpload);
        formData.append('file', unifiedCampaignObject.Posts[0].MediaUpload);
        formData.append("Id", 73,);
        formData.append("LaunchDate", unifiedCampaignObject.LaunchDate);
        formData.append("DistributorId", unifiedCampaignObject.DistributorId);
        formData.append("CampaignTitle", unifiedCampaignObject.CampaignTitle);
        formData.append("SocialMediaId", unifiedCampaignObject.Posts[0].SocialMediaId);
        formData.append("IndustryId", unifiedCampaignObject.IndustryId);
        formData.append("City", unifiedCampaignObject.CampaignLocation.City);
        formData.append("Gender", unifiedCampaignObject.Gender);
        formData.append("Message", unifiedCampaignObject.DistributorMessage);
        formData.append("PostId", unifiedCampaignObject.Posts[0].Id);
        formData.append("CampaignType", unifiedCampaignObject.CampaignType);
        //var Post = new FormData();
        formData.append("PostTitle", unifiedCampaignObject.Posts[0].PostTitle);
        formData.append("PostMessage", unifiedCampaignObject.Posts[0].PostMessage);
        formData.append("MediaType", unifiedCampaignObject.Posts[0].MediaType);
        formData.append("OriginalMediaLink", unifiedCampaignObject.Posts[0].Link);
        //formData.append("Post", Post);
        for (var i = 0; i < unifiedCampaignObject.Advocates.Ids.length; i++) {
            formData.append("advocatesIds[]", unifiedCampaignObject.Advocates.Ids[i]);
        }

        console.log('Axios call to: ' + url);
        console.log(config);
        console.log(unifiedCampaignObject);
        //for(var pair of formData.entries()) {
        //    console.log(pair[0]+ ', '+ pair[1]); 
        //}
        axios.post(url, formData, config)
        .then((response) => {
            //console.log("CREATE GET");
            //console.log(response);
            resolve(response.data.Response);
        })
        .catch((error)=>{
            reject(error);
        });
    });
    // simulating a succesful campaign creation.
    // return (mockData.createCampaignResult);
};


export const viewCampaign = (campaignId) => {
    return new Promise((resolve, reject) => {
        /*
        if (campaignId < mockData.campaigns.Response.length) {
            resolve(mockData.campaigns.Response[campaignId]);
        } else {
            reject("campaignId out of range");
        }
        */
        const token = localStorage.getItem('token');
        const url = BACKEND_SERVER + endpoints.viewCampaign;
        const config = {
            headers: {Authorization: "Bearer " + token },
            params:  {Id: campaignId },
        };
        //console.log('Axios call to: ' + url);
        //console.log(config);
        axios.get(url, config)
            .then((response) => {
                //console.log(response.data.Response);
                resolve(convertBackendCampaignToFrontEndCampaign(response.data.Response));
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const viewSharers = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        let url = BACKEND_SERVER + endpoints.sharers;
        const config = {
            headers: {Authorization: "Bearer " + token },
        };
        axios.get(url, config)
            .then((response) => {
                resolve(response);
            })
            .catch((error)=>{
                reject(error);
            });
    });
};

// should there be a listOwnedCampaigns? which corrects based on auth token?
export const listCampaigns = (userId) => {
    return new Promise((resolve, reject) => {
        // resolve(mockData.campaigns)
        const token = localStorage.getItem('token');
        const config = {
            headers: {Authorization: "Bearer " + token },
            params:  {userId: 3 },   // TODO: Replace with userId being passed
        };

        let url = BACKEND_SERVER + endpoints.listCampaigns;
        //console.log('Axios call to: ' + url);
        //console.log(config);
        axios.get(url, config)
            .then((response) => {
                //console.log("LIST GET");
                //console.log(response);
                // convert backend object to unifiedCampaignObject
                resolve(response.data.Response.map((respObj) => {
                    return convertBackendCampaignToFrontEndCampaign(respObj);
                }));
            })
            .catch((error) => {
                reject(error);
            });
    });
};


/*
    ** distributors **
*/

export const viewDistributor = (distributorId) => {
    return new Promise((resolve, reject) => {
        /*
        if (distributorId < mockData.distributors.Response.length) {
            resolve(mockData.distributors.Response[distributorId]);
        } else {
            reject("distributorId out of range");
        }
        */
        const url = BACKEND_SERVER + endpoints.viewDistributor;
        const token = localStorage.getItem('token');
        const config = {
            headers: {Authorization: "Bearer " + token },
            params:  {Id: distributorId },
        };
        //console.log('Axios call to: ' + url);
        //console.log(config);
        axios.get(url, config)
            .then((response) => {
                console.log(response.data.Response);
                resolve(response.data.Response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

/*
    ** advocates **
*/

export const createAdvocate = (distributorId, platform, email, firstName, lastName, age, country, province, city, gender) => {
    return new Promise((resolve, reject) => {
        let url = BACKEND_SERVER + endpoints.createAdvocate;
        const token = localStorage.getItem('token');
        const config = { headers: {Authorization: "Bearer " + token } };
        const data = {
            DistributorId: distributorId,
            Platform: 1,
            Email: email,
            FirstName: firstName,
            LastName: lastName,
            Age: age,
            Country: country,
            Province: province,
            City: city,
            Gender: gender
        };
        //console.log('Axios call to: ' + url);
        //console.log(data);
        axios.post(url, data, config)
            .then((response) => {
                //console.log("Advocate Create");
                //console.log(response);
                resolve(response.data.Response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const viewAdvocate = (advocateId) => {
    return new Promise((resolve, reject) => {
        let url = BACKEND_SERVER + endpoints.viewAdvocate;
        const token = localStorage.getItem('token');
        const config = {
            headers: {Authorization: "Bearer " + token },
            params:  {userId: 2 },
        };
        axios.get(url, config)
            .then((response) => {
                resolve(response.data.Response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// required to be integer
// should apiHelper validate or should caller validate?
export const deleteAdvocate = (advocateId) => {
    return new Promise((resolve, reject) => {
        let url = BACKEND_SERVER + endpoints.deleteAdvocate;
        const token = localStorage.getItem('token');
        const config = { headers: {Authorization: "Bearer " + token } };
        const data = {
            Id: advocateId
        };
        console.log('Axios call to: ' + url);
        console.log(config);
        console.log(data); //formData.entries()
        axios.post(url, data, config)
            .then((response) => {
                resolve(response.data.Response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const editAdvocate = (id, distributorId, platform, email, firstName, lastName, age, country, province, city, gender) => {
    return new Promise((resolve, reject) => {
        let url = BACKEND_SERVER + endpoints.editAdvocate;
        const token = localStorage.getItem('token');
        const config = { headers: {Authorization: "Bearer " + token } };
        const data = {
            'Id': id,
            'DistributorId': distributorId,
            'Platform': platform,
            'Email': email,
            'FirstName': firstName,
            'LastName': lastName,
            'Age': age,
            'Country': country,
            'Province': province,
            'City': city,
            'Gender': gender
        };
        axios.post(url, data, config)
            .then((response) => {
                resolve(response.data.Response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};


export const listAdvocates = (distributorId) => {
    return new Promise((resolve, reject) => {
        let url = BACKEND_SERVER + endpoints.listAdvocates;
        const token = localStorage.getItem('token');
        const config = {
            headers: {Authorization: "Bearer " + token },
            params: { userId: distributorId },
        };
        axios.get(url, config)
            .then((response) => {
                resolve(response.data.Response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const advocateBatchImport = (userId, file) => {
    return new Promise((resolve, reject) => {
        let url = BACKEND_SERVER + endpoints.importAdvocates;
        const token = localStorage.getItem('token');
        const config = { headers: {Authorization: "Bearer " + token, 'Content-Type': 'multipart/form-data' } };
        var formData = new FormData();
        formData.append('advocates file', file);
        formData.append('userId', userId);
        //console.log('Axios call to: ' + url);
        //console.log(config);
        //console.log(formData.entries())
        axios.post(url, formData, config)
            .then((response) => {
                //console.log("Import Post");
                //console.log(response);
                resolve(response.data.Response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const logout = () => {
    return new Promise((resolve, reject) => {
        let url = BACKEND_SERVER + endpoints.logout;
        const token = localStorage.getItem('token');
        const config = { headers: {Authorization: "Bearer " + token } };
        //const data = {};

        axios.post(url, config)
            .then((response) => {
                resolve(response.data.Response);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

// this function does not need to call the backend, it supplies dynamic
// info on social platforms for [ S C A L A B I L I T Y]
/*
 socialmediaId <
 null = 0
 Facebook = 1,
 GooglePlus = 2,
 Instagram = 3,
 LinkedIn = 4,
 Snapchat = 5,
 Tumblr = 6,
 Twitter = 7,
 */

export const socialMediaEnum = {
    'none': 0,
    'facebook': 1,
    'googleplus': 2,
    'instagram': 3,
    'linkedin': 4,
    'snapchat': 5,
    'tumblr': 6,
    'twitter': 7
}

import FaFacebook from 'react-icons/lib/fa/facebook';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaLinkedin from 'react-icons/lib/fa/linkedin';

export const socialMediaInfo = (socialMediaID) => {
    switch(socialMediaID) {
        case 1:
            return {
                'name': 'facebook',
                'link': 'www.facebook.com',
                'color': '#3b5998',
                'iconComponent': <FaFacebook key={'facebookIcon'}/>,
            };
        case 2:
            return {
                'name': 'googleplus',
                'link': 'https://plus.google.com/discover',
                'color': '#4285F4',
                'iconComponent': null,
            };
        case 3:
            return {
                'name': 'instagram',
                'link': 'www.instagram.com',
                'color': '#f56040',
                'iconComponent': null,
            };
        case 4:
            return {
                'name': 'linkedin',
                'link': 'www.linkedin.com',
                'color': '#0E76A8',
                'iconComponent': <FaLinkedin key={'linkedinIcon'}/>,
            };
        case 5:
            return {
                'name': 'snapchat',
                'link': 'www.snapchat.com',
                'color': '#FFFC00',
                'iconComponent': null,
            };
        case 6:
            return {
                'name': 'tumblr',
                'link': 'www.tumblr.com',
                'color': '#34526f',
                'iconComponent': null,
            };
        case 7:
            return {
                'name': 'twitter',
                'link': 'www.twitter.com',
                'color': '#0084b4',
                'iconComponent': <FaTwitter key={'twitterIcon'}/>,
            };
        default:
            return {
                'name': '',
                'link': '',
                'color': '#000000',
                'iconComponent': null,
            };
    }
}
