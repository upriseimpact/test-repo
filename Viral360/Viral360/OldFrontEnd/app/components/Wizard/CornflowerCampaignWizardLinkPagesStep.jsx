import React from 'react';
import { Map } from 'react-collectable';

import InnerFormFields from '../FormElements/InnerFormFields.jsx';
import { socialMediaEnum } from '../api-helper/index.jsx';
import CornflowerCampaignMain from './CornflowerCampaignMain.jsx';
import CornflowerCampaignPreview from '../PostPreview/CornflowerCampaignPreview.jsx';

import './CornflowerCampaignWizardLinkPagesStep.scss';
import CornflowerDropdown from '../FormElements/CornflowerDropdown.jsx';

export default function CornflowerCampaignWizardLinkPagesStep({ defaultValue, then, onBack, save, onExit }) {
    return <CornflowerCampaignMain
        wizardState={defaultValue}
        then={then}
        onBack={onBack}
        save={save}
        onExit={onExit}
        pageValue={1}
        auxiliary={(passedState) => <CornflowerCampaignPreview previewState={passedState}/>}
        form={(lastError, onInput) => <Map>{Parameter => <div className="cornflower-campaign-wizard-details-step">
            <div className="_form-section">
                <h4>Select which platforms you would like to launch this campaign on</h4>
                {<Parameter name="SelectPosts">
                    <InnerFormFields
                        filter={(value) => {
                            // must manually filter own values because of CornflowerDropdown's weird implementation
                            // avoid changing component because of dependacies elsewhere
                            // submit socialMediaId value or 0
                            // values which do not match with SocialMediaEnum definition are ignored (see api-helper/index.jsx near bottom)
                            // or equivalent to 0 value (no social media)
                            if (value.nameDoesNotMatterPost == 'Add Facebook Post') {
                                value.nameDoesNotMatterPost = socialMediaEnum.facebook;
                            }
                            if (value.post2 == 'Add Twitter Post') {
                                value.post2 = socialMediaEnum.twitter;
                            }
                            if (Object.values(value).filter(v => {
                                return v !== undefined;
                            }).length == 0) {
                                throw new Error("No Platforms Selected");
                            }
                            return value;
                        }}
                        nameDoesNotMatterPost={<CornflowerDropdown
                            placeholder="No Facebook Post"
                            onInput={onInput}
                            options={ [ 'Add Facebook Post' ] }
                            defaultValue={defaultValue.campaign.Posts.findIndex((p) => { return p.SocialMediaId == socialMediaEnum.facebook; }) != -1 ? 'Add Facebook Post' : null}
                        />}
                        /*
                        post2={<CornflowerDropdown
                            placeholder="No Twitter Post"
                            onInput={onInput}
                            options={ [ 'Add Twitter Post' ] }
                            defaultValue={defaultValue.campaign.Posts.findIndex((p) => { return p.SocialMediaId == socialMediaEnum.twitter; }) != -1 ? 'Add Twitter Post' : null}
                        />}
                        */
                    />
                </Parameter>}
                {lastError && lastError.errors && lastError.errors.SelectPosts ?
                    <div className="_error">
                        {lastError.errors.SelectPosts.message}
                    </div>
                    : null}
            </div>

        </div>}</Map>}
    />;
}
