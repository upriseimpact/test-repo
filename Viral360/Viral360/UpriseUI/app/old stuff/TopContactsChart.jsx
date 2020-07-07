import React from 'react';

import contact1Url from './topcontacts-profile1.jpg';
import contact2Url from './topcontacts-profile2.jpg';
import contact3Url from './topcontacts-profile3.jpg';
import contact4Url from './topcontacts-profile4.jpg';

require('./TopContactsChart.scss');

function TopContactsChart() {
    return <div className="top-contacts-chart">
        <div className="_list">
            <div className="_contact">
                <div className="_profile-pic">
                    <img src={contact1Url} />
                </div>
                <div className="_name">
                    <h5>Joey Jaden</h5>
                    <span>Waterloo, Ont.</span>
                </div>
            </div>
            <div className="_contact">
                <div className="_profile-pic">
                    <img src={contact2Url} />
                </div>
                <div className="_name">
                    <h5>Enzo Tyler</h5>
                    <span>Waterloo, Ont.</span>
                </div>
            </div>
            <div className="_contact">
                <div className="_profile-pic">
                    <img src={contact3Url} />
                </div>
                <div className="_name">
                    <h5>Taylor Tucker</h5>
                    <span>Waterloo, Ont.</span>
                </div>
            </div>
            <div className="_contact">
                <div className="_profile-pic">
                    <img src={contact4Url} />
                </div>
                <div className="_name">
                    <h5>Lisa Tooks</h5>
                    <span>Waterloo, Ont.</span>
                </div>
            </div>
        </div>
    </div>;
}

export default TopContactsChart;
