import React, { PureComponent } from 'react';

import AngleDown from 'react-icons/lib/fa/angle-down';
import Retweet from 'react-icons/lib/fa/retweet';
import Comment from 'react-icons/lib/fa/comment';
import Heart from 'react-icons/lib/fa/heart-o';

import { socialMediaEnum } from '../api-helper/index.jsx';
require('./TwitterPreview.scss');

export default class TwitterPreview extends PureComponent {
    constructor(props) {
        super(props);

        // find which Posts[x] is facebook Id and save as const
        this.state = {
            postIndex: this.props.previewState.campaign.Posts.findIndex((post) => {
                return post.SocialMediaId == socialMediaEnum.twitter;
            })
        };
    }

    componentWillReceiveProps(props) {
        this.forceUpdate();
    }

    render() {
        const { previewState } = this.props;
        const previewStateExists = (previewState !== null);

        return <div className="twitter-preview">
            <div className="_header">
                <div className="_logo" data-preview={previewStateExists && previewState.distributor.LogoUrl != null}>
                    <img src={previewStateExists && previewState.distributor.LogoUrl ? previewState.distributor.LogoUrl : ''} alt=""/>
                </div>
                <div className="_post-info">
                    <div className="_post-name" data-preview={previewStateExists && previewState.hasOwnProperty('campaign')}>
                        {this.state.postIndex == -1 ?
                            previewState.distributor.FullName
                            : previewState.campaign.Posts[this.state.postIndex].Author}
                    </div>
                    <div className="_post-handle" data-preview={previewStateExists && previewState.hasOwnProperty('campaign')}>
                        {this.state.postIndex == -1 ?
                            "@" + previewState.distributor.FullName.replace(/\s/g,'').toLowerCase()
                            :"@" + previewState.campaign.Posts[this.state.postIndex].Author.replace(/\s/g,'').toLowerCase()}
                    </div>
                </div>
                <div className="_follow-container">
                    <div className="_fake-follow-button">
                        Follow
                    </div>
                </div>
                <div className="_more">
                    <AngleDown />
                </div>
            </div>

            {this.state.postIndex != -1 && previewState.campaign.Posts[this.state.postIndex].PostMessage !== "" ?
                <div className="_body">
                    {previewState.campaign.Posts[this.state.postIndex].PostMessage}
                </div>
                : null}

            {/* only image */}
            {this.state.postIndex != -1 && previewState.campaign.Posts[this.state.postIndex].Link == '' 
            && (previewState.campaign.Posts[this.state.postIndex].MediaLink) ?
                <div className="_image">
                    <img src={previewState.campaign.Posts[this.state.postIndex].MediaLink} />
                </div>
                : null}

            {/* link and with image or no image */}
            {this.state.postIndex != -1 && previewState.campaign.Posts[this.state.postIndex].Link !== '' ?
                <div className="_link">
                    <div className="_img-bounds">
                        {previewState.campaign.Posts[this.state.postIndex].MediaLink != '' ?
                            <img src={previewState.campaign.Posts[this.state.postIndex].MediaLink} />
                            :
                            null}
                    </div>
                    <div className="_link-content">
                        <h1>{previewState.campaign.Posts[this.state.postIndex].LinkTitle}</h1>
                        <h2>{previewState.campaign.Posts[this.state.postIndex].LinkDescription}</h2>
                        <h3>{previewState.campaign.Posts[this.state.postIndex].Link}</h3>
                    </div>
                </div>
                : null}

            <div className="_date-info">
                {/*previewState.campaign.LaunchDate*/}
                1:27 PM - 7 Feb 2020
            </div>

            <div className="_retweets">
                <div className="_values">
                    <b>114</b> Retweets
                    <span>  </span>
                    <b>1704</b> Likes
                </div>
                <div className="_icons">
                    <img src={null}/>
                    <img src={null}/>
                    <img src={null}/>
                    <img src={null}/>
                    <img src={null}/>
                </div>
            </div>

            <div className="_metrics">
                <div> <Comment/> <span>129</span></div>
                <div> <Retweet/> <span>114</span></div>
                <div> <Heart/> <span>1.7k</span></div>
            </div>
        </div>
    }
}