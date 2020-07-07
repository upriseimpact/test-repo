import moment from 'moment';
import React, { PureComponent } from 'react';

import './CornflowerUpcomingCampaigns.scss';

class CornflowerUpcomingCampaigns extends PureComponent {
    render() {
        return <div className="cornflower-upcoming-campaigns">
            <div className="_title">
                Upcoming campaigns
            </div>

            {this.props.upcomingCampaigns.length
                ? <ul className="_campaigns-list">
                    {this.props.upcomingCampaigns.map(campaign =>
                        <li className="_campaign" key={campaign.Id}>
                            <div className="_date">
                                <div className="_day">
                                    {moment(campaign.LaunchDate).format('DD')}
                                </div>
                                <div className="_month">
                                    {moment(campaign.LaunchDate).format('MMM')}
                                </div>
                            </div>
                            <div className="_details">
                                <div className="_name">
                                    {campaign.CampaignTitle}
                                </div>
                                <div className="_description">
                                    {campaign.DistributorMessage}
                                </div>
                            </div>
                        </li>)}
                </ul>
                : <div className="_no-campaigns">
                    There are no scheduled campaigns soon.
                </div>
            }
        </div>;
    }
}

export default CornflowerUpcomingCampaigns;
