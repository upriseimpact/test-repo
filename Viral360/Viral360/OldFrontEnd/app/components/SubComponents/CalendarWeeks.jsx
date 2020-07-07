import moment from 'moment';
import React from 'react';

class CalendarWeeks extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            startDate: null,
            untilDate: null,
            weeks: null
        };
    }

    componentWillMount() {
        this._setParameters(this.props.reference, this.props.monthOffset);
    }

    componentWillReceiveProps(nextProps) {
        this._setParameters(nextProps.reference, nextProps.monthOffset);
    }

    _setParameters(reference, monthOffset) { // eslint-disable-line max-statements
        // get start of requested month and corresponding grid parameters
        const now = moment(reference).startOf('month').add(monthOffset, 'M');

        const leadingPadDayCount = now.weekday();
        const monthDayCount = now.daysInMonth();
        const displayedWeekCount = Math.ceil((leadingPadDayCount + monthDayCount) / 7);
        const trailingPadDayCount = (displayedWeekCount * 7) - leadingPadDayCount - monthDayCount;

        // auto-fill arrays with day slots
        const leadingPadDays = Array(...new Array(leadingPadDayCount)).map(() => null);
        const monthDays = Array(...new Array(monthDayCount)).map((unused, index) => index + 1);
        const trailingPadDays = Array(...new Array(trailingPadDayCount)).map(() => null);

        const allDays = [].concat(
            leadingPadDays,
            monthDays,
            trailingPadDays
        );

        // slice up weeks
        const weeks = Array(...new Array(displayedWeekCount)).map((unused, index) => {
            const nextIndex = index + 1;

            return allDays.slice(index * 7, nextIndex * 7);
        });

        // cache the data
        this.setState({
            startDate: now.toDate(),
            untilDate: moment(now).add(1, 'M').toDate(),
            weeks: weeks
        });
    }

    render() {
        return this.props.children(
            this.state.startDate,
            this.state.untilDate,
            this.state.weeks
        );
    }
}

export default CalendarWeeks;
