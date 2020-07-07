import React from 'react';
import { Input } from 'react-collectable';

require('./InnerTextInput.scss');

function InnerTextInput({
    filter,
    type,
    name,
    defaultValue,
    onInput,
    placeholder
}) {
    return <span className="inner-text-input">
        <div className="_input-group">
            <span className="_name">{name}</span>
            <Input filter={filter}>
                {(type === 'textarea')
                    ? <textarea
                        name={name}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        onInput={onInput}
                    />
                    : <input
                        type={type || 'text'}
                        name={name}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        onInput={onInput}
                    />
                }
            </Input>
        </div>
    </span>;
}

export default InnerTextInput;
