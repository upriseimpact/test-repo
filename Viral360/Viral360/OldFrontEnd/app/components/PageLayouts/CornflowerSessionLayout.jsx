import React, { PureComponent } from 'react';

import CornflowerMenu from '../SubComponents/CornflowerMenu.jsx';
import CornflowerHeader from '../SubComponents/CornflowerHeader.jsx';
import CornflowerFeedbackModal from '../SubComponents/CornflowerFeedbackModal.jsx';

import './CornflowerSessionLayout.scss';

class CornflowerSessionLayout extends PureComponent {
    constructor(props) {
        super(props);

        this.state = { showPopup: false };
    }

    togglePopup = () => {
        this.setState({ showPopup: !this.state.showPopup });
    }

    render() {
        return <div className="cornflower-session-layout">
            <div className="_side">
                <div className="_logo"></div>

                <div className="_menu">
                    <CornflowerMenu />
                </div>

                <div className="_spacer"></div>

                <div className="_question" onClick={this.togglePopup}>?</div>
            </div>

            <div className="_main">
                <div className="_header">
                    <CornflowerHeader history={this.props.history} userData={this.props.userData} />
                </div>

                <div className="_detail-scroll">
                    <div className="_detail">
                        <div className="_content">{this.props.children}</div>
                        <div className="_auxiliary">{this.props.auxiliary}</div>
                    </div>
                </div>
            </div>

            {this.state.showPopup &&
                <CornflowerFeedbackModal closeFunc={this.togglePopup} firstName={this.props.userData ? this.props.userData.FullName : ''} />
            }

        </div>;
    }
}

export default CornflowerSessionLayout;
