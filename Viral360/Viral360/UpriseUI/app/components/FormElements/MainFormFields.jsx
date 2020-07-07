import React from 'react';
import { Map, Status } from 'react-collectable';

require('./MainFormFields.scss');

function MainFormFields(props) {
    // enumerate field names (ignoring the reserved errorText prop)
    const fieldNameList = Object.keys(props).filter(
        name => (name !== 'errorText')
    );

    return <Map>{Parameter =>
        <ul className="main-form-fields">
            {fieldNameList.map(fieldName => {
                const fieldBlock = props[fieldName];

                return <li key={fieldName}>
                    {<Parameter name={fieldName}><Status>{error =>
                        <label>
                            {fieldBlock}
                            {error
                                ? <span className="_error-message">
                                    {props.errorText
                                        ? typeof props.errorText === 'function'
                                            ? props.errorText(error)
                                            : props.errorText
                                        : 'Invalid input'
                                    }
                                </span>
                                : null
                            }
                        </label>
                    }</Status></Parameter>}
                </li>;
            })}
        </ul>
    }</Map>;
}

export default MainFormFields;
