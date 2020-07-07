/* eslint-disable linebreak-style */
import React, {PureComponent} from 'react';
import {Context, Input} from 'react-collectable';
import {requireText} from '../FormElements/Validations.js';
import MdSearch from 'react-icons/lib/md/search';
import _ from 'lodash';

import './TitleBar.scss';

const styles = {
    fileContainer: {
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        borderRadius: ".25em",
        float: "left",
        padding: ".25em",
        margin: "0.5em"
    },

    fileInput: {
        cursor: "pointer",
        display: "block",
        fontSize: "999px",
        filter: "alpha(opacity=0)",
        minHeight: "100%",
        minWidth: "100%",
        opacity: 0,
        position: "absolute",
        right: 0,
        textAlign: "right",
        top: 0
    }
};

class TitleBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }

    // fileInput = React.createRef();

    filterEntity = (event) => {
        this.setState({
            inputValue: event.target.value.toLowerCase()
        }, () => {
            this.props.filter(this.state.inputValue);
        });
    };

    render() {
        const { title, actionItem, searchPlaceholder, importHandler, importInfo } = this.props;
        return (
            <div className="_title">
                <div className="cornflower-main-title-bar">
                    <div className="_title-group">
                        <span className="_title">{title}</span>
                        {actionItem && <button className="cornflower-action-button" type={'button'} data-highlight={true}
                            onClick={this.props.deleteSelection}>
                            {actionItem}
                        </button>}
                        {importHandler && <button className="cornflower-action-button" type={'button'} data-highlight={true}
                            style={styles.fileContainer}>
                            Upload File
                            <input
                                accept=".csv"
                                type="file"
                                onChange={e => {
                                    //TESTING NOTE, onchange is only called for different files
                                    // uploading the same file twice will NOOP
                                    // What if the operation fails and the user retries? :hmm:
                                    if (importHandler) importHandler(this.fileInput.files[0]);
                                }}
                                ref={elem => this.fileInput = elem}
                                style={styles.fileInput}
                            />
                        </button>}
                        {importInfo && 
                            <button className="cornflower-alert-button" 
                            type={'button'}
                            onClick={() => alert(importInfo)}>
                            ?
                        </button>}
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
                                                onChange={this.filterEntity.bind(this)}
                                            />
                                        </Input>
                                        <MdSearch className="_icon"/>
                                    </form>
                                }
                                {/* eslint-enable no-script-url */}
                            </Context>
                        </div>)}
                </div>
            </div>
        );
    }
}

export default TitleBar;
