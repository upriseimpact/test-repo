import React from 'react';
import ReactDOM from 'react-dom';
import { Context } from 'react-collectable';
import { Op } from 'react-dynamics';

import ActionButton from './ActionButton.jsx';

import MdClose from 'react-icons/lib/md/close';

import './ActionOverlay.scss';

class ActionOverlay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: Object.keys(this.props.navItems)[0]
        };
    }

    _updateSelectedTab(tabName) {
        this.setState({
            selectedTab: tabName
        });
    }

    render() {
        return ReactDOM.createPortal(
            <div className="action-overlay">
                <div
                    className="_overlay"
                    onClick={event => {
                        event.stopPropagation();
                        this.props.taskState.cancel();
                    }}
                />
                <div className="_dialog">
                    <div className="_header">
                        <div className="_title">
                            {this.props.title}

                            <button
                                className="_close"
                                type="button"
                                onClick={event => {
                                    event.stopPropagation();
                                    this.props.taskState.cancel();
                                }}
                            >
                                Close

                                <span className="_close-icon">
                                    <MdClose />
                                </span>
                            </button>
                        </div>
                        {/* eslint-disable no-script-url */}
                        {this.props.navItems &&
                            <ul className="_form-nav">
                                {Object.keys(this.props.navItems).map(item =>
                                    <li key={item}>
                                        <a
                                            href="javascript:void(0)"
                                            data-selected={item === this.state.selectedTab}
                                            onClick={() => this._updateSelectedTab(item)}
                                        >
                                            {this.props.navItems[item]}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        }
                        {/* eslint-enable no-script-url */}
                    </div>

                    <Op
                        action={this.props.action}
                        then={this.props.then}
                    >
                        {/* eslint-disable no-script-url */}
                        {(currentOp, lastOp) =>
                            <Context>{collect =>
                                <form action="javascript:void(0)" onSubmit={event => {
                                    event.stopPropagation();
                                    currentOp.invoke(collect());
                                }}>
                                    {this.props.children(this.state.selectedTab)}

                                    <div className="_actions">
                                        {lastOp && lastOp.isError && !lastOp.isInputError
                                            ? <div className="_error">
                                                {lastOp.value.message || lastOp.value.toString()}
                                            </div>
                                            : null
                                        }

                                        <ActionButton
                                            buttonText={this.props.submitLabel}
                                            isSmall
                                            type="submit"
                                            disabled={currentOp.isPending}
                                        />
                                    </div>
                                </form>}
                            </Context>
                        }
                        {/* eslint-enable no-script-url */}
                    </Op>
                </div>
            </div>,
            document.body
        );
    }
}

export default ActionOverlay;
