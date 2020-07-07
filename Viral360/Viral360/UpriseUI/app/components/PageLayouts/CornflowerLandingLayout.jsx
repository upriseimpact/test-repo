/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';

import upriseLogo from '../../assets/uprise-logo-left.png';

import * as apiHelper from '../api-helper/index.jsx';

import CornflowerCampaignPreview from '../PostPreview/CornflowerCampaignPreview.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// temporary default logo
import defaultLogo from '../../assets/Uprise_Icon_Colourful.png';

import './CornflowerLandingLayout.scss';

const statusEnum = {
    'pending': 0,
    'success': 1,
    'failed': 2
}

export default class CornflowerLandingLayout extends PureComponent {

    constructor(props) {
        super(props);

        // this component must be passed id to use in apiHelper (parsed from url)
        this.state = {
            campaignId: props.id,
            status: statusEnum.pending,
            campaign: null,
            distributor: null
        };
        
    }

    componentDidMount() {
        let parseId = parseInt(this.state.campaignId, 10);

        if (isNaN(parseId)) {
            this.setState({ status: statusEnum.failed });
            return;
        }

        // set state.campaign, use distributorId to fetch -> state.distributor
        apiHelper.viewCampaign(parseId)
            .then((campaignResponse) => {
                this.setState({ campaign: campaignResponse });

                apiHelper.viewDistributor(this.state.campaign.DistributorId)
                    .then((distributorResponse) => {
                        // null check disitributor info and set to defaults
                        if (!distributorResponse.FullName) {
                            distributorResponse.FullName = 'Uprise User';
                        }
                        if (!distributorResponse.LogoUrl) {
                            distributorResponse.LogoUrl = defaultLogo;
                        }
                        this.setState({ distributor: distributorResponse });

                        this.setState({ status: statusEnum.success });

                    })
                    .catch(() => {
                        this.setState({ status: statusEnum.failed });
                    });
            })
            .catch(() => {
                this.setState({ status: statusEnum.failed });
            });
    }

    // account creation needs to provide social info beore it can be used
    // so don't call this function YET
    /*
    createSocialButtons = () => { 
        const buttons = [];
        for (var k in this.state.distributor.SocialMediaList) {
            if (this.state.distributor.SocialMediaList.hasOwnProperty(k)) {
                let icon = null;
                if (k.toUpperCase() === 'facebook'.toUpperCase()) {
                    icon = <FaFacebook/>;
                } else if (k.toUpperCase() === 'twitter'.toUpperCase()) {
                    icon = <FaTwitter/>;
                } else if (k.toUpperCase() === 'linkedin'.toUpperCase()) {
                    icon = <FaLinkedin/>;
                } else {
                    icon = k[0].toLocaleUpperCase();
                }
                buttons.push(<a key={k} href={this.state.distributor.SocialMediaList[k]} title={k}><div className="_social-icon">{icon}</div></a>);
            }
        }
        return buttons;
    }
    */
   
    render() {
        const { history } = this.props;

        var previewState = null;
        if (this.state.status == statusEnum.success) {
            // previewState needs all campaign info and post specific info
            previewState = {
                'distributor': this.state.distributor,
                'campaign': this.state.campaign
            };
        }

        return <div className="cornflower-landing-layout">
            <div className="_header">
                <ul className="_button-list">
                    <li>
                        <a href="\home">
                            <button className="_transparent-button"
                                type="button">
                                Explore
                            </button>
                        </a>
                    </li>
                    <li>
                        <a href="/home">
                            <button className="_transparent-button"
                                type="button">
                                Start a Campaign
                            </button>
                        </a>
                    </li>
                </ul>

                <a href="\home">
                    <img src={upriseLogo} className="_logo" alt="Uprise Logo" />
                </a>

                <ul className="_button-list">
                    <li>
                        <a href="/home">
                            <button className="_transparent-button"
                                type="button">
                                What we do?
                            </button>
                        </a>
                    </li>
                    <li>
                        <div className="_vert-divider"></div>
                    </li>
                    <li>
                        <a href="/home">
                            <button className="_transparent-button"
                                type="button">
                                Log In
                            </button>
                        </a>
                    </li>
                    <li>
                        <a href="/home">
                            <button className="_transparent-button"
                                type="button">
                                Sign Up
                            </button>
                        </a>
                    </li>
                </ul>
            </div>

            {(this.state.status == statusEnum.success) ?
                <div className="_main">
                    <div className="_detail">
                        <div className="_title">
                            Help <b>{this.state.distributor.FullName}</b> spread this message!
                            <br/>
                            You could win <b>{this.state.campaign.Incentive.RawText}!</b>
                        </div>
                        <div className="_content">
                            <div className="_preview-wrapper">
                                <CornflowerCampaignPreview previewState={previewState} publicView={true} />
                            </div>
                            
                            <div className="_campaign-info">
                                <h2>{this.state.campaign.CampaignTitle}</h2>
                                <hr/>
                                <div className="_subtitle">
                                    Campaign owner
                                </div>
                                <div className="_horizontal-subsection">
                                    {/* when user data is reachable
                                    <img className="_campaign-logo" src={this.state.distributor.LogoURL} alt="distributor Logo" />
                                    */}
                                    <img className="_campaign-logo" src={this.state.distributor.LogoUrl}/>
                                    <ul className="_owner-table-left">
                                        <li><b>{this.state.distributor.FullName}</b></li>
                                        <li>{this.state.campaign.CampaignLocation.City ? this.state.campaign.CampaignLocation.City + ',' : null}
                                            {this.state.campaign.CampaignLocation.Region ? this.state.campaign.CampaignLocation.Region + ',' : null}
                                            {this.state.campaign.CampaignLocation.Country}</li>
                                    </ul>
                                    <ul className="_owner-table-right">
                                        <li>{this.state.distributor.CampaignsList.length} campaign{this.state.distributor.CampaignsList.length == 1 ? '' : 's'} ran</li>
                                        <li>{ /*this.createSocialButtons()*/ null /* omitted until info is obtainable */ }</li>
                                    </ul>
                                </div>
                                <div className="_subtitle">
                                    Campaign Information
                                </div>
                                <div className="_subsection">
                                    {this.state.campaign.DistributorMessage}
                                </div>
                                <div className="_subtitle">
                                    Incentive
                                </div>
                                <div className="_subsection">
                                    Earn <b>{this.state.campaign.Incentive.RawText}</b> on your post from {new Date(Date.parse(this.state.campaign.LaunchDate)).toDateString()} at {new Date(Date.parse(this.state.campaign.LaunchDate)).toLocaleTimeString()} to {new Date(Date.parse(this.state.campaign.TargetDate)).toDateString()} at {new Date(Date.parse(this.state.campaign.TargetDate)).toLocaleTimeString()}
                                    <br/><br/>
                                    Log in with your various social media accounts to see how much you can make!
                                </div>
                                <div className="_subtitle">
                                    Progress
                                </div>
                                <div className="_subsection">
                                    {this.state.campaign.TargetAdvocates == 0 ?
                                        '0% of ' +this.state.campaign.TargetAdvocates + ' advocates goal'
                                        :
                                        (this.state.campaign.CurrentAdvocates / this.state.campaign.TargetAdvocates * 100).toFixed() + '% of ' + this.state.campaign.TargetAdvocates + ' advocates goal'}
                                    <div className="_progress-outer">
                                        <div className="_progress-inner" style={{ width: (this.state.campaign.CurrentAdvocates / this.state.campaign.TargetAdvocates * 100).toString() + '%' }}/>
                                    </div>
                                    <div className="_reach-header">
                                        <div>
                                            <b>{this.state.campaign.CurrentReach.toLocaleString()} Reach</b> donated by {this.state.campaign.CurrentAdvocates} advocates
                                        </div>
                                        <div className="_days-left-float-right">
                                            <b>{((new Date(this.state.campaign.TargetDate).getTime() - new Date().getTime()) / (1000*60*60*24)).toFixed()}</b> days left
                                        </div>
                                    </div>
                                </div>

                                {/* unless this can use differernt info from campaign information, its redundant
                                <div className="_subtitle">
                                    Message
                                </div>
                                <div className="_subsection">
                                    <div>{this.state.campaign.DistributorMessage}</div>
                                </div>
                                */}
                                
                                
                                {/* disclaimer added to footer, this may now be depreciated
                                <div className="_subtitle">
                                    Disclaimer
                                </div>
                                <div className="_subsection">
                                    We will post this one-time message to your account on <b>{new Date(this.state.campaign.goalDate).toString()}.</b> 
                                    <br/><a href="/home">View Privacy Policy</a>
                                </div>
                                */}
                            </div>
                        </div>

                        {/* grab socialmediaId from each this.state.campaign.Posts, use apiHelper.socialMediaInfo(socialMediaId) */}
                        <div className="_support-buttons">
                            {this.state.campaign.Posts.map((post) =>
                                <a key={apiHelper.socialMediaInfo(post.SocialMediaId).link} style={{
                                    width: ((100/Object.values(this.state.campaign.Posts).length).toString() + '%'), 
                                }} href="#">
                                    <button key={"socialButton" + post.SocialMediaId} className="social-button" style={{
                                        backgroundColor: apiHelper.socialMediaInfo(post.SocialMediaId).color
                                    }}>
                                        {apiHelper.socialMediaInfo(post.SocialMediaId).iconComponent}
                                        <span key={apiHelper.socialMediaInfo(post.SocialMediaId).name}>Support on {apiHelper.socialMediaInfo(post.SocialMediaId).name}</span>
                                    </button>
                                </a>
                            )}
                        </div>

                        <div className="_footer">
                            Uprise Media is not liable for incentive payments. 
                            Contact the campaign distributor for inquiries.
                        </div>
                    </div>
                </div>
                : null}
            {(this.state.status == statusEnum.pending) ?
                <div className="_main">
                    <h3>Finding Your Campaign...</h3>
                </div>
                : null}
            {(this.state.status == statusEnum.failed) ?
                <div className="_main">
                    <h3>Sorry, we couldn't find that campaign. Try again on monday.</h3>
                </div>
                : null}
        </div>;
    }
}
