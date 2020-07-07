import React from 'react';

import { VictoryBar, VictoryChart } from 'victory';

function AllCampaignsChart() {
    return <div className="all-campaigns-chart">
        <VictoryChart
            domainPadding={20}
        >
            <VictoryBar
                style={{ data: { fill: '#17a0d0' } }}
                /* eslint-disable */
                data={[
                    { x: 1, y: 2 },
                    { x: 2, y: 3 },
                    { x: 3, y: 5 },
                    { x: 4, y: 4 },
                    { x: 5, y: 6 }
                ]}
                /* eslint-enable */
            />
        </VictoryChart>
    </div>;
}

export default AllCampaignsChart;
