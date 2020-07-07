import React from 'react';

import GoGlobe from 'react-icons/lib/go/globe';
import MdGroup from 'react-icons/lib/md/group';
import MdQuestionAnswer from 'react-icons/lib/md/question-answer';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import MdChatBubbleOutline from 'react-icons/lib/md/chat-bubble-outline';
import TiArrowForwardOutline from 'react-icons/lib/ti/arrow-forward-outline';
import IoAndroidMoreHorizontal from 'react-icons/lib/io/android-more-horizontal';

require('./FacebookPreview.scss');

function FacebookPreview({
    text,
    imageUpload
    // tags
}) {
    return <div className="facebook-preview">
        <div className="_brand-header">
            <span className="_icon-group">
                <MdGroup />
                <MdQuestionAnswer />
                <GoGlobe />
            </span>
        </div>
        <div className="_header">
            <div className="_header-details">
                <div className="_logo">
                </div>
                <span className="_text">
                    <span className="_name">
                        Joey Jaden
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
        <div className="_text">
            {text || 'Your post text'}
        </div>
        <div className="_image">
            <img
                src={imageUpload}
            />
        </div>
        <div className="_reactions">
            <span className="_icon-group">
                <span className="_icon-images">
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

export default FacebookPreview;
