import React, { PureComponent } from 'react';

import { Context, Input } from 'react-collectable';

import { requireText } from '../FormElements/Validations.js';

import MdSearch from 'react-icons/lib/md/search';

class TitleBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }
    filterContacts = (event) => {
        this.setState({
            inputValue: event.target.value.toLowerCase()
        }, () => {
            this.props.filterContacts(this.state.inputValue);
        });
    };
    render() {
        const { searchPlaceholder, title, actionItem } = this.props;
        return <div className="cornflower-main-title-bar">
            <div className="_title-group">
                <span className="_title">{title}</span>
                <button className="cornflower-action-button" type={'button'} data-highlight={true} onClick={this.props.deleteSelection}>
                    {actionItem}
                </button>
                <div className="file-upload-button">
                    <input
                        type="file" accept=".csv"
                    />
                </div>
            </div>

            {searchPlaceholder && (
                <div className="_searchbar">
                    <Context>
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
                                        placeholder="Search"
                                        value={this.state.inputValue}
                                        onChange={this.filterContacts.bind(this)}
                                    />
                                </Input>
                                <MdSearch className="_icon" />
                            </form>
                        }
                        {/* eslint-enable no-script-url */}
                    </Context>
                </div>)}
        </div>;
    }
}

export default TitleBar;
