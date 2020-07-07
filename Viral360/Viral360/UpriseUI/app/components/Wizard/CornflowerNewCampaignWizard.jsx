/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CornflowerCampaignWizardLayout from './CornflowerCampaignWizardLayout.jsx';
import CornflowerCampaignWizardLinkPagesStep from './CornflowerCampaignWizardLinkPagesStep.jsx';
import CornflowerCampaignWizardDetailsStep from './CornflowerCampaignWizardDetailsStep.jsx';
import CornflowerCampaignWizardTargettingStep from './CornflowerCampaignWizardTargettingStep.jsx';
import CornflowerCampaignWizardReviewStep from './CornflowerCampaignWizardReviewStep.jsx';
import CornflowerCampaignWizardAdvocatesStep from './CornflowerCampaignWizardAdvocatesStep.jsx';

import * as apiHelper from '../api-helper/index.jsx';
import { socialMediaEnum } from '../api-helper/index.jsx';
import { mergeFormStateIntoCurrentState } from './wizard-helper.jsx';
import { resolveFormLink } from './wizard-helper.jsx';

// temporary default logo
import defaultLogo from '../../assets/Uprise_Icon_Colourful.png';
import CornflowerCampaignMain from './CornflowerCampaignMain.jsx';

class CornflowerNewCampaignWizard extends PureComponent {
    constructor(props) {
        super(props);

        // cornflowercampaignpreview parameter is concat of {campaign, distributor}
        // which is just this.state.wizardState
        // this defines 'null' values to avoid needing to check for parameter existance
        // and gives the reader an idea of the object architecture
        this.state = {
            wizardState: { 
                campaign: {
                    'Id': 0,
                    'CampaignTitle': '',
                    'CampaignType': 1, // enum defined where?
                    'CampaignLocation': {
                        'City': '',
                        'Region': '', 
                        'Country': ''
                    },            
                    'DistributorId': 3, // self?
                    'Gender': 1, // enum defined where?
                    'AgeRange': {
                        'LowerBound': 0,
                        'UpperBound': 0
                    },
                    'IndustryId': 1, // enum defined where?
                    'IndustryTags': [],
                    'DistributorMessage': '',
                    // 'SocialMediaId': 1, // move SocialMediaId into corresponding post to avoid mismatch
                    'LaunchDate': '',
                    'TargetDate': '',
                    'Incentive': { // this value needs to be specified or expanded
                        'RawText': 'gratitude',
                        'rewardValue': 0, // only monetary?
                        'rewardType': null, // define? money? compensation
                        'conditionValue': 0,
                        'conditionType': null // define? views? shares?
                    },
                    'CurrentReach': 0, // current reach achieved (or estimated)
                    'CurrentAdvocates': 0, // live value of advocates
                    'TargetAdvocates': 0, // advocates by TargetDate
                    'Posts': [],
                    'Advocates': {
                        'File': null,
                        'Object': [],
                        'Ids': [],
                    },
                    'Disabled': false,
                    'Group': null,
                    'Selected': false,
                },
                // @todo get user info and set distributor info, etc...
                distributor: {
                    'FullName': props.userData ? props.userData.FullName : 'Uprise User',
                    'Id': props.userData ? props.userData.Id : 0,
                    'LogoUrl': props.userData ? props.userData.LogoURL : defaultLogo,
                    'SocialMediaList': props.userData ? props.userData.SocialMediaList : {},
                    'CampaignsList': props.userData ? props.userData.CampaignsList : []
                },
                wizard: {
                    'PreviewState': 0
                }
            }
        };
    }

    _setWizardState(formState) {
        // formState is too different and uncongruent with campaign object
        // translate formState to update wizardState (campaign object/ distributor object)
        // formState is only attributes collected from current page
        this.setState(currentState => {
            return { wizardState: mergeFormStateIntoCurrentState(formState, currentState.wizardState) };
        });
    }

    // could be migrated to wizard-helper.jsx
    // would need access to this.props.history and this.state.wizardState
    submitCampaign(extraValue, publish) {
        this._setWizardState(extraValue);
        
        // if publish == true: do maximum validation, set campaign publish variable true, createCampaign
        // if publish == false, do minimum validation, createCampaign
        //validate
        //console.log("Submitting campaign with: "+ publish.toString());
        //console.log(this.state.wizardState)

        // do minimal validation (required for backend to accept)
        let validText = '';
        if (this.state.wizardState.campaign.Advocates.Ids.length <= 0) {
            validText += "Add at least one advocate. \n";
        }
        if (this.state.wizardState.campaign.Posts.length < 0) {
            validText += "Select at least one platform. \n";
        } else {
            for (var i; i < this.state.wizardState.campaign.Posts.length; i++) {
                if (this.state.wizardState.campaign.Posts[i].PostMessage == '') {
                    validText += "Add a message to your " + apiHelper.socialMediaInfo(this.state.wizardState.campaign.Posts[i].SocialMediaId) + " post. \n";
                }
                if (this.state.wizardState.campaign.Posts[i].MediaLink == '') {
                    validText += "Add media to your " + apiHelper.socialMediaInfo(this.state.wizardState.campaign.Posts[i].SocialMediaId) + " post. \n";
                }
            }
        }
        if (this.state.wizardState.campaign.CampaignTitle == '') {
            validText += "Add a campaign title. \n";
        }

        if (publish) {
            validText += "Select SAVE AND EXIT because campaigns cannot be published atm. \n";
            if (this.state.wizardState.campaign.LaunchDate && this.state.wizardState.campaign.LaunchDate != '') {
                validText += "Add a launch date. \n";
            }
        }

        // throw error alerts and exit if not acceptable
        if (validText != '' && !publish) {
            alert("To add a campaign to your account you must: \n"
                + validText);
            return;
        } else if (validText != '' && publish) {
            alert("To publish this campaign you must: \n"
                + validText + "\nInstead you can cancel and select SAVE AND EXIT to publish at a later time.");
            return;
        }

        // state is acceptable for selected action, last confirm
        if (publish) {
            if (!confirm("Are you sure you are finished? Instead you can Cancel and then Save and Exit with the button in the top right corner of the screen to publish at a later time. \n\n"
            + " Publishing will schedule this campaign for it's launch date on: " + new Date(this.state.wizardState.campaign.LaunchDate).toDateString())) {
                return;
            }
            // TODO SET PUBLISH VARIABLE
            // *************************
        } else {
            if (!confirm("Are you sure you are finished? This will save your current progress and return you to the campaigns dashboard")) {
                return;
            }
        }

        apiHelper.createCampaign(this.state.wizardState.campaign)
            .then((response) => {
                // pull apart response
                //console.log(response);
                if (response.error) {
                    alert("Failed with: " + response.err);
                } else {
                    alert("Creation successful, redirecting to new campaign.");
                    this.props.history.push('/splash/' + response.Id);
                }
            });
    }

