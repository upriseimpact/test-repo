import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import MainForm from './MainForm.jsx';
import MainFormFields from './MainFormFields.jsx';
import TextInput from './TextInput.jsx';
import { requireText, requireEmail } from './Validations.js';

require('./SignupForm.scss');

class SignupForm extends PureComponent {
    _performSignup() {
        return new Promise(resolve => {
            return setTimeout(() => resolve(), 2000);
        });
    }

    render() {
        return <div className="signup-form">
            <h2 className="_title">
                Sign Up
            </h2>
            <MainForm
                action={formData => this._performSignup(formData)}
                then={() => this.props.onSignUp()}
                submitText="Sign up"
                errorText="Invalid email or password"
            >
                <MainFormFields
                    email={<TextInput
                        placeholder="Email Address"
                        name="Email"
                        type="text"
                        filter={requireEmail}
                    />}
                    password={<TextInput
                        placeholder="Password"
                        name="Password"
                        type="password"
                        filter={requireText}
                    />}
                    errorText="Required field"
                />
            </MainForm>
            <div className="_footer">
                Already a member?
                <Link to="/">
                    Log in
                </Link>
            </div>
        </div>;
    }
}

export default SignupForm;
