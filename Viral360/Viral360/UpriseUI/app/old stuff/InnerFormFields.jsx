import React from 'react';
import { Map } from 'react-collectable';

require('./InnerFormFields.scss');

function InnerFormFields(props) {
    // enumerate field names (ignoring the reserved errorText prop)
    const fieldNameList = Object.keys(props).filter(
        name => (name !== 'errorText' && name !== 'lastError' && name !== 'filter')
    );

    const errorMap = props.lastError && props.lastError.name === 'MapError'
        ? props.lastError.errors
        : {};

    return <Map filter={props.filter}>{Parameter =>
        <ul className="inner-form-fields">
            {fieldNameList.map(fieldName => {
                const fieldBlock = props[fieldName];
                const error = errorMap[fieldName];

                return <li key={fieldName}>
                    {<Parameter name={fieldName}>
                        <span>
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
                        </span>
                    </Parameter>}
                </li>;
            })}
        </ul>
    }</Map>;
}

export default InnerFormFields;
