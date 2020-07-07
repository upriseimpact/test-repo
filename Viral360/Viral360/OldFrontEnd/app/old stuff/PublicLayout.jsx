import React, { PureComponent } from 'react';

require('./PublicLayout.scss');

class PublicLayout extends PureComponent {
    render() {
        return <div className="public-layout">
            <div className="_left-column">
                <div className="_circles">
                    <div className="_position -one">
                        <div className="_circle">
                        </div>
                    </div>
                    <div className="_position -two">
                        <div className="_circle">
                        </div>
                    </div>
                    <div className="_position -three">
                        <div className="_circle">
                        </div>
                    </div>
                    <div className="_position -four">
                        <div className="_circle">
                        </div>
                    </div>
                    <div className="_position -five">
                        <div className="_circle">
                        </div>
                    </div>
                    <div className="_position -six">
                        <div className="_circle">
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>
            <div className="_right-column">
                <div className="_image-overlay">
                    <div className="_image-overlay-text">
                        <h3>Voices, rising.</h3>
                        <h5>Share stories with impact.</h5>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default PublicLayout;
