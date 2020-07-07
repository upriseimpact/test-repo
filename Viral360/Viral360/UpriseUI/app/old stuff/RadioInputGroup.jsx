import React, { PureComponent } from 'react';
import { Map, Source } from 'react-collectable';

import './RadioInputGroup.scss';

class RadioInput extends PureComponent {
    render() {
        return <label className="radio-input">
            <Source value={() => {
                return Promise.resolve(this._radioInput.checked);
            }}>
                <input
                    type="radio"
                    name={this.props.name}
                    ref={(node) => {
                        this._radioInput = node;
                    }}
                    defaultChecked={this.props.defaultChecked}
                    disabled={this.props.disabled}
                    onInput={this.props.onInput && (() => this.props.onInput())}
                />
            </Source>
            <span className="_radio-input"></span>
            <span className="_label-text">{this.props.labelText}</span>
        </label>;
    }
}

class RadioInputGroup extends PureComponent {
    _parseRadioData(data) {
        const result = Object.keys(data).find(key => data[key]);

        if (!result) {
            throw new Error('missing selection');
        }

        return result;
    }

    render() {
        const defaultValue = this.props.defaultValue;

        return <div className="radio-input-group">
            <span className="_name">{this.props.name}</span>
            <span className="_group">
                <Map filter={data => this._parseRadioData(data)}>{(Parameter) => <React.Fragment>
                    {this.props.options.map((option, optionIndex) =>
                        <Parameter name={option} key={optionIndex}>
                            <RadioInput
                                type="radio"
                                name={this.props.name}
                                labelText={option}
                                defaultChecked={defaultValue === option}
                                onInput={this.props.onInput}
                            />
                        </Parameter>
                    )}
                </React.Fragment>}</Map>
            </span>
        </div>;
    }
}

export default RadioInputGroup;
