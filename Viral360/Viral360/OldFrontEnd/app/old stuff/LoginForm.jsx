import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import MainForm from './MainForm.jsx';
import MainFormFields from './MainFormFields.jsx';
import TextInput from './TextInput.jsx';
import { requireText, requireEmail } from './Validations.js';

require('./LoginForm.scss');

class LoginForm extends PureComponent {
    _performLogin() {
        return new Promise(resolve => {
            return setTimeout(() => resolve(), 2000);
        });
    }

    render() {
        return <div className="login-form">
            <h2 className="_title">
                Welcome to
                <span>Uprise</span>
            </h2>
            <MainForm
                action={formData => this._performLogin(formData)}
                then={() => this.props.onLogIn()}
                submitText="Login"
                errorText="Invalid email or password"
            >
                <MainFormFields
                    email={<TextInput
                        name="Email"
                        type="text"
                        filter={requireEmail}
                    />}
                    password={<TextInput
                        name="Password"
                        type="password"
                        filter={requireText}
                    />}
                    errorText="Required field"
                />
            </MainForm>
            <div className="_footer">
                Not in the community yet?
                <Link to="/sign-up">
                    Join the movement
                </Link>
            </div>
        </div>;
    }
}

export default LoginForm;
