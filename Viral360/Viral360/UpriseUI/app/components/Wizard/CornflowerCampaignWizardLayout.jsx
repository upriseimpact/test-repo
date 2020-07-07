import React, { PureComponent } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import CornflowerActionButton from '../SubComponents/CornflowerActionButton.jsx';

import './CornflowerCampaignWizardLayout.scss';

class CornflowerCampaignWizardLayout extends PureComponent {
    render() {
        const { baseUrl, navItems, children, wizardState } = this.props;

        return <div className="cornflower-campaign-wizard-layout">
            <div className="_header">
                <div className="_title">

                    <div className="_logo"></div>

                    <div className="_step-number">
                        <Switch>
                            {navItems.map(item =>
                                <Route path={`${baseUrl}${item.path}`} key={item.path} render={() =>
                                    <h1>{item.step}</h1>
                                } />
                            )}
                        </Switch>
                    </div>

                    <div className="_title-spacer"></div>
                </div>
                <ul className="_nav">
                    {(navItems).map((item, index) =>
                        <li key={index}>
                            <NavLink
                                to={`${baseUrl}${item.path}`}
                                activeClassName="-active"
                                onClick={(event) => event.preventDefault() /*disabled*/}
                            >
                                {item.text}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>

            <div className="_detail-scroll">
                {children}
            </div>
        </div>;
    }
}

export default CornflowerCampaignWizardLayout;
