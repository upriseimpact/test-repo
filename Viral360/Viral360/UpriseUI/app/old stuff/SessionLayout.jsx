import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

import Menu from './Menu.jsx';

require('./SessionLayout.scss');

class SessionLayout extends PureComponent {
    render() {
        const { title, actionItems, navItems, children, baseUrl } = this.props;

        return <div className="session-layout">
            <div className="_side">
                <div className="_logo">
                </div>
                <div className="_user-name">
                    Francis
                </div>
                <div className="_user-type">
                    Distributor
                </div>
                <Menu />
            </div>
            <div className="_main">
                <div className="_section-header">
                    <div className="_header-title">
                        <h1>{title}</h1>
                        <ul className="_header-action-items">
                            {(actionItems || []).map((item, index) =>
                                <li key={index}>
                                    {item}
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="_header-subhead">
                        <ul className="_header-nav">
                            {(navItems || []).map((item, index) =>
                                <li key={index}>
                                    <NavLink
                                        to={`${baseUrl}${item.path}`}
                                        activeClassName="-active"
                                    >
                                        {item.text}
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="_section-detail">
                    {children}
                </div>
            </div>
        </div>;
    }
}

export default SessionLayout;
