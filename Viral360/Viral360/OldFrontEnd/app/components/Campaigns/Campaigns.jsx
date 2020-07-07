/* eslint-disable linebreak-style */
import React, {PureComponent} from 'react';

import CampaignPreview from './CampaignPreview2.jsx';
import TitleBar from '../TitleBar/TitleBar';

import * as apiHelper from '../api-helper/index.jsx';

import './Campaigns.scss';
import _ from 'lodash';

class Campaigns extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            campaigns: null,
            filteredCampaigns: null,
            distributor: null
        };
    }

    /* deprecitated
    componentWillMount() {
        const campaignList = this.state.campaigns;
        _.forEach(campaignList, (campaign) => {
            _.set(campaign, 'selected', '');
        });
        this.setState({
            campaigns: campaignList,
            filteredCampaigns: campaignList
        }, () => {
            localStorage.setItem('campaigns', JSON.stringify(this.state.campaigns));
        });
    }
    */

    componentDidMount() {
        // get my info?
        // fetch campaigns for me
        apiHelper.listCampaigns(0)
            .then((cList) => {
                // build filteredCampaigns and reset lcoalStorage
                const campaignList = cList;
                //sort by LaunchDate (can sort const arrays, hmmmm...)
                campaignList.sort((a,b) => (a.LaunchDate > b.LaunchDate) ? -1 : 1);
                
                _.forEach(campaignList, (campaign) => {
                    _.set(campaign, 'selected', '');
                });
                this.setState({
                    campaigns: campaignList,
                    filteredCampaigns: campaignList
                }, () => {
                    localStorage.setItem('campaigns', JSON.stringify(this.state.campaigns));
                });

                // is there only 1 distributor? if i know my info (above) do i have to fetch this?
                apiHelper.viewDistributor(2)
                    .then((distResp) => {
                        this.setState({ distributor: distResp });
                    });
            });
    }

    // uses unified campaign object (outlined in mockData)
    // apiHelper will map backend response to the unifed object
    // DEPRECIATED
    /*
    _mapResponseToState(responseCampaign) {
        // eslint-disable-next-line no-warning-comments, capitalized-comments
        // TODO: finish this function as the backend does not
        //  match up to what we need in the front-end
        return {
            campaignTitle: responseCampaign.CampaignTitle,
            facebookPage: 'Default page',
            twitterPage: 'Default page',
            linkedInPage: 'Default page',
            addDescriptions: {
                facebookDescription: 'fb description',
                twitterDescription: 'twitter description',
                linkedInDescription: 'linkedin description'
            },
            addMedia: {
                imageUpload: null,
                externalLink: 'https://vimeo.com/293030588'
            },
            launchDateInput: responseCampaign.launchDate,
            addIndustryTags: {tags: 'amazing, campaign'},
            addLocation: responseCampaign.City,
            ageRange: {startingAge: '10', endingAge: '30'},
            gender: responseCampaign.Gender,
            goalTargetAdvocates: {goalTargetAdvocatesNumber: '73'},
            targetDate: responseCampaign.GoalDate
        };
    }
    */

    // deleteSelection = () => {
    //     const filteredCampaigns = this.state.filteredCampaigns.map(filteredCampaign => ({...filteredCampaign}));
    //     const campaignList = this.state.campaigns.map(campaign => ({...campaign}));
    //
    //     const isSelected = _.filter(filteredCampaigns, (filteredCampaignList) => {
    //         return (filteredCampaignList.selected === true);
    //     });
    //
    //     if (isSelected.length) {
    //         if (window.confirm('Are you sure you wish to delete this item?')) {
    //             _.remove(filteredCampaigns, {selected: true});
    //             _.remove(campaignList, {selected: true});
    //
    //             this.setState({
    //                 filteredCampaigns,
    //                 campaigns: campaignList
    //             }, () => {
    //                 localStorage.setItem('campaigns', JSON.stringify(this.state.campaign));
    //             });
    //         }
    //     }
    //     else {
    //         alert('Please select campaign(s) for this operation.');
    //     }
    // };

    filterCampaigns = (value) => {
        console.log("filtering campaigns");
        const campaignList = this.state.campaigns;
        const filteredCampaigns = _.filter(campaignList, (campaign) => {
            return (_.includes(campaign.CampaignTitle.toLowerCase(), value));
        });
        this.setState({
            filteredCampaigns: value ? filteredCampaigns : campaignList
        });
    };

    render() {
        return (
            <div className="campaigns-screen">
                <div className="_title">
                    <TitleBar
                        title="All Campaigns"
                        searchPlaceholder="Search Campaigns"
                        filter={this.filterCampaigns}
                        entity="campaigns"
                        //actionItem="Delete Selection" // Disabled until usage specified
                        importBtn={null}
                    />
                </div>
                <div className="grid">
                    {this.state.filteredCampaigns != null && 
                    this.state.filteredCampaigns.map((campaign, i1) =>
                        <div key={i1} className="campaign-container">
                            <CampaignPreview
                                campaign={campaign}
                                distributor={this.state.distributor} // gives only 1 (self) (may need to be dynamic)
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Campaigns;
