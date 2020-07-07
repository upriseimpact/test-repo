/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import { Map } from 'react-collectable';

import CornflowerCampaignPreview from '../PostPreview/CornflowerCampaignPreview.jsx';
import CornflowerCampaignMain from './CornflowerCampaignMain.jsx';

import * as apiHelper from '../api-helper/index.jsx';

import './CornflowerCampaignWizardReviewStep.scss';

function CornflowerCampaignWizardReviewStep({ defaultValue, then, onBack, save, onExit }) {
    return <CornflowerCampaignMain
        wizardState={defaultValue}
        then={then}
        onBack={onBack}
        save={save}
        onExit={onExit}
        pageValue={3}
        auxiliary={(passedState) => <CornflowerCampaignPreview previewState={passedState}/>}
        form={(lastError, onInput) => <div className="cornflower-campaign-wizard-review-step">
            <div className="preview">
                <div className="_title">Details Preview</div>
                <div className="_subtitle">
                    Campaign Title
                    <p>{defaultValue.campaign.CampaignTitle}</p>
                </div>
                
                <div className="_subtitle">
                    Platforms
                    <div className="_tag-container">
                        {defaultValue.campaign && defaultValue.campaign.Posts.map((p) => {
                            return <div key={p.SocialMediaId} className="_tags">
                                {apiHelper.socialMediaInfo(p.SocialMediaId).iconComponent}
                            </div>
                        })}
                    </div>
                </div>
            </div>
            <div className="preview">
                <div className="_title">Target Preview</div>
                <div className="_subtitle">
                    Industry Tags (optional)
                    <div className="_tag-container">
                        {defaultValue.campaign && defaultValue.campaign.IndustryTags.map((element) => (
                            <div key={element} className="_tags">
                                {element}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="_subtitle">
                    {/*'Location (optional)'*/}
                    <div className="_tag-container">
                        {/*Object.values(defaultValue.CampaignLocation).map((element) => (
                            <div key={element} className="_tags">
                                {element}
                            </div>
                        ))*/}
                    </div>
                </div>
                
                <div className="_subtitle">
                    Age (optional)
                    {defaultValue.campaign && defaultValue.campaign.AgeRange ?
                        <div className="_tag-container">
                            <div className="_tags">
                                {defaultValue.campaign.AgeRange.LowerBound.toString() + '-' + defaultValue.campaign.AgeRange.UpperBound.toString()}
                            </div>
                        </div>
                        :
                        null}
                </div>
                
            </div>
        </div>}
    />;
}

export default CornflowerCampaignWizardReviewStep;
