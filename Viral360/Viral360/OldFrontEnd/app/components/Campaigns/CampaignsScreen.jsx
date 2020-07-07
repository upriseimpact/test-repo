/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';

import CornflowerCampaignPreview from '../PostPreview/CornflowerCampaignPreview.jsx';
import CornflowerMainTitleBar from '../SubComponents/CornflowerMainTitleBar.jsx';

import { campaigns } from '../api-helper/mockData.jsx';

import './CampaignsScreen.scss';

class CampaignsScreen extends PureComponent {
    constructor(props) {
        super(props);
        const { Response } = campaigns;
        this.state = {
            campaigns: Response.map(this._mapResponseToState).reduce((acc, curr, i) => {
                if (i % 3) {
                    acc[acc.length - 1].push(curr);
                } else {
                    acc.push([ curr ]);
                }
                return acc;
            }, [])
        };
    }

    // Depreciated
    /*
    _mapResponseToState(responseCampaign) {
        // eslint-disable-next-line no-warning-comments, capitalized-comments
        // TODO: finish this function as the backend does not
        //  match up to what we need in the front-end
        return {
            facebookPage: 'Default page',
            twitterPage: 'Default page',
            linkedInPage: 'Default page',
            addDescriptions: { facebookDescription: 'fb description',
                twitterDescription: 'twitter description',
                linkedInDescription: 'linkedin description' },
            addMedia: { imageUpload: null,
                externalLink: 'https://vimeo.com/293030588' },
            launchDateInput: '2019-03-12',
            addIndustryTags: { tags: 'amazing, campaign' },
            addLocation: { location: 'california' },
            ageRange: { startingAge: '10', endingAge: '30' },
            gender: { gender: 'Female' },
            goalTargetAdvocates: { goalTargetAdvocatesNumber: '73' },
            targetDate: '2019-02-18'
        };
    }
    */

    render() {
        return (
            <div className="campaigns-screen">
                <div className="_title">
                    <CornflowerMainTitleBar
                        title="All Campaigns"
                        searchPlaceholder="Search Campaigns"
                    />
                </div>
                <div className="grid">
                    {this.state.campaigns.map((row, i1) =>
                        <div key={i1} className="row">
                            {row.map((campaign, i2) =>
                                <div key={i2} className="campaign-container">
                                    <CornflowerCampaignPreview
                                        previewState={campaign}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default CampaignsScreen;
