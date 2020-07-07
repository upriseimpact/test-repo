import React from 'react';
import { Input } from 'react-collectable';

require('./TextInput.scss');

function TextInput({
    filter,
    type,
    name,
    placeholder
}) {
    return <label className="text-input">
        <div>
            <Input filter={filter}>
                <input
                    type={type || 'text'}
                    name={name}
                    placeholder={placeholder}
                />
            </Input>
        </div>
    </label>;
}

export default TextInput;
