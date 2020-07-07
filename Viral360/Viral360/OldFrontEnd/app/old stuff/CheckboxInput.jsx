import React, { PureComponent } from 'react';
import { Source } from 'react-collectable';
import MdCheck from 'react-icons/lib/md/check';

import './CheckboxInput.scss';

class CheckboxInput extends PureComponent {
    constructor(props) {
        super(props);

        this._checkboxInput = null;
    }

    render() {
        return <label
            className="checkbox-input"
        >
            <Source
                value={() => {
                    return Promise.resolve(this._checkboxInput.checked);
                }}
            >
                <input
                    type="checkbox"
                    ref={(node) => {
                        this._checkboxInput = node;
                    }}
                    onChange={() => this.props.onChange()}
                />
            </Source>
            <span className="_icon">
                <MdCheck />
            </span>
        </label>;
    }
}

export default CheckboxInput;
