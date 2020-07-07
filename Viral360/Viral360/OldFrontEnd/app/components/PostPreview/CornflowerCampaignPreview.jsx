/* eslint-disable complexity */
/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';

import FaEdit from 'react-icons/lib/fa/edit';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaLinkedin from 'react-icons/lib/fa/linkedin';
import FaBars from 'react-icons/lib/fa/bars';
import './CornflowerCampaignPreview.scss';

import * as apiHelper from '../api-helper/index.jsx';
import { socialMediaEnum } from '../api-helper/index.jsx';

import DefaultPreview from './DefaultPreview.jsx';
import FacebookPreview from './FacebookPreview.jsx';
import TwitterPreview from './TwitterPreview.jsx';

// temporary default logo
import defaultLogo from '../../assets/Uprise_Icon_Colourful.png';

/*
use socialMediaId instead
const previewType = {
    NONE: 0,
    FACEBOOK: 1,
    TWITTER: 2,
    LINKEDIN: 3
};
*/

// previewState parameter is concat of {campaign, distributor}
export default class CornflowerCampaignPreview extends PureComponent {
    constructor(props) {
        super(props);

        if (props.publicView) {
            this.state = {
                mode: props.previewState.campaign.Posts[0].SocialMediaId
            };
        } else {
            this.state = {
                mode: socialMediaEnum.none
            };
        }

    }

    componentWillReceiveProps(props) {
        this.forceUpdate();
    }

    toggleMode = (newType) => {
        if (this.props.stateChangeCallback) {
            this.props.stateChangeCallback(newType);
        }
        
        if (this.state.mode == newType) {
            // don't toggle on double click to default incase not public view (where default doesn't exist)
            //this.setState({ mode: previewType.NONE });
        } else {
            try {
                this.setState({ mode: newType });
            } catch (e) {
                return;
            }
        }
    }

    render() {
        const { previewState, publicView, stateChangeCallback } = this.props;

        // define selected (visible) preiview based on state (rendered after selection header)
        let visiblePreview = null;
        switch (this.state.mode) {
        case 1:
            visiblePreview = <FacebookPreview previewState={previewState}/>
            break;
        case 7:
            visiblePreview = <TwitterPreview previewState={previewState}/>
            break;
        case 4:
            //visiblePreview = <LinkedinPreview previewState={previewState}/>
            visiblePreview = <DefaultPreview previewState={previewState}/>
            break;
        default:
            // if 0 selected or outside of defined modes use default
            // new socialmedia previews must be added to this switch to be used
            visiblePreview = <DefaultPreview previewState={previewState}/>
            break;
        }
        return <div className="cornflower-campaign-preview">
            <div className="_post-header">
                <div className="_social-networks">
                    {!publicView &&
                    <span
                        data-preview={this.state.mode === socialMediaEnum.none}
                        onClick={() => this.toggleMode(socialMediaEnum.none)}>
                        <FaBars />
                    </span>
                    }
                    {/* used post.Disabled here for conditional rendering here? */}
                    {previewState.campaign.Posts.map((post) =>
                        <span
                            key={"postToggle" + post.SocialMediaId}
                            data-preview={this.state.mode === post.SocialMediaId}
                            onClick={() => this.toggleMode(post.SocialMediaId)}>
                            {apiHelper.socialMediaInfo(post.SocialMediaId).iconComponent}
                        </span>
                    )}
                </div>
            </div>
            {visiblePreview}
        </div>;
    }
}

