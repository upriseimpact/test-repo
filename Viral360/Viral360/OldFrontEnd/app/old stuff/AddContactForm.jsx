import React, { PureComponent } from 'react';
import { Status } from 'react-collectable';

import InnerFormFields from './InnerFormFields.jsx';
import InnerTextInput from './InnerTextInput.jsx';
import RadioInputGroup from './RadioInputGroup.jsx';
import Dropdown from './Dropdown.jsx';

import { requireText, requireEmail } from './Validations.js';

class AddContactForm extends PureComponent {
    render() {
        return <div className="add-contact-form">
            <Status>{(formError) => <InnerFormFields
                socialMedia={<Dropdown
                    name="Social Media"
                    options={ [ 'Facebook', 'Google Plus', 'Instagram', 'LinkedIn', 'Snapchat' ] }
                    filter={requireText}
                />}
                title={<InnerTextInput
                    name="Email"
                    type="text"
                    filter={requireEmail}
                />}
                firstName={<InnerTextInput
                    name="First Name"
                    type="text"
                    filter={requireText}
                />}
                lastName={<InnerTextInput
                    name="Last Name"
                    type="text"
                    filter={requireText}
                />}
                age={<InnerTextInput
                    name="Age"
                    type="text"
                    filter={requireText}
                />}
                country={<InnerTextInput
                    name="Country"
                    type="text"
                    filter={requireText}
                />}
                province={<InnerTextInput
                    name="Province"
                    type="text"
                    filter={requireText}
                />}
                city={<InnerTextInput
                    name="City"
                    type="text"
                    filter={requireText}
                />}
                gender={<RadioInputGroup
                    name="Gender"
                    options={ [ 'Female', 'Male', 'Both' ] }
                    filter={requireText}
                />}
                lastError={formError}
                errorText="Required field"
            />}</Status>
        </div>;
    }
}

export default AddContactForm;
