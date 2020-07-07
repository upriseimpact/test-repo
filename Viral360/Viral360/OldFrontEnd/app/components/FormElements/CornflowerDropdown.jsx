import React, { PureComponent } from 'react';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import { Input } from 'react-collectable';
import { requireText } from './Validations.js';

import './CornflowerDropdown.scss';

class CornflowerDropdown extends PureComponent {
    constructor(props) {
        super(props);

        this._options = this.props.options;

        this.state = {
            selectedIndex: this.props.options.indexOf(this.props.defaultValue)
        };
    }

    _selectValue(value) {
        this.setState({
            selectedIndex: parseInt(value, 10)
        });

        if (this.props.onInput) {
            this.props.onInput();
        }
    }

    render() {
        return <label className="dropdown">
            <span className="_selected-value">
                <span className="_placeholder">
                    {
                        this.state.selectedIndex === -1
                            ? this.props.placeholder
                            : this._options[this.state.selectedIndex]
                    }
                </span>
                <FaCaretDown className="_icon" />
            </span>

            <Input filter={value => {
                return this._options[requireText(value)];
            }}>
                <select
                    onChange={(event) => this._selectValue(event.target.value)}
                    defaultValue={this.state.selectedIndex}
                >
                    <option value={-1}>{this.props.placeholder}</option>
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

export default CornflowerDropdown;
