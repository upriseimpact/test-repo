import React from 'react';

import InnerFormFields from './InnerFormFields.jsx';
import InnerTextInput from './InnerTextInput.jsx';
import Dropdown from './Dropdown.jsx';
import RadioInputGroup from './RadioInputGroup.jsx';
import { requireText } from './Validations.js';

function CampaignDetails({ onInput, defaultValue, lastError }) {
    return <div className="campaign-details">
        <InnerFormFields
            campaignTitle={<InnerTextInput
                name="Campaign Title"
                type="text"
                defaultValue={defaultValue.campaignTitle}
                onInput={onInput}
                filter={requireText}
            />}
            socialMediaId={<RadioInputGroup
                name="Social Media"
                options={ [ 'Facebook', 'LinkedIn' ] }
                defaultValue={defaultValue.socialMediaId}
                filter={requireText}
                onInput={onInput}
            />}
            industry={<Dropdown
                name="Industry"
                options={ [ 'Fashion', 'Food', 'Healthcare', 'Insurance', 'Travel' ] }
                defaultValue={defaultValue.industry}
                onInput={onInput}
                filter={requireText}
            />}
            city={<InnerTextInput
                name="City"
                type="text"
                defaultValue={defaultValue.city}
                onInput={onInput}
                filter={requireText}
            />}
            gender={<RadioInputGroup
                name="Gender"
                options={ [ 'Female', 'Male', 'Both' ] }
                defaultValue={defaultValue.gender}
                onInput={onInput}
                filter={requireText}
            />}
            message={<InnerTextInput
                name="Message"
                type="text"
                defaultValue={defaultValue.message}
                onInput={onInput}
                filter={requireText}
            />}
            lastError={lastError}
            errorText="Required field"
        />
    </div>;
}

export default CampaignDetails;
