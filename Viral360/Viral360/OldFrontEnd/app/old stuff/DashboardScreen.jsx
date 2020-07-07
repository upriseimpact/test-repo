import React from 'react';

import LatestCampaignChart from './LatestCampaignChart.jsx';
import TotalSpendChart from './TotalSpendChart.jsx';
import TopContactsChart from './TopContactsChart.jsx';
import HelpChart from './HelpChart.jsx';
import AllCampaignsChart from './AllCampaignsChart.jsx';

require('./DashboardScreen.scss');

function DashboardScreen() {
    return <div className="dashboard-screen">
        <div className="_row">
            <div className="_widget-box -double">
                <h4>Latest Campaign</h4>
                <LatestCampaignChart />
            </div>
            <div className="_widget-box">
                <h4>Costs</h4>
                <TotalSpendChart />
            </div>
            <div className="_widget-box">
                <h4>All Campaigns</h4>
                <AllCampaignsChart />
            </div>
            <div className="_widget-box">
                <h4>Top Contacts</h4>
                <TopContactsChart />
            </div>
            <div className="_widget-box">
                <h4>Help</h4>
                <HelpChart />
            </div>
        </div>
    </div>;
}

export default DashboardScreen;
