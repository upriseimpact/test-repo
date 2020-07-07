import React, { PureComponent } from 'react';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import { Input } from 'react-collectable';
import { requireText } from './Validations.js';

import './Dropdown.scss';

class Dropdown extends PureComponent {
    constructor(props) {
        super(props);

        this._options = this.props.options;

        this.state = {
            selectedIndex: this.props.options.indexOf(this.props.defaultValue)
        };
    }

    _selectValue(value) {
        this.setState({
            selectedIndex: value
        });

        if (this.props.onInput) {
            this.props.onInput();
        }
    }

    render() {
        return <label className="dropdown">
            <span className="_name">{this.props.name}</span>
            <span className="_selected-value">
                <span className="_placeholder">
                    {
                        this.state.selectedIndex === -1
                            ? this.props.placeholder
                            : this._options[this.state.selectedIndex]
                    }
                </span>
                <FaAngleDown className="_icon" />
            </span>
            <Input filter={value => {
                return this._options[requireText(value)];
            }}>
                <select
                    onChange={(event) => this._selectValue(event.target.value)}
                    defaultValue={this.state.selectedIndex}
                >
                    <option value={null}>{this.props.placeholder}</option>
                    {this._options.map((optionValue, optionIndex) =>
                        <option key={optionValue} value={optionIndex}>
                            {optionValue}
                        </option>
                    )}
                </select>
            </Input>
        </label>;
    }
}

export default Dropdown;
