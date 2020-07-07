import React from 'react';

import { VictoryLine, VictoryChart } from 'victory';

function LatestCampaignChart() {
    return <div className="latest-campaign-chart">
        <VictoryChart
            height={200}
            width={500}
            padding={{ top: 20, bottom: 70, left: 50, right: 30 }}
        >
            <VictoryLine
                style={{
                    data: { stroke: '#17a0d0', strokeWidth: 4 }
                }}
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

export default LatestCampaignChart;
