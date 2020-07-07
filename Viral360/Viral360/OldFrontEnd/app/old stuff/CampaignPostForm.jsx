import React from 'react';

import InnerFormFields from './InnerFormFields.jsx';
import InnerTextInput from './InnerTextInput.jsx';
import ImageUploadButton from './ImageUploadButton.jsx';
import { requireText } from './Validations.js';

function CampaignPostForm({ onInput, defaultValue, lastError }) {
    return <div className="campaign-post-form">
        <InnerFormFields
            title={<InnerTextInput
                name="Title"
                type="text"
                defaultValue={defaultValue.title}
                filter={requireText}
                onInput={onInput}
            />}
            text={<InnerTextInput
                name="Text"
                type="text"
                defaultValue={defaultValue.text}
                onInput={onInput}
                filter={requireText}
            />}
            imageUpload={<ImageUploadButton
                name="Image"
                buttonText="Browse"
                statusText="No file selected"
                defaultValue={defaultValue.imageUpload}
                onInput={onInput}
            />}
            lastError={lastError}
            errorText="Required field"
        />
    </div>;
}

export default CampaignPostForm;
