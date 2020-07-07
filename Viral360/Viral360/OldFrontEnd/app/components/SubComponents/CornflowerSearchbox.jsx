/* eslint-disable indent */
import React, { PureComponent } from 'react';
import { Context, Input } from 'react-collectable';

import { requireText } from '../FormElements//Validations.js';

import MdSearch from 'react-icons/lib/md/search';

import './CornflowerSearchbox.scss';


class CornflowerSearchbox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }

    _onChange = (event) => {
        this.setState({
            inputValue: event.target.value
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.inputValue);
            }
        });
    }

    render() {
        return <Context>
            {/* eslint-disable no-script-url */}
            {() =>
                <form
                    action="javascript:void(0)"
                    className="cornflower-searchbox"
                >
                    <Input filter={requireText}>
                        <input
                            className="_input"
                            type="text"
                            name="Search"
                            placeholder={this.props.placeholder}
                            value={this.state.inputValue}
                            onChange={this._onChange}
                        />
                    </Input>
                    <MdSearch className="_icon" />
                </form>
            }
            {/* eslint-enable no-script-url */}
        </Context>;
    }
}

export default CornflowerSearchbox;
