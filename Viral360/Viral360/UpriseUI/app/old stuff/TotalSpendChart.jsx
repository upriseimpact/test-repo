import React from 'react';

import { VictoryPie } from 'victory';

require('./TotalSpendChart.scss');

function TotalSpendChart() {
    return <div className="total-spend-chart">
        <span className="_projected-label">
            Projected
        </span>
        <span className="_paid-label">
            Paid
        </span>
        <VictoryPie
            padAngle={0}
            innerRadius={100}
            padding={{ top: 60, bottom: 20, left: 24 }}
            style={{ parent: { maxWidth: '60%' } }}
            /* eslint-disable */
            data={[
                { x: ' ', y: 30 },
                { x: ' ', y: 70 }
            ]}
            /* eslint-enable */
            colorScale={[ '#17a0d0', '#c5e7f3' ]}
        />
    </div>;
}

export default TotalSpendChart;
