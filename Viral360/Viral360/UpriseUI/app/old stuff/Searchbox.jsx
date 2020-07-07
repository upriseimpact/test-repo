import React from 'react';
import { Context, Input } from 'react-collectable';

import { requireText } from './Validations.js';

import MdSearch from 'react-icons/lib/md/search';

require('./Searchbox.scss');

function Searchbox({ placeholder }) {
    return <div className="searchbox">
        <span className="_icon">
            <MdSearch />
        </span>
        <Context>
            {/* eslint-disable no-script-url */}
            {() =>
                <form
                    action="javascript:void(0)"
                >
                    <Input filter={requireText}>
                        <input
                            className="_input"
                            type="text"
                            name="Search"
                            placeholder={placeholder}
                        />
                    </Input>
                </form>
            }
            {/* eslint-enable no-script-url */}
        </Context>
    </div>;
}

export default Searchbox;
