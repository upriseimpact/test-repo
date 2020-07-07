import React, { PureComponent } from 'react';
import { VictoryAxis, VictoryArea, VictoryChart } from 'victory';
import { Route, NavLink } from 'react-router-dom';
import Card from './Card.jsx';

import './GeneralReachCard.scss';

const SELECTORS = [
    { to: '', text: 'Total Reach' },
    { to: '/all-time', text: 'All Time' },
    { to: '/this-year', text: 'This Year' },
    { to: '/this-month', text: 'This Month' },
    { to: '/this-week', text: 'This Week' }
];

class GeneralReachCard extends PureComponent {
    render() {
        return (
            <Card f3>
                <div className="reach-container">
                    <div className="tab-container">
                        {SELECTORS.map(({ to, text }, index) => (
                            <NavLink
                                key={index}
                                to={`${this.props.match.url}${to}`}
                                activeClassName="-selected"
                                exact
                                className="title">{text}</NavLink>
                        ))}
                    </div>


                    <svg className="gradient-defs">
                        <defs>
                            <linearGradient id="grad2" x1="100%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: '#5c6dfe', stopOpacity: 0 }} />
                                <stop offset="100%" style={{ stopColor: '#5c6dfe', stopOpacity: 0.1 }} />
                            </linearGradient>
                        </defs>
                    </svg>

                    <Route path={`${this.props.match.url}/:timeInterval?`}
                        render={({ match }) => {
                            const timeInterval = match.params.timeInterval || 'total-reach';
                            return (
                                <VictoryChart
                                    height={220} width={500}
                                    padding={{ top: -10, bottom: 30, left: 20, right: 20 }}
                                    domain={{ x: [ 1, 12 ], y: [ 1, 9 ] }}
                                >

                                    <VictoryAxis
                                        tickValues={[
                                            'Jan', 'Feb', 'Mar', 'Apr',
                                            'May', 'Jun', 'July', 'Aug',
                                            'Sep', 'Oct', 'Nov', 'Dec'
                                        ]}
                                        style={{
                                            axis: { stroke: 'black', strokeWidth: 0 },
                                            tickLabels: {
                                                fill: '#bdbcbf',
                                                fontSize: 10,
                                                fontFamily: 'Roboto, sans-serif',
                                                fontWeight: '100'
                                            }
                                        }}
                                    />
                                    <VictoryArea
                                        interpolation="natural"
                                        style={{
                                            data: { stroke: '#5c6dfe', fill: 'url(#grad2)', strokeWidth: 2 }
                                        }}
                                        data={this.props.data[timeInterval]}
                                    />
                                </VictoryChart>
                            );
                        } }
                    />

                </div>

            </Card>);
    }
}

export default GeneralReachCard;
