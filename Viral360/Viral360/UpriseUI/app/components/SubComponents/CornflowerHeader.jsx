import React, { PureComponent } from 'react';

import CornflowerActionButton from '../SubComponents/CornflowerActionButton.jsx';
import NotificationDropdown from '../SubComponents/NotificationDropdown.jsx';
import ProfileDropdown from '../SubComponents/ProfileDropdown.jsx';

import notifData from '../../mockData/notif_data.json';

import './CornflowerHeader.scss';

class CornflowerHeader extends PureComponent {
    render() {
        return <div className="cornflower-header">
            <ul className="_button-list">
                <li>
                    <CornflowerActionButton
                        buttonText="Start new campaign"
                        onClick={() => {
                            this.props.history.push('/new-campaign');
                        }}
                    />
                </li>
                <li>
                    <CornflowerActionButton
                        buttonText="Add advocates"
                        highlight
                        onClick={() => {
                            this.props.history.push('/advocates');
                        }}
                    />
                </li>
            </ul>
            <div className="_user-profile-group">
                <NotificationDropdown messages={notifData}/>
                <ProfileDropdown userData={this.props.userData} />
            </div>
        </div>;
    }
}

export default CornflowerHeader;
