/* eslint-disable linebreak-style */
import React from 'react';
import { Map } from 'react-collectable';

import CornflowerCampaignDatePicker from '../FormElements/CornflowerCampaignDatePicker.jsx';
import InnerFormFields from '../FormElements/InnerFormFields.jsx';
import InnerTextInput from '../FormElements/InnerTextInput.jsx';
import CornflowerDropdown from '../FormElements/CornflowerDropdown.jsx';
import CornflowerCampaignMain from './CornflowerCampaignMain.jsx';
import CornflowerCampaignPreview from '../PostPreview/CornflowerCampaignPreview.jsx';

import './CornflowerCampaignWizardTargettingStep.scss';

function CornflowerCampaignWizardTargettingStep({ defaultValue, then, onBack, save, onExit }) {
    return <CornflowerCampaignMain
        wizardState={defaultValue}
        then={then}
        onBack={onBack}
        save={save}
        onExit={onExit}
        pageValue={2}
        auxiliary={(passedState) => <CornflowerCampaignPreview previewState={passedState}/>}
        form={(lastError, onInput) => <Map>{Parameter => <div className="cornflower-campaign-wizard-targetting-step">
            <div className="_form-section">
                <h4>What is the goal of this campaign?</h4>
                {<Parameter name="targetAdvocates">
                    <InnerFormFields
                        filter={(value) =>{
                            if (value.advocatesNumber == '') value.advocateNumber = 0;
                            return value;
                        }}
                        advocatesNumber={<InnerTextInput
                            type="number"
                            placeholder="#0000"
                            defaultValue={defaultValue.campaign.TargetAdvocates ? defaultValue.campaign.TargetAdvocates : null}
                            onInput={onInput}
                        />}
                    />
                </Parameter>}
                <p>advocate shares by {new Date(Date.parse(defaultValue.campaign.TargetDate)).toDateString()} @ {new Date(Date.parse(defaultValue.campaign.TargetDate)).toLocaleTimeString()}</p>
            </div>

            <div className="_form-section">
                <h4>Industry Tags (Optional)</h4>
                <p>You may add more than one industry tag that you are targetting. Add a comma between each tag.</p>
                {<Parameter name="industryTags">
                    <InnerFormFields
                        tags={<InnerTextInput
                            type="textarea"
                            placeholder="Add Tags..."
                            defaultValue={null}
                            onInput={onInput}
                        />}
                    />
                </Parameter>}
            </div>

            <div className="_form-section">
                <h4>Location (Optional)</h4>
                <p>Add the city, region, and country that you are targetting with this campaign, separated by commas</p>
                {/*<p>You may add more than one location that you are targetting. Add a comma between each location.</p>*/}
                {<Parameter name="addLocation">
                    <InnerFormFields
                        location={<InnerTextInput
                            type="textarea"
                            placeholder="Add location..."
                            defaultValue={null}
                            onInput={onInput}
                        />}
                    />
                </Parameter>}
            </div>

            <div className="_form-section">
                <h4>Gender (Optional)</h4>
                {<Parameter name="genderSelect">
                    <InnerFormFields
                        filter={(value) => {
                            switch (value.gender) {
                            case 'Male':
                                value.gender = 1;
                                break;
                            case 'Female':
                                value.gender = 2;
                                break;
                            default:
                                value.gender = 3;
                                break;
                            }
                            return value;
                        }}
                        gender={<CornflowerDropdown
                            placeholder="Select gender"
                            onInput={onInput}
                            options={ [ 'Male', 'Female', 'Other' ] }
                            defaultValue={defaultValue.Gender ? [ 'Male', 'Female', 'Other' ][defaultValue.Gender] : null}
                        />}
                    />
                </Parameter>}
            </div>

            <div className="_form-section">
                <h4>Age Range (Optional)</h4>
                {<Parameter name="AgeRange">
                    <InnerFormFields
                        filter={value => {
                            if (parseInt(value.LowerBound) < 0 || parseInt(value.UpperBound) < 0 || parseInt(value.LowerBound) > parseInt(value.UpperBound)) {
                                throw new Error('Invalid age range');
                            }
                            return value;
                        }}
                        LowerBound={<InnerTextInput
                            type="number"
                            placeholder="#00"
                            defaultValue={defaultValue.AgeRange ? defaultValue.AgeRange.LowerBound : null}
                            onInput={onInput}
                        />}
                        UpperBound={<InnerTextInput
                            type="number"
                            placeholder="#00"
                            defaultValue={defaultValue.AgeRange ? defaultValue.AgeRange.UpperBound : null}
                            onInput={onInput}
                        />}
                    />
                </Parameter>}
            </div>

        </div>}</Map>}
    />;
}

export default CornflowerCampaignWizardTargettingStep;
