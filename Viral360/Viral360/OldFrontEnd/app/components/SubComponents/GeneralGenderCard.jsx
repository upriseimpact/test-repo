import React, { PureComponent } from 'react';
import Card from './Card.jsx';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryLabel } from 'victory';

import './GeneralGenderCard.scss';


export default class GeneralGenderCard extends PureComponent {
  labelDisplay = ({ percentage, title }) => `${title} \n${percentage}%`;

  labelComponentRatio = (ratio) => (<VictoryLabel dx={40}
      className="graph-label"
      dy={({ percentage }) => {
          return ratio * Math.log(percentage);
      }}/>);

  render() {
      return (
          <Card p30>
              <div className="gender-card-container">
                  <div className="title">Gender</div>
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
                          width={75}
                          height={160}
                          padding={{ top: 30, bottom: 10, right: 0, left: 5 }}
                      >
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
                          <VictoryStack>
                              <VictoryBar
                                  data={this.props.data[0]}
                                  x="gender"
                                  y="percentage"
                                  barWidth={7}
                                  cornerRadius={{ top: 0, bottom: 4 }}
                                  labels={this.labelDisplay}
                                  labelComponent={this.labelComponentRatio(14)}
                                  style={{
                                      data: { fill: 'url(#age-card-container-gradient-1)' }
                                  }}
                              />
                              <VictoryBar
                                  data={this.props.data[1]}
                                  x="gender"
                                  y="percentage"
                                  barWidth={7}
                                  labelComponent={<VictoryLabel y={36} dx={13}/>}
                                  cornerRadius={{ top: 4, bottom: 0 }}
                                  labels={this.labelDisplay}
                                  labelComponent={this.labelComponentRatio(14)}

                                  style={{
                                      data: { fill: 'url(#age-card-container-gradient-2)' }
                                  }}
                              />
                          </VictoryStack>

                      </VictoryChart>
                  </div>
              </div>
          </Card>);
  }
}
