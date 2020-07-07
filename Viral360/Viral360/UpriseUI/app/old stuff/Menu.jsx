import React from 'react';
import { Link } from 'react-router-dom';

import MdMyLocation from 'react-icons/lib/md/my-location';
import MdGroup from 'react-icons/lib/md/group';
import MdSettings from 'react-icons/lib/md/settings';

require('./Menu.scss');

function Menu() {
    return <div className="menu">
        <ul className="_menu-items">
            <li>
                <Link to="/">
                    <span className="_app-logo-icon">
                    </span>
                    Dashboard
                </Link>
            </li>
            <li>
                <Link to="/campaigns">
                    <span className="_icon">
                        <MdMyLocation />
                    </span>
                    Campaigns
                </Link>
            </li>
            <li>
                <Link to="/distributors">
                    <span className="_icon">
                        <MdGroup />
                    </span>
                    Contacts
                </Link>
            </li>
            <li>
                <Link to="/settings">
                    <span className="_icon">
                        <MdSettings />
                    </span>
                    Settings
                </Link>
            </li>
        </ul>
    </div>;
}

export default Menu;
