import React, { PureComponent } from 'react';
import Card from './Card.jsx';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

import './GeneralAgeCard.scss';

export default class GeneralAgeCard extends PureComponent {
    render() {
        return (
            <Card p30 f1>
                <div className="age-card-container">
                    <div className="title">Age</div>
                    <div className="subtitle">Average 40+</div>
                    <div className="graph">
                        <svg className="gradient-defs">
                            <defs>
                                <linearGradient id="age-card-container-gradient-1" x1="0%" y1="100%" x2="0%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: '#1dc5e9', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#1ee8b7', stopOpacity: 1 }} />
                                </linearGradient>
                                <linearGradient id="age-card-container-gradient-2" x1="0%" y1="100%" x2="0%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: '#899ed4', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#5e6efd', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                        </svg>
                        <VictoryChart
                            domainPadding={20}
                            padding={{ top: 10, bottom: 30, left: 20, right: 20 }}>
                            <VictoryBar
                                data={this.props.data}
                                x="age"
                                y="users"
                                barWidth={7}
                                cornerRadius={{ top: 4, bottom: 4 }}
                                style={{
                                    data: { fill: ({ eventKey }) =>
                                        eventKey % 2
                                            ? 'url(#age-card-container-gradient-2)'
                                            : 'url(#age-card-container-gradient-1)'
                                    }
                                }}
                            />
                            <VictoryAxis
                                style={{
                                    axis: { strokeWidth: 0 },
                                    tickLabels: {
                                        fill: '#bdbcbf',
                                        fontSize: 16,
                                        fontWeight: '100'
                                    }
                                }}
                            />
                        </VictoryChart>
                    </div>
                </div>
            </Card>);
    }
}
