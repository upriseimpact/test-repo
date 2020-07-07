/* eslint-disable linebreak-style */
import React, {PureComponent} from 'react';

import FaEdit from 'react-icons/lib/fa/edit';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaLinkedin from 'react-icons/lib/fa/linkedin';
import './Campaigns.scss';

class CampaignPreview extends PureComponent {

    render() {
        const { previewState } = this.props;
        const previewStateExists = (Object.keys(previewState).length > 0);
        const someLinkPagesSelected = (previewState.facebookPage || previewState.twitterPage || previewState.linkedInPage);
        return <div className="campaign-preview">
            <div className="_post-body">
                <div className="_header">
                    <div className="_header-details">
                        <div className="_logo" data-preview={previewStateExists && previewState.companyLogoUrl != null}>
                            <img
                                src={previewStateExists && previewState.companyLogoUrl ? previewState.companyLogoUrl : ''}
                                alt=""/>
                        </div>
                        <span className="_text">
                            <span className="_company-name" data-preview={previewStateExists && previewState.hasOwnProperty('campaignTitle')}>
                                {previewStateExists && previewState.hasOwnProperty('campaignTitle') ? previewState.campaignTitle : ''}
                            </span>
                            <span className="_post-author" data-preview={previewStateExists && previewState.hasOwnProperty('postAuthor')}>
                                {previewStateExists && previewState.hasOwnProperty('postAuthor') ? `Created by ${previewState.postAuthor}` : ''}
                            </span>
                        </span>
                    </div>
                    <div className="_launch-date">
                        <span className="_description" data-preview={!!previewState.launchDateInput}>
                            {previewStateExists && previewState.launchDateInput ? 'Launch date' : ''}
                        </span>
                        <span className="_date" data-preview={!!previewState.launchDateInput}>
                            {previewStateExists && previewState.launchDateInput ? `${previewState.launchDateInput}` : ''}
                        </span>
                    </div>
                </div>

                <div className="_post-text">
                    {previewStateExists && previewState.content ? previewState.content :
                        <div className="_post-text-placeholder">
                            <div className="_text-line"/>
                            <div className="_text-line"/>
                            <div className="_text-line"/>
                            <div className="_text-line"/>
                        </div>
                    }
                </div>
                <a href={previewState.addMedia && previewState.addMedia.externalLink}>
                    <div className="_image" data-preview={previewState.addMedia && !!previewState.addMedia && !!previewState.addMedia.imageUpload}>
                        {previewState.addMedia && previewState.addMedia.imageUpload &&
                        <img
                            src={previewState.addMedia.imageUpload}
                        />
                        }

                        {previewState.addMedia && previewState.addMedia.externalLink &&
                        <div className="_link-body">
                            <h4>{previewState.addMedia.linkTitle}</h4>
                            <h5>{previewState.addMedia.linkSubtitle}</h5>
                            <p>{previewState.addMedia.externalLink}</p>
                        </div>
                        }
                    </div>
                </a>

                {previewState.targetDate &&
                <div className="_goal">
                    <div className="_goal-bar">
                        Goal: {previewState.targetDate}
                    </div>
                    <div className="_edit-icon">
                        <FaEdit/>
                    </div>
                </div>
                }
            </div>

            <div className="_post-footer">
                {someLinkPagesSelected
                    ? <div className="_social-networks">
                        <span data-preview={!!previewState.facebookPage}><FaFacebook/></span>
                        <span data-preview={!!previewState.twitterPage}><FaTwitter/></span>
                        <span data-preview={!!previewState.linkedInPage}><FaLinkedin/></span>
                    </div>
                    : <div className="_placeholder">
                        Thank you for your support!
                    </div>
                }
            </div>
        </div>;
    }
}

export default CampaignPreview;
