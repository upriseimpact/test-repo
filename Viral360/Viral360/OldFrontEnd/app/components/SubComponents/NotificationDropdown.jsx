import React, { PureComponent } from 'react';
// import DropDownActionButton from '../SubComponents/DropDownActionButton.jsx';
// import IoAndroidNotificationsNone from 'react-icons/lib/io/android-notifications-none';

import './NotificationDropdown.scss';

export default class NotificationDropdown extends PureComponent {
    render() {
        return (
            <div className="notif-dropdown">
                {/* <DropDownActionButton
                    right={'210px'}
                    trigger={
                        <div className="_bell-icon">
                            <IoAndroidNotificationsNone />
                        </div>
                    }>
                    {this.props.messages.map(({ title, publisher, messageText, timestamp }, index) => {
                        return (
                            <div key={index} className="message-container">
                                <div className="header">
                                    <b className="title">{title}</b>
                                    <span className="timestamp">{timestamp}</span>
                                </div>
                                <div className="message-content">
                                    {publisher && <b>{publisher + ': '}</b>}
                                    <span className="message-text">{messageText}</span>
                                </div>
                                {(this.props.messages.length - index) > 1 && (
                                    <hr className="separator" align="left" width="90%"/>
                                )}
                            </div>
                        );
                    })}
                </DropDownActionButton> */}
            </div>
        );
    }
}
