import React from 'react';

import CornflowerSearchbox from '../SubComponents/CornflowerSearchbox.jsx';

import './CornflowerMainTitleBar.scss';

function CornflowerMainTitleBar({ title, actionItem, searchPlaceholder, searchCallback }) {
    return <div className="cornflower-main-title-bar">
        <div className="_title-group">
            <span className="_title">{title}</span>
            <span className="_action-item">{actionItem}</span>
        </div>

        {searchPlaceholder && (
            <div className="_searchbar">
                <CornflowerSearchbox placeholder={searchPlaceholder}
                    onChange={searchCallback}/>
            </div>)}

    </div>;
}

export default CornflowerMainTitleBar;
