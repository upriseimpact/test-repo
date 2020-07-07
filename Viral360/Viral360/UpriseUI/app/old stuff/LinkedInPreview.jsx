import React from 'react';

import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import MdChatBubbleOutline from 'react-icons/lib/md/chat-bubble-outline';
import TiArrowForwardOutline from 'react-icons/lib/ti/arrow-forward-outline';
import IoAndroidMoreHorizontal from 'react-icons/lib/io/android-more-horizontal';
import FaLinkedinSquare from 'react-icons/lib/fa/linkedin-square';

require('./LinkedInPreview.scss');

function LinkedInPreview({
    text,
    imageUpload
    // tags
}) {
    return <div className="linkedin-preview">
        <div className="_brand-header">
        </div>
        <div className="_header">
            <div className="_header-details">
                <div className="_logo">
                </div>
                <span className="_text">
                    <span className="_name">
                        {/* should this text have its own span? */}
                        Joey Jaden
                        <FaLinkedinSquare />
                    </span>
                    <span className="_job-title">
                        Digital Product Developer
                    </span>
                    <span className="_timestamp">
                        23h
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
        <div className="_post-footer">
            <div className="_likes-comments-shares-count">
                <span className="_likes">
                    90 Likes
                </span>
                <span className="_comments">
                    17 Comments
                </span>
            </div>
            <div className="_action-icons">
                <span className="_icon-group"><FaThumbsOUp />Like</span>
                <span className="_icon-group"><MdChatBubbleOutline />Comment</span>
                <span className="_icon-group"><TiArrowForwardOutline />Share</span>
            </div>
        </div>
    </div>;
}

export default LinkedInPreview;
