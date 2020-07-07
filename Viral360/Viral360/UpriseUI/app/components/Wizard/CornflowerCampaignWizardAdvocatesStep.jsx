/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { Map } from 'react-collectable';

import CornflowerCampaignDatePicker from '../FormElements/CornflowerCampaignDatePicker.jsx';
import InnerFormFields from '../FormElements/InnerFormFields.jsx';
import InnerTextInput from '../FormElements/InnerTextInput.jsx';
import FileUploadButton from '../FormElements/FileUploadButton.jsx';
import Advocates from '../Advocates/Advocates.jsx';
import CornflowerCampaignPreview from '../PostPreview/CornflowerCampaignPreview.jsx';
import CornflowerCampaignMain from './CornflowerCampaignMain.jsx';
import { Input } from 'react-collectable';

import * as apiHelper from '../api-helper/index.jsx';

import './CornflowerCampaignWizardAdvocatesStep.scss';
import '../Advocates/Advocates.scss';

// changed to class to hold advocate selection state
export default class CornflowerCampaignWizardAdvocatesStep extends PureComponent {
    constructor(props) {
        super(props);

        // Advocates object calls back to set state with advocateIds
        this.state = {
            selected: []
        };
    }

    // whats the best UX for this page?
    // user could want to:
    //  add advocates from .csv, 
    //  add individual advocates,
    //  add advocates from profile
    // considerations: backend needs advocates on profile (only accepts Ids)
    // implies you cannot upload advocates for just this campaign
    // unless advocates can be given a type? 
    // public? private for all own campaigns? private for only select own campaigns?

    render() {
        const { defaultValue, then, onBack, save, onExit } = this.props;

        return <CornflowerCampaignMain
            wizardState={defaultValue}
            then={then}
            onBack={onBack}
            save={save}
            onExit={onExit}
            pageValue={4}
            auxiliary={(passedState) => <Advocates selectCallback={(ids) => {
                this.setState({ selected: ids });
            }} />}
            form={(lastError, onInput) => <Map>{Parameter => <div className="cornflower-campaign-wizard-advocates-step">
                <div className="_form-section">
                    {/* duplicate advocate component with form elements
                    or give Advocates a select callback to collect from?
                    how the fuck does collect work?
                    <Advocates/>
                    */}
                    <div className="_form-section">
                        <h4>Select the advocates you would like to include in this campaign this campaign</h4>
                        {<Parameter name="advocates">
                            <InnerFormFields
                                filter={(value) => {
                                    console.log("Collected advocates: ");
                                    console.log(this.state.selected);
                                    value.Ids = this.state.selected;
                                    return value;
                                }}
                                // this input object just creates a surrogate
                                // for the auxilliary component to set in filter above ^
                                Ids={<Input>
                                    <input style={{ visibility: 'hidden' }}/>
                                </Input>}
                                lastError={lastError}
                                errorText="Malformed .csv"
                            />
                        </Parameter>}
                    </div>
                </div>
            </div>}</Map>}
        />;
    }
}