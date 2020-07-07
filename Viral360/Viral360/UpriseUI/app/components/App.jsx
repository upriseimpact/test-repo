/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import PublicLayout from './PageLayouts/PublicLayout.jsx';
import Advocates from './Advocates/Advocates.jsx';
import GeneralScreen from './PageLayouts/GeneralScreen.jsx';
import Campaigns from './Campaigns/Campaigns.jsx';
import CornflowerSessionLayout from './PageLayouts/CornflowerSessionLayout.jsx';
import CornflowerCalendarSidebar from './SubComponents/CornflowerCalendarSidebar.jsx';
import CornflowerNewCampaignWizard from './Wizard/CornflowerNewCampaignWizard.jsx';
import CornflowerLandingLayout from './PageLayouts/CornflowerLandingLayout.jsx';
import b2cauth from 'react-azure-adb2c';

import * as apiHelper from './api-helper/index.jsx';
import LoginForm from './FormElements/LoginForm.jsx';

export default class CornflowerApp extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: true, //testing
            userData: null,
        };
    }

    componentWillMount() {
        var token = localStorage.getItem('token');
        if (token !== null) { 
            this.setState({isAuthenticated: true});
        }

        apiHelper.getSelf()
            .then((myData) => {
                this.setState({ userData: myData });
            });
    }
  
    // CornflowerSesionLayout auxiliary and internal require campaign/user data
    // to reduce total backend calls required:
    // make backend calls here and pass?
    // make backend calls in SessionLayout and pass (can you pass if invoking components through props?)
    // let inner components pull from localStorage?
    render() {
        return <BrowserRouter >
            
            {this.state.isAuthenticated
                ? <Switch>
                    <Route path="/home" render={({ history, match }) => {
                        document.title = 'Home';

                        return <CornflowerSessionLayout
                            auxiliary={<CornflowerCalendarSidebar />}
                            history={history}
                            userData={this.state.userData}
                        >
                            <GeneralScreen match={match} />
                        </CornflowerSessionLayout>;
                    }} />
                        <Route path="/campaigns" render={({ history, match }) => {
                        document.title = 'Campaigns';
                        return <CornflowerSessionLayout
                            auxiliary={<CornflowerCalendarSidebar />}
                            history={history}
                            userData={this.state.userData}
                        >
                            <Campaigns match={match} />
                        </CornflowerSessionLayout>;
                    }} />
                    <Route path="/advocates" render={({ history }) => {
                        document.title = 'Advocates';
                        return <CornflowerSessionLayout
                            auxiliary={<CornflowerCalendarSidebar />}
                            history={history}
                            userData={this.state.userData}
                        >
                            {/* not <AdvocatesScreen /> */}
                            <Advocates />
                        </CornflowerSessionLayout>;
                    }} />
                    <Route path="/new-campaign" render={({ match, location, history }) => {
                        document.title = 'Create a new Campaign';
                        // add edit-campaign which accepts id (assuming auth)
                        // use id to load wizard state
                        // then save&exit will re send (backend realizes its used?)
                        return <CornflowerNewCampaignWizard
                            baseUrl={match.url}
                            location={location}
                            history={history}
                            userData={this.state.userData}
                        />;
                    }} />
                    <Route path="/splash/:id" render={({ match, location }) => {
                        document.title = 'Uprise';
                        return <CornflowerLandingLayout
                            id={match.params.id}
                            history={history}
                        />;
                    }} />
                    <Route render={() =>
                        <Redirect to="/home" />
                    } />
                </Switch>
                : <Switch>
                    <Route path="/processauth" render={({history,match}) =>{
                        /* The redirect URL from MS Auth returns
                            https://.../#state=xxx&client_info=yyy&id_token=zzz
                            We need the id_token that we store in this session and pass with 
                            every consequent request to the backend. The code below is extracting 
                            the id_token
                        */
                        var hash = history.location.hash;
                        
                        if (hash.length > 0){
                            try {
                                var tokens = hash.split('&');
                                var idTokenString = tokens[2].split('=');
                                if (idTokenString[0] != 'id_token') {
                                    throw new Error("Malformed return from Auth. Likely threw error");
                                }
                                var token = idTokenString[1];
                                localStorage.setItem('token', token);
                                this.setState({isAuthenticated: true});
                                // history.push('/home');
                                return <Redirect to='/home'/>;
                            } catch (error) {
                                //console.log(error);
                                alert(error.message);
                                return <Redirect to='/home'/>;
                                //return <Redirect to='/'/>;
                                // TODO: post message/redirect 
                            }
                        } else {
                            return(<div>This page doesn't work that way </div>);
                        }
                    }} />
                    <Route render={({history,match}) => {
                        const config = {
                            instance: process.env.instance,
                            tenant: process.env.tenant,
                            signInPolicy: process.env.signInPolicy,
                            resetPolicy: process.env.resetPolicy,
                            profilePolicy: process.env.profilePolicy,
                            applicationId: process.env.applicationId,
                            cacheLocation: process.env.cacheLocation,
                            scopes: [ process.env.scope_one,
                                process.env.scope_two,
                                process.env.scope_three
                            ],
                            redirectUri: process.env.redirectUri
                        }
                        console.log(config);
                        b2cauth.initialize({
                            instance: config.instance,
                            tenant: config.tenant,
                            signInPolicy: config.signInPolicy,
                            applicationId: config.applicationId,
                            cacheLocation: config.cacheLocation,
                            scopes: config.scopes,
                            redirectUri: config.redirectUri,
                            postLogoutRedirectUri: window.location.origin,
                        });
                        b2cauth.run(() => {
                            console.log('here');
                            return(<div></div>);
                        });
                    }} />
                </Switch>
            }
        </BrowserRouter>;
    }
}