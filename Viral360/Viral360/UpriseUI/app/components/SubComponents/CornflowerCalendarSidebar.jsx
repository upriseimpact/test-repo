import React, { PureComponent } from 'react';

import CornflowerCampaignCalendar from './CornflowerCampaignCalendar.jsx';
import CornflowerUpcomingCampaigns from './CornflowerUpcomingCampaigns.jsx';

import * as apiHelper from '../api-helper/index.jsx';

import './CornflowerCalendarSidebar.scss';

class CornflowerCalendarSidebar extends PureComponent {
    constructor() {
        super();

        // once campaigns object is inherited or pulled
        // (should be inherited to reduce backend calls per page)
        // filter for upcoming and calendar
        this.state = {
            calendarCampaigns: [],
            upcomingCampaigns: [],
        };
    }

    componentDidMount() {
        // this data should be passed in props by parent (to reduce backend calls)
        // or accessed in localStorage? if possible
        // otherwise needs to know self and get campaigns associated with self (does token auth take care of this?)
        apiHelper.listCampaigns(0)
            .then((response) => {
                this.setState({
                    calendarCampaigns: response.filter((c) => {
                        const checkDate = new Date(c.LaunchDate);
                        const currDate = new Date();
                        return (checkDate.getFullYear() >= currDate.getFullYear() && checkDate.getMonth() >= currDate.getMonth());
                    }),
                    upcomingCampaigns: response.filter((c) => {
                        const checkDate = new Date(c.LaunchDate);
                        const currDate = new Date();
                        const futureDate = new Date().setDate(currDate.getDate() + 31);
                        return (checkDate.getFullYear() >= currDate.getFullYear() && checkDate.getMonth() >= currDate.getMonth() && checkDate.getDate() >= currDate.getDate() &&
                            checkDate < futureDate );
                    }),
                })
            })
            .catch((err) => {
                // keep state as empty arrays
            });
    }

    render() {
        return <div className="cornflower-calendar-sidebar">
            <div className="_title">Campaign Calendar</div>

            <div className="_calendar">
                {/* calendar must know about all campaigns from the start of this month to then end of this month + 1 year */}
                <CornflowerCampaignCalendar upcomingCampaigns={this.state.calendarCampaigns} />
            </div>
            {/* upcoming must know about all campaigns launching today through today + XX days */}
            <CornflowerUpcomingCampaigns upcomingCampaigns={this.state.upcomingCampaigns} />
        </div>;
    }
}

export default CornflowerCalendarSidebar;
