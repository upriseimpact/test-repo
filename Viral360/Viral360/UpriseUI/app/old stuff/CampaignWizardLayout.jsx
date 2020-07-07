import React, { PureComponent } from 'react';
import { Context, Status, Preview } from 'react-collectable';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import CampaignPostForm from './CampaignPostForm.jsx';
import CampaignDetails from './CampaignDetails.jsx';
import ActionButton from './ActionButton.jsx';
import FacebookPreview from './FacebookPreview.jsx';
import LinkedInPreview from './LinkedInPreview.jsx';
import AddContacts from './AddContacts.jsx';

require('./CampaignWizardLayout.scss');

class CampaignWizardLayout extends PureComponent {
    constructor() {
        super();

        this.state = {
            wizardState: {}
        };
    }

    _setWizardState(wizardState) {
        this.setState(currentState => {
            return { wizardState: { ...currentState.wizardState, ...wizardState } };
        });
    }

    _renderPreview(lastValue) {
        const previewState = { ...this.state.wizardState, ...lastValue };

        switch (previewState.socialMediaId) {
        case 'LinkedIn':
            return <LinkedInPreview
                text={previewState.text}
                imageUpload={previewState.imageUpload}
                tags={previewState.tags}
            />;

        default:
            return <FacebookPreview
                text={previewState.text}
                imageUpload={previewState.imageUpload}
                tags={previewState.tags}
            />;
        }
    }

    render() {
        const navItems = [
            { text: 'Campaign Details', path: '/campaign-details' },
            { text: 'Craft Your Post', path: '/craft-your-post' },
            { text: 'Add Contacts', path: '/add-contacts' },
            { text: 'Confirmation', path: '/confimation' }
        ];

        return <Context>{(collect) => <Status>{(formError) => <Preview catch={error => error.values || null}>{(lastValue, requestPrefetch) =>
            <div className="campaign-wizard-layout">
                <div className="_main">
                    <div className="_nav">
                        <div className="_nav-line">
                        </div>
                        <ul className="_nav-items">
                            {(navItems || []).map((item, index) =>
                                <li key={index}>
                                    <NavLink
                                        to={`${this.props.baseUrl}${item.path}`}
                                        activeClassName="-active"
                                    >
                                        <div className="_circle" />
                                        <div className="_label">
                                            {item.text}
                                        </div>
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="_form">
                        <Switch>
                            <Route exact path={`${this.props.baseUrl}`} render={() =>
                                <Redirect to={`${this.props.baseUrl}/campaign-details`} />
                            }/>
                            <Route path={`${this.props.baseUrl}/campaign-details`} render={() =>
                                <CampaignDetails onInput={() => requestPrefetch()} defaultValue={this.state.wizardState} lastError={formError} />
                            }/>
                            <Route path={`${this.props.baseUrl}/craft-your-post`} render={() =>
                                <CampaignPostForm onInput={() => requestPrefetch()} defaultValue={this.state.wizardState} lastError={formError} />
                            }/>
                            <Route path={`${this.props.baseUrl}/add-Contacts`} render={() =>
                                <AddContacts />
                            }/>
                        </Switch>
                        <div className="_buttons">
                            <ActionButton
                                buttonText="Save"
                                onClick={() => {
                                    collect().then(value => {
                                        this._setWizardState(value);
                                    });
                                }}
                                isSmall
                                isInverse
                            />
                            <ActionButton
                                buttonText="Next"
                                onClick={() => {
                                    collect().then(value => {
                                        this._setWizardState(value);
                                    });
                                }}
                                isSmall
                            />
                        </div>
                    </div>
                </div>
                <div className="_side">
                    {this._renderPreview(lastValue)}
                </div>
            </div>
        }</Preview>}</Status>}</Context>;
    }
}

export default CampaignWizardLayout;
