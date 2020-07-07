import React from 'react';
import { Input } from 'react-collectable';

require('./TextInput.scss');

function TextInput({
    filter,
    type,
    name
}) {
    return <label className="text-input">
        <div>
            <span>{name}</span>
            <Input filter={filter}>
                <input
                    type={type || 'text'}
                    name={name}
                />
            </Input>
        </div>
    </label>;
}

export default TextInput;
