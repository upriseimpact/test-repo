import React, { PureComponent } from 'react';
// import DropDownActionButton from '../SubComponents/DropDownActionButton.jsx';
// import IoAndroidArrowDropdown from 'react-icons/lib/io/android-arrow-dropdown';
// import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import * as apiHelper from '../api-helper/index.jsx';

import './ProfileDropdown.scss';

export default class ProfileDropdown extends PureComponent {

    // logout = () => { 
    //     apiHelper.logout()
    //         .then((response) => {
    //             localStorage.removeItem('token');
    //             window.location.href="/"
    //         })
    //         .catch((err) => {
    //             alert(err);
    //         });

    // }
    render() {
        return (
            <div className="profile-dropdown">
                {/* <DropDownActionButton
                    right={'40px'}
                    trigger={
                        <div className="profile-trigger-container">
                            <div className="_user-headshot">
                                <img src={this.props.userData ? this.props.userData.LogoURL : '../../assets/Uprise_Icon_Colourful.png'} />
                            </div>
                            <div className="_user-name">
                              {this.props.userData ? this.props.userData.FullName : 'Uprise User'}
                            </div>
                            <div className="_arrow-icon">
                                <IoAndroidArrowDropdown />
                            </div>
                        </div>
                    }>

                    <div className="dropdown-display-container">
                        <div className="option"><b>Company Profiles:</b></div>
                        <div className="option">
                            <div className="_with-image">
                                <div className="icon"/>
                                <s>Uprise.you</s>
                            </div>
                        </div>
                        <hr className="divider" align="left" width="100%"/>
                        <a href="#" className="option"><s>Personal profile</s></a>
                        <a href="#" className="option"><s>Settings</s></a>
                        <a href="#" className="option"><s>invite collegue</s></a>
                        <hr className="divider" align="left" width="100%"/>
                        <a href="#" className="option"><s>help</s></a>
                        <a href="#" onClick={this.logout} className="option">log out</a>
                    </div>

                </DropDownActionButton> */}
            </div>
        );
    }
}
