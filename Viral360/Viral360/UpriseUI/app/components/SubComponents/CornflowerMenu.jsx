import React from 'react';
import { NavLink } from 'react-router-dom';

import IoIosSpeedometerOutline from 'react-icons/lib/io/ios-speedometer-outline';
import MIoIosPulse from 'react-icons/lib/io/ios-pulse';
import MdGroup from 'react-icons/lib/md/group';

import './CornflowerMenu.scss';

function CornflowerMenu() {
    return <div className="cornflower-menu">
        <ul className="_menu-items">
            {/* eslint-disable no-script-url */}
            <li>
                <NavLink activeClassName="-active" to="/home">
                    <span className="_icon">
                        <IoIosSpeedometerOutline />
                        <span className="_tooltip">Dashboard</span>
                    </span>
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="-active" to="/campaigns">
                    <span className="_icon">
                        <MIoIosPulse />
                        <span className="_tooltip">Campaigns</span>
                    </span>
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="-active" to="/advocates">
                    <span className="_icon">
                        <MdGroup />
                        <span className="_tooltip">Advocates</span>
                    </span>
                </NavLink>
            </li>
            {/* eslint-enable no-script-url */}
        </ul>
    </div>;
}

export default CornflowerMenu;
