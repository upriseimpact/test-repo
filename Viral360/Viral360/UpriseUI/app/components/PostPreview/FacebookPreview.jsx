import React, { PureComponent } from 'react';

import GoGlobe from 'react-icons/lib/go/globe';
import MdGroup from 'react-icons/lib/md/group';
import MdQuestionAnswer from 'react-icons/lib/md/question-answer';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import MdChatBubbleOutline from 'react-icons/lib/md/chat-bubble-outline';
import TiArrowForwardOutline from 'react-icons/lib/ti/arrow-forward-outline';
import IoAndroidMoreHorizontal from 'react-icons/lib/io/android-more-horizontal';

import { socialMediaEnum } from '../api-helper/index.jsx';

import reactions from '../../assets/reactions_12_2017.png';

require('./FacebookPreview.scss');

export default class FacebookPreview extends PureComponent {
    constructor(props) {
        super(props);

        // find which Posts[x] is facebook Id and save as const
        this.state = {
            postIndex: this.props.previewState.campaign.Posts.findIndex((post) => {
                return post.SocialMediaId == socialMediaEnum.facebook;
            })
        };
    }

    componentWillReceiveProps(props) {
        this.forceUpdate();
    }

    render() {
        const { previewState } = this.props;
        const previewStateExists = (previewState != null);
        
        return <div className="facebook-preview">
            {/* <div className="_brand-header">
                <span className="_icon-group">
                    <MdGroup />
                    <MdQuestionAnswer />
                    <GoGlobe />
                </span>
            </div>
            */}
            <div className="_header">
                <div className="_header-details">
                    <div className="_logo" data-preview={previewStateExists && previewState.hasOwnProperty('distributor') && previewState.distributor.LogoUrl != null}>
                        <img src={previewStateExists && previewState.distributor ? previewState.distributor.LogoUrl : null} alt=""/>
                    </div>
                    <span className="_text">
                    {console.log(previewState)}
                        <span className="_name" data-preview={previewStateExists && previewState.hasOwnProperty('campaign')}>
                            {this.state.postIndex == -1 ?
                                previewState.distributor.FullName
                                : previewState.campaign.Posts[this.state.postIndex].Author}
                        </span>
                        <span className="_timestamp">
                            1 hr
                            <GoGlobe />
                        </span>
                    </span>
                </div>
                <div className="_more">
                    <IoAndroidMoreHorizontal />
                </div>
            </div>
            {/* find post.SocialMediaId == 1 
                should be guarenteed to exist, check for findIndex == -1
            */}
            <div className="_text">
                {this.state.postIndex != -1 && previewState.campaign.Posts[this.state.postIndex].PostMessage}
            </div>
        
            {this.state.postIndex != -1 ?
                <a href={previewState.campaign.Posts[this.state.postIndex].Interactable ? previewState.campaign.Posts[this.state.postIndex].Link : null}>
                    <div className="_image" data-preview={previewState.campaign.Posts[this.state.postIndex].MediaUpload != null}>
                        {/* use mediaupload by default (converted to base64), if null use mediaLink, if null use null */}
                        {previewState.campaign.Posts[this.state.postIndex].MediaLink != '' ?
                            <img src={previewState.campaign.Posts[this.state.postIndex].MediaLink} />
                            :
                            null}
                        
                        {previewState.campaign.Posts[this.state.postIndex].Link ?
                            <div className="_link">
                                <p>{previewState.campaign.Posts[this.state.postIndex].Link}</p>
                                <h3>{previewState.campaign.Posts[this.state.postIndex].LinkTitle}</h3>
                            </div>
                            :
                            null}
                    </div>
                </a>
                :
                null}
            <div className="_reactions">
                <span className="_icon-group">
                    <span className="_icon-images">
                        <img src={reactions} />
                    </span>
                    <span className="_icon-count">
                        476
                    </span>
                </span>
                <span className="_comments-shares-count">
                    <span className="_comments">
                        215 Comments
                    </span>
                    <span className="_shares">
                        5 Shares
                    </span>
                </span>
            </div>
            <div className="_action-icons">
                <span className="_icon-group"><FaThumbsOUp />Like</span>
                <span className="_icon-group"><MdChatBubbleOutline />Comment</span>
                <span className="_icon-group"><TiArrowForwardOutline />Share</span>
            </div>
        </div>;
    }
}
