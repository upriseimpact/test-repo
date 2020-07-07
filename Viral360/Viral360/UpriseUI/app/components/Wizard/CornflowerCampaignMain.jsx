/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { Context, Status, Preview } from 'react-collectable';

import CornflowerActionButton from '../SubComponents/CornflowerActionButton.jsx';
import CornflowerCampaignPreview from '../PostPreview/CornflowerCampaignPreview.jsx';

import * as apiHelper from '../api-helper/index.jsx';
import { mergeFormStateIntoCurrentState } from './wizard-helper.jsx'
import { resolveFormLink } from './wizard-helper.jsx';

import './CornflowerCampaignMain.scss';

const submitEnum = {
    noop: 0,
    submit_then: 1,
    submit_back: 2,
    submit_save: 3,
    exit: 4,
    submit_publish: 5,
}

class CornflowerCampaignMain extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            previewState: props.wizardState,
            submitType: 0
        };
    }

    updatePreviewState(newValue) {
        this.setState({
            previewState: mergeFormStateIntoCurrentState(newValue, this.state.previewState)
        });
    }

    render() {
        const { form, auxiliary, wizardState, then, onBack, save, onExit, pageValue } = this.props;

        return <Context>{(collect) => <Status>{(formError) => <Preview catch={error => error.values || null}>{(lastValue, requestPrefetch) => {
            //const previewState = { ...wizardState, ...lastValue };
            this.updatePreviewState(lastValue);

            return <div className="cornflower-campaign-wizard-main">
                <div className="_left-spacer"></div>
                <form id="cornflowerForm" action="#" onSubmit={event => {
                    event.preventDefault();
                    // don't collect/validate data
                    if (this.state.submitType == submitEnum.noop) {
                        return;
                    } else if (this.state.submitType == submitEnum.exit) {
                        //console.log("exiting");
                        if (confirm("Leave campaign creator? This will delete all input information.")) {
                            if (onExit) onExit('/home');
                        }
                        return;
                    }
                    // collect form info, perform validation, then come here if everything is OK
                    try {
                        collect()
                            .then(value => {

                                if (this.state.submitType == submitEnum.submit_back) {
                                    onBack(value);
                                } else if (this.state.submitType == submitEnum.submit_then) {
                                    then(value);
                                } else if (this.state.submitType == submitEnum.submit_save) {
                                    //console.log("going to save");
                                    save(value, false);
                                } else if (this.state.submitType = submitEnum.submit_publish) {
                                    //console.log("going to publish");
                                    save(value, true);
                                }
                            })
                            .catch(error => {
                                // catch input errors
                                //console.log("caught after collect");
                                // page errors will be thrown, but throw save errors anyway
                                // for consistency. (save errors MUST be a superset of page errors)
                                if (this.state.submitType == submitEnum.submit_save) {
                                    //console.log("going to save with null");
                                    save(null, false);
                                }
                            });
                    } catch (error) {
                        console.log("failed out of collect");
                        // could not collect/ nothing to collect => move anyway but pass null
                        if (this.state.submitType == submitEnum.submit_back) {
                            onBack(null);
                        } else if (this.state.submitType == submitEnum.submit_then) {
                            then(null);
                        } else if (this.state.submitType == submitEnum.submit_save) {
                            console.log("going to save (on page without form)");
                            save(null, false);
                        } else if (this.state.submitType = submitEnum.submit_publish) {
                            //console.log("going to publish (on page without form)");
                            save(null, true);
                        }
                    }
                }}>
                    <div className="_main">{form(formError, requestPrefetch)}</div>

                    {formError ?
                        <div className="_error">
                            {formError.errors ?
                                Object.keys(formError.errors).map((k, i) => {
                                    return <div key={i}>
                                        {formError.errors[k].message}
                                    </div>;
                                })
                                : formError.message}
                            <p>Please fix all errors before proceeding.</p>
                        </div>
                        : null}

                    <div className="_form-buttons">
                        <CornflowerActionButton
                            className="_enter-key-default"
                            buttonText=""
                            type="submit"
                            onClick={() => {
                                this.setState({ submitType: submitEnum.noop });
                            }}
                        />

                        <CornflowerActionButton
                            buttonText="Delete and Exit"
                            type="submit"
                            className="_outer-button2"
                            shift="50px"
                            onClick={() => {
                                this.setState({ submitType: submitEnum.exit });
                            }}
                        />

                        <CornflowerActionButton
                            buttonText="Save and Exit"
                            type="submit"
                            className="_outer-button"
                            highlight
                            onClick={() => {
                                this.setState({ submitType: submitEnum.submit_save });
                            }}
                        />

                        {onBack
                            ? <CornflowerActionButton
                                buttonText="Back"
                                type="submit"
                                onClick={() => {
                                    this.setState({ submitType: submitEnum.submit_back });
                                }}
                            />
                            : <span />
                        }
                        {then
                            ? <CornflowerActionButton
                                buttonText={pageValue == 4 ? <s>Publish</s> : 'Next'}
                                type="submit"
                                highlight
                                onClick={() => {
                                    if (pageValue == 4) {
                                        this.setState({ submitType: submitEnum.submit_publish });
                                    } else {
                                        this.setState({ submitType: submitEnum.submit_then });
                                    }
                                }}
                            />
                            : <span />
                        }
                    </div>
                </form>

                <div className="_auxiliary">
                    {auxiliary ? auxiliary(this.state.previewState) : null}
                </div>

                <div className="_right-spacer"></div>
            </div>;
        }}</Preview>}</Status>}</Context>;
    }
}

export default CornflowerCampaignMain;
