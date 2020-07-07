import moment from 'moment';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Manager, Reference, Popper } from 'react-popper';
import { Input } from 'react-collectable';
import { Task } from 'react-dynamics';

import FaCalendar from 'react-icons/lib/fa/calendar';

// this should be the only react-dates import in the app
import 'react-dates/initialize'; // perform AirBnB date picker init before main import
import 'react-dates/lib/css/_datepicker.css'; // default styling import
import { DayPicker } from 'react-dates';

import './CornflowerCampaignDatePicker.scss';

function requireOptionalYYYYMMDD(value) {
    if (value === '') {
        throw new Error("Campaign dates are Manditory");
    }

    const valueMoment = moment(value, 'YYYY-MM-DD');
    const isCurrentDate = valueMoment.isSameOrAfter();

    if (!isCurrentDate) {
        throw new Error('not a current date');
    }

    if (!valueMoment.isValid()) {
        throw new Error('bad date format');
    }

    // return cleanly formatted output
    return valueMoment.format('YYYY-MM-DD');
}

// should not be wrapped in label to avoid re-activation blink when selecting date
export default class CornflowerCampaignDatePicker extends PureComponent {
    constructor(props) {
        super(props);

        this._inputNode = null;
    }

    // eslint-disable-next-line max-params
    _renderDatePicker(datePickerState, ref, style, placement, currentMoment) {
        return <div
            ref={ref}
            style={{ ...style, opacity: 1, pointerEvents: 'auto' }}
            data-placement={placement}
        >
            <DayPicker verticalHeight={300} hideKeyboardShortcutsPanel renderDayContents={dayMoment => {
                if (dayMoment.isBefore(currentMoment)) {
                    return '';
                }

                return dayMoment.format('D'); // default implementation
                }} onDayClick={dayMoment => {
                    if (dayMoment.isBefore(currentMoment)) {
                        return;
                    }

                    datePickerState.resolve(dayMoment.format('YYYY-MM-DD'));
                }} onOutsideClick={() => {
                    // check if clicked back on the textbox
                    if (this._inputNode === document.activeElement) {
                        return;
                    }

                    datePickerState.cancel();
                }} onBlur={() => {
                    datePickerState.cancel();
                }}
            />
        </div>;
    }

    render() {
        const { defaultValue, onInput } = this.props;
        const currentMoment = moment();

        return <Task then={newDate => {
            this._inputNode.value = newDate;
            onInput();
        }}>{(datePickerState, openDatePicker) =>
            <Manager tag={false}>
                <div className="cornflower-campaign-date-picker">
                    <Reference tag={false}>
                        {({ ref }) => (
                            <div className="_date-input" ref={ref}>
                                {/* activating prompt via click (not focus) to avoid focus timing problems with date picker */}
                                <Input filter={requireOptionalYYYYMMDD}>
                                    <input
                                        type="text"
                                        placeholder="YYYY-MM-DD"
                                        defaultValue={defaultValue}
                                        ref={node => (this._inputNode = node)}
                                        onInput={onInput}
                                        onClick={() => {
                                            if (datePickerState) {
                                                return;
                                            }

                                            openDatePicker();
                                        }}
                                    />
                                </Input>
                                <span className="_icon-background">
                                    <FaCalendar className="_icon" />
                                </span>
                            </div>
                        )}
                    </Reference>

                    <div className="_picker">
                        {datePickerState
                            ? ReactDOM.createPortal(
                                <Popper
                                    placement="bottom-start"
                                    modifiers={{ preventOverflow: { boundariesElement: 'viewport' } }}
                                >{({ ref, style, placement }) => (
                                    this._renderDatePicker(datePickerState, ref, style, placement, currentMoment)
                                )}</Popper>
                                , document.body)
                            : null
                        }
                    </div>

                </div>
            </Manager>
        }</Task>;
    }
}