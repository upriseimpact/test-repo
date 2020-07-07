import React, { PureComponent } from 'react';

require('./PublicLayout.scss');

class PublicLayout extends PureComponent {
    render() {
        return <div className="public-layout">
            <div className="_left-column">
                <div className="logo">
                    <img className="left" src="https://uploads-ssl.webflow.com/5bcd229376071de1d612dd33/5bd93884d39e26ba45b8f1fc_Combined%20Shape.svg" alt=""/>
                    <img className="right" src="https://uploads-ssl.webflow.com/5bcd229376071de1d612dd33/5bd9388cd39e26e0c0b8f1fe_uprise.ai.svg" alt=""/>
                </div>
                {this.props.children}
            </div>
            <div className="_right-column"/>
        </div>;
    }
}

export default PublicLayout;
