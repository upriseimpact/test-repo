import React, { PureComponent } from 'react';
import { Source } from 'react-collectable';
import MdCheck from 'react-icons/lib/md/check';

import './CornflowerCheckboxInput.scss';

// @todo uncomment Source and onChange when we add functionality to table
class CornflowerCheckboxInput extends PureComponent {
    render() {
        return <label
            className="cornflower-checkbox-input"
        >
            {/* <Source
                value={() => {
                    return Promise.resolve(this._checkboxInput.checked);
                }}
            > */}
            <input
                type="checkbox"
                ref={(node) => {
                    this._checkboxInput = node;
                }}
                onChange={(event) => {
                    this.props.onChange(event);
                }}
                />
            {/* </Source> */}
            <span className="_icon">
                <MdCheck />
            </span>
        </label>;
    }
}

export default CornflowerCheckboxInput;