    render() {
        const { baseUrl, location, history } = this.props;

        return (
            <CornflowerCampaignWizardLayout
                baseUrl={baseUrl}
                location={location}
                history={history}
                wizardState={this.state.wizardState}
                navItems={[
                    { text: 'Pages', path: '/link-pages', step: 'Step 1: Link Pages' },
                    { text: 'Details', path: '/details', step: 'Step 2: Start with the Details' },
                    { text: 'Targeting', path: '/targeting', step: 'Step 3: Setting the Targets' },
                    { text: 'Review Post', path: '/review', step: 'Step 4: Review Post' },
                    { text: 'Add Advocates', path: '/add-advocates', step: 'Step 5: Advocates' }
                ]}
            >
                <Switch>
                    <Route exact path={`${baseUrl}`} render={() =>
                        <Redirect to={`${baseUrl}/link-pages`} />
                    }/>
                    <Route path={`${baseUrl}/link-pages`} render={() =>
                        <CornflowerCampaignWizardLinkPagesStep
                            defaultValue={this.state.wizardState}
                            then={value => {
                                this._setWizardState(value);
                                this.props.history.push(`${baseUrl}/details`);
                            }}
                            onBack={null}
                            save={(extraValue, publish) => {
                                this.submitCampaign(extraValue, publish);
                            }}
                            onExit={(path) => this.props.history.push(path)}
                        />
                    }/>
                    <Route path={`${baseUrl}/details`} render={() =>
                        <CornflowerCampaignWizardDetailsStep
                            defaultValue={this.state.wizardState}
                            then={value => {
                                this._setWizardState(value);
                                this.props.history.push(`${baseUrl}/targeting`);
                            }}
                            onBack={value => {
                                this._setWizardState(value);
                                this.props.history.push(`${baseUrl}/link-pages`);
                            }}
                            save={(extraValue, publish) => {
                                this.submitCampaign(extraValue, publish);
                            }}
                            onExit={(path) => this.props.history.push(path)}
                        />
                    }/>
                    <Route path={`${baseUrl}/targeting`} render={() =>
                        <CornflowerCampaignWizardTargettingStep
                            defaultValue={this.state.wizardState}
                            then={value => {
                                this._setWizardState(value);
                                this.props.history.push(`${baseUrl}/review`);
                            }}
                            onBack={value => {
                                this._setWizardState(value);
                                this.props.history.push(`${baseUrl}/details`);
                            }}
                            save={(extraValue, publish) => {
                                this.submitCampaign(extraValue, publish);
                            }}
                            onExit={(path) => this.props.history.push(path)}
                        />
                    }/>
                    <Route path={`${baseUrl}/review`} render={() =>
                        <CornflowerCampaignWizardReviewStep
                            defaultValue={this.state.wizardState}
                            then={value => {
                                this._setWizardState(value);
                                this.props.history.push(`${baseUrl}/add-advocates`);
                            }}
                            onBack={value => {
                                this._setWizardState(value);
                                this.props.history.push(`${baseUrl}/targeting`);
                            }}
                            save={(extraValue, publish) => {
                                this.submitCampaign(extraValue, publish);
                            }}
                            onExit={(path) => this.props.history.push(path)}
                        />
                    }/>
                    <Route path={`${baseUrl}/add-advocates`} render={() =>
                        <CornflowerCampaignWizardAdvocatesStep
                            defaultValue={this.state.wizardState}
                            then={null}
                            then={value => {
                                this._setWizardState(value);
                            }}
                            onBack={value => {
                                this._setWizardState(value);
                                this.props.history.push(`${baseUrl}/review`);
                            }}
                            save={(extraValue, publish) => {
                                this.submitCampaign(extraValue, publish);
                            }}
                            onExit={(path) => this.props.history.push(path)}
                        />
                    }/>
                </Switch>
            </CornflowerCampaignWizardLayout>
        );
    }
}

export default CornflowerNewCampaignWizard;
