import React from 'react';
import { Map } from 'react-collectable';

import InnerFormFields from '../FormElements/InnerFormFields.jsx';
import InnerTextInput from '../FormElements/InnerTextInput.jsx';
import ImageUploadButton from '../FormElements/ImageUploadButton.jsx';
import CornflowerCampaignDatePicker from '../FormElements/CornflowerCampaignDatePicker.jsx';
import CornflowerCampaignMain from './CornflowerCampaignMain.jsx';
import CornflowerCampaignPreview from '../PostPreview/CornflowerCampaignPreview.jsx';
import * as apiHelper from '../api-helper/index.jsx';

import './CornflowerCampaignWizardDetailsStep.scss';

import imagePreview from '../../assets/uprise-logo-left.png';

// @todo validations will depend on platforms already selected
// @todo use lastError
export default function CornflowerCampaignWizardDetailsStep({ defaultValue, then, onBack, save, onExit }) {
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
                <h4>Name this campaign</h4>
                {<Parameter name="CampaignTitle">
                    <InnerTextInput
                        type="text"
                        filter={(value) => {
                            // if error is thrown addMedia does not exist
                            // therefore wizard-helper must account for 
                            // an undefined formState.addMedia 
                            // because addMedia is a nested object
                            if (value == '') {
                                throw new Error('Campaign title is manditory');
                            }
                            return value;
                        }}
                        placeholder={defaultValue.distributor.FullName + '\'s Campaign'}
                        defaultValue={defaultValue ? defaultValue.campaign.CampaignTitle : null}
                        onInput={onInput}
                    />
                </Parameter>}
                {lastError && lastError.errors && lastError.errors.CampaignTitle ?
                    <div className="_error">
                        {lastError.errors.CampaignTitle.message}
                    </div>
                    : null}
            </div>
            
            <div className="_form-section">
                <h4>Select launch date for the campaign</h4>
                <div className="_date-input">
                    {<Parameter name="LaunchDate">
                        <CornflowerCampaignDatePicker
                            defaultValue={defaultValue ? defaultValue.campaign.LaunchDate.split("T")[0] : null}
                            onInput={onInput}
                        />
                    </Parameter>}
                </div>
                {lastError && lastError.errors && lastError.errors.LaunchDate ?
                    <div className="_error">
                        {lastError.errors.LaunchDate.message}
                    </div>
                    : null}
            </div>

            <div className="_form-section">
                <h4>Select expiration date for the campaign</h4>
                <div className="_date-input">
                    {<Parameter name="TargetDate">
                        <CornflowerCampaignDatePicker
                            defaultValue={defaultValue ? defaultValue.campaign.TargetDate.split("T")[0] : null}
                            onInput={onInput}
                        />
                    </Parameter>}
                </div>
                {lastError && lastError.errors && lastError.errors.TargetDate ?
                    <div className="_error">
                        {lastError.errors.TargetDate.message}
                    </div>
                    : null}
            </div>
            {/*
            // BACKEND DOES NOT ACCEPT THIS PARAMETER YET
            <div className="_form-section">
                <h4>Add organisation logo</h4>
                <p>This image will display with your company information for this campaign</p>
                {<Parameter name="distributor">
                    <InnerFormFields
                        filter={(value) => {
                            // if companylogoUrl is 0 (no action taken) use previously uploaded image
                            // else assigned value is real (null or *image)
                            if (value.LogoUrl == 0 && defaultValue.hasOwnProperty("distributor")) {
                                value.LogoUrl = defaultValue.distributor.LogoUrl;
                            }
                            return value;
                        }}
                        companyLogoUrl={<ImageUploadButton
                            init={defaultValue.hasOwnProperty("distributor") && defaultValue.distributor.LogoUrl}
                            onInput={onInput}
                            pagekey={0}
                        />}
                    />
                </Parameter>}
            </div>
            */}

            <div className="_form-section">
                <h4>Add an Incentive for your campaign</h4>
                {<Parameter name="IncentiveText">
                    {<InnerTextInput
                        type="textarea"
                        placeholder="Graditude!"
                        defaultValue={defaultValue.campaign.Incentive? defaultValue.campaign.Incentive.RawText : null}
                        onInput={onInput}
                    />}
                </Parameter>}
            </div>

            <div className="_form-section">
                <h4>Add campaign message</h4>
                <p>Describe your campaign or a call to action for your followers</p>
                {<Parameter name="DistributorMessage">
                    {<InnerTextInput
                        type="textarea"
                        placeholder="We need your help!"
                        defaultValue={defaultValue.campaign.DistributorMessage? defaultValue.campaign.DistributorMessage : null}
                        onInput={onInput}
                    />}
                </Parameter>}
            </div>
            <div className="_form-section">
                <h4>Add post media</h4>
                <p>You can select between uploading a video/image and/or adding a link</p>
                {<Parameter name="addMedia">
                    <InnerFormFields
                        filter={(value) => {
                            // split imageUpload button into self and imageLink
                            value.imageLink = value.imageUpload.url;
                            value.imageUpload = value.imageUpload.file;
                            // then treat as normal

                            
                            if (!(value.imageUpload) && !(defaultValue.hasOwnProperty("addMedia"))) {
                                throw new Error('At this time posts require a media upload')
                            }
                            if (value.imageUpload && (value.imageUpload.length * 3/4 - 1) / 1000 > 1000) {
                                if (defaultValue.addMedia) defaultValue.addMedia.imageUpload = null;
                                throw new Error('File too big. (current 1mb max)');
                            }
                            // if imageUpload is 0 (no action taken) use previously uploaded image
                            // else assigned value is real (null or *image)
                            if (value.imageUpload == 0 && defaultValue.hasOwnProperty("addMedia")) {
                                value.imageUpload = defaultValue.addMedia.imageUpload;
                            }

                            // if link and no image, generate image in collect
                            // for now use placeholders
                            if (value.externalLink !== '') {
                                value.linkTitle = ''; //"(Submit this page to generate link preview)";
                                value.linkSubtitle = "";
                            }
                            return value;
                        }}
                        imageUpload={<ImageUploadButton
                            init={defaultValue.campaign.Posts.length > 0 ? defaultValue.campaign.Posts[0].imageUpload : null} // all posts share 1 image
                            onInput={onInput}
                            pageKey={1}
                        />}
                        externalLink={<InnerTextInput
                            type="text"
                            placeholder="https://www.website.com/example"
                            defaultValue={defaultValue.campaign.Posts.length > 0 ? defaultValue.campaign.Posts[0].Link : null} // all posts share 1 link atm
                            onInput={onInput}
                        />}
                    />
                </Parameter>}
                {lastError && lastError.errors && lastError.errors.addMedia ?
                    <div className="_error">
                        {lastError.errors.addMedia.message}
                    </div>
                    : null}
                
            </div>

            <div className="_form-section">
                <h4>Post Text</h4>
                {defaultValue.campaign.Posts.length == 0 ? <p>No platforms selected</p> : null}
                {defaultValue.campaign.Posts.map((post) => {
                    return <Parameter 
                        key= {"descriptionParameter" + post.SocialMediaId}
                        name={"postDescription_" + post.SocialMediaId}>
                        <InnerFormFields
                            key= {"descriptionFormField" + post.SocialMediaId}
                            filter={(value) => {
                                if (post.SocialMediaId == apiHelper.socialMediaEnum.twitter) {
                                    if (value.text.length > 280) {
                                        // test this
                                        //throw new Error('Twitter description too big. (280 char max)');
                                    }
                                }
                                return value;
                            }}
                            text={<InnerTextInput
                                type="textarea"
                                placeholder={"Add " + apiHelper.socialMediaInfo(post.SocialMediaId).name + " post text..."}
                                defaultValue={post.PostMessage}
                                onInput={onInput}
                            />}
                        />
                    </Parameter>
                })}
            </div>

        </div>}</Map>}
    />;
}
