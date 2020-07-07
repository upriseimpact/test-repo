import React, { PureComponent } from 'react';
import moment from 'moment';

import CalendarWeeks from './CalendarWeeks.jsx';

import IoAndroidArrowDropleft from 'react-icons/lib/io/android-arrow-dropleft';
import IoAndroidArrowDropright from 'react-icons/lib/io/android-arrow-dropright';

import './CornflowerCampaignCalendar.scss';

class CornflowerCampaignCalendar extends PureComponent {
    constructor() {
        super();

        // save current time reference point for stability
        this._referenceDate = new Date();

        // generates indexed list of day abbreviations (using moment?)
        this._weekdayList = [ 0, 1, 2, 3, 4, 5, 6 ].map(weekdayIndex => {
            return moment(this._referenceDate).weekday(weekdayIndex).format('ddd');
        });


        this.state = {
            monthOffset: 0
        };
    }

    _changeMonth(delta) {
        // constrain month offset to be non-negative
        this.setState(state => ({
            monthOffset: Math.min(12, Math.max(0, state.monthOffset + delta))
        }));
    }

    _renderDayCellContents(dayMoment, campaignDateList) {
        const dayYYYYMMDD = dayMoment && dayMoment.format('YYYY-MM-DD');
        const dayObject = new Date(dayYYYYMMDD + "T00:00:00");
        /* label must know: 
            day realtive to today, (past, present, future)
            day is campaign?, (none, start, middle, end)
            what type of campaign (upcoming, live, complete)
        */
        let relativeTime = 'future';
        if (dayObject < this._referenceDate) {
            relativeTime = 'past';
        }
        if (dayObject.getFullYear() == this._referenceDate.getFullYear() &&
            dayObject.getMonth() == this._referenceDate.getMonth() &&
            dayObject.getDate() == this._referenceDate.getDate()) {
            relativeTime = 'present';
        }
        // loop through each campaignDate
        let isCampaign = 'none';
        let campaignType = 'none';
        for (var date of campaignDateList) {
            let LaunchDateObject = new Date(date[0] + "T00:00:00");
            let TargetDateObject = new Date(date[1] + "T00:00:00");
            // check against dayYYYMMDD
            if (dayObject.getFullYear() == LaunchDateObject.getFullYear() &&
                dayObject.getMonth() == LaunchDateObject.getMonth() &&
                dayObject.getDate() == LaunchDateObject.getDate()) {
                isCampaign = 'single';
                campaignType='upcoming';
            } /*else if (dayObject > LaunchDateObject && dayObject < TargetDateObject) {
                isCampaign = 'middle';
            } else if (dayObject.getFullYear() == TargetDateObject.getFullYear() &&
                dayObject.getMonth() == TargetDateObject.getMonth() &&
                dayObject.getDate() == TargetDateObject.getDate()) {
                isCampaign = 'end';
            }
            */
            // check against this._referenceDate
            /*
            if (isCampaign != 'none') { // only assign campaignType if isCampaign
                if (date[2] == true) {
                    campaignType = 'pending';
                } else if (true) {
                    campaignType = 'upcoming';
                } else if (false) {
                    campaignType = 'middle';
                } else if (false) {
                    campaignType = 'complete';
                }
                break; // once assignment has been made break early
            }
            */
        }

        return <label
            key={dayYYYYMMDD}
            is-campaign={isCampaign}
            campaign-type={campaignType}
            relative-time={relativeTime}
        >
            <span className="_day">{dayMoment.format('DD')}</span>
        </label>;
    }

    render() {
        const campaignDateList = this.props.upcomingCampaigns.map(campaign => [campaign.LaunchDate.split("T")[0], campaign.TargetDate.split("T")[0], campaign.Disabled]);

        return (
            <CalendarWeeks
                reference={this._referenceDate}
                monthOffset={this.state.monthOffset}
            >
                {(startDate, untilDate, weeks) => {
                    const startMoment = moment(startDate);

                    return <div className="cornflower-campaign-calendar">
                        <div className="_header">
                            <div className="_calendar">Calendar</div>
                            <div className="_month-selector">
                                <button
                                    type="button"
                                    onClick={() => this._changeMonth(-1)}
                                >
                                    <IoAndroidArrowDropleft />
                                </button>

                                <div className="_month-name">
                                    {startMoment.format('MMM')}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => this._changeMonth(1)}
                                >
                                    <IoAndroidArrowDropright />
                                </button>
                            </div>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    {this._weekdayList.map((dayLabel, index) =>
                                        <th key={index}>{dayLabel}</th>
                                    )}
                                </tr>
                            </thead>

                            <tbody>
                                {weeks.map((week, weekIndex) => <tr key={weekIndex}>
                                    {week.map((day, dayIndex) => <td key={dayIndex}>
                                        {(day && this._renderDayCellContents(startMoment.date(day), campaignDateList))}
                                    </td>)}
                                </tr>)}
                            </tbody>
                        </table>
                    </div>;
                }}
            </CalendarWeeks>
        );
    }
}

export default CornflowerCampaignCalendar;
