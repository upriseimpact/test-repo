import React, { PureComponent } from 'react';

import * as apiHelper from '../api-helper/index.jsx';

require('./DefaultPreview.scss');

export default class DefaultPreview extends PureComponent {
    componentWillReceiveProps(props) {
        this.forceUpdate();
    }

    render() {
        const { previewState } = this.props;
        // checks for well formed first level (an otherwise malformed object will have undefined behaviour)
        const previewStateExists = (previewState !== null);
        
        return <div className="default-preview">
            <div className="_header">
                <div className="_header-details">
                    <div className="_logo" data-preview={previewStateExists && previewState.distributor && previewState.distributor.LogoUrl != null}>
                        <img src={(previewStateExists && previewState.distributor) ? previewState.distributor.LogoUrl : ''} alt=""/>
                    </div>
                    <span className="_text">
                        <span className="_company-name" data-preview={previewStateExists && previewState.hasOwnProperty('campaign')}>
                            {previewStateExists && previewState.hasOwnProperty('campaign') ? previewState.campaign.CampaignTitle : ''}
                        </span>
                        <span className="_post-author" data-preview={previewStateExists && previewState.hasOwnProperty('distributor')}>
                            {previewStateExists && previewState.hasOwnProperty('distributor') ? 'Created by ' + previewState.distributor.FullName : ''}
                        </span>
                    </span>
                </div>
                <div className="_launch-date">
                    <span className="_description" data-preview={previewState.campaign.LaunchDate != ''}>
                        {(previewStateExists && previewState.campaign.LaunchDate != '') ? 'Launch date' : null}
                    </span>
                    <span className="_date" data-preview={previewState.campaign.LaunchDate != ''}>
                        {(previewStateExists && previewState.campaign.LaunchDate != '') ? new Date(Date.parse(previewState.campaign.LaunchDate)).toDateString() : ''}
                    </span>
                </div>
            </div>

            <div className="_post-title">
                {/* Placed in header, this may be depreciated
                previewStateExists && (previewState.campaign && previewState.campaign.CampaignTitle != '' || previewState.campaign.Posts.length > 0 && previewState.camapgin.Posts[0].PostMessage != '') ? 
                    <div>{previewState.campaign.CampaignTitle}</div>
                    :
                    <div className="_post-text-placeholder">
                        <div className="_text-line" />
                    </div>
                */}
                {previewStateExists && previewState.campaign.DistributorMessage ?
                    <div>{previewState.campaign.DistributorMessage}</div>
                    :
                    null}
            </div>
            <div className="_post-text">
                {'This campaign is running on: '}
                {previewStateExists && (previewState.campaign.Posts.length > 0) ? 
                    Object.values(previewState.campaign.Posts).map((post) => {
                        return <b key={"socalTag" + post.SocialMediaId}>{"(" + apiHelper.socialMediaInfo(post.SocialMediaId).name + ") "}</b>
                    })
                    :
                    'No social media platforms'
                }
            </div>
            <div className="_post-text">
                {'The target number of advocate shares for this campaign are: '}
                <b>{previewStateExists ? previewState.campaign.TargetAdvocates : 0}</b>
            </div>
            <div className="_post-text">
                {'The incentive for this campaign is: '}
                {previewStateExists && <b>{previewState.campaign.Incentive.RawText}</b>}
            </div>
            <div className="_post-text">
                {'Click the tabs above to view a preview of this campaign\'s posts for each platform'}
            </div>
            {/* which image to show? */}
            {/* previewState.Posts && (previewState.Posts.MediaUpload || previewState.addMedia.Link) ?
                <a href={null}>
                    <div className="_image" data-preview={previewState.addMedia.imageUpload || previewState.addMedia.imageLink}>
                        {previewState.addMedia.imageUpload ?
                            <img src={previewState.addMedia.imageUpload} />
                            :
                            <img src={previewState.addMedia.imageLink} /> }

                        {previewState.addMedia.externalLink ?
                            <div className="_link-body">
                                <h4>{previewState.addMedia.linkTitle}</h4>
                                <h5>{previewState.addMedia.linkSubtitle}</h5>
                                <p>{previewState.addMedia.externalLink}</p>
                            </div>
                            :
                            null}
                    </div>
                </a>
            :
            null */}

            {previewState.campaign.TargetDate &&
                <div className="_goal">
                    <div className="_goal-bar">
                        Goal: {new Date(Date.parse(previewState.campaign.TargetDate)).toDateString()} @ {new Date(Date.parse(previewState.campaign.TargetDate)).toLocaleTimeString()}
                    </div>
                    {/*<div className="_edit-icon">
                        <FaEdit />
                    </div>
                    */}
                </div>
            }
        </div>
    }
}
