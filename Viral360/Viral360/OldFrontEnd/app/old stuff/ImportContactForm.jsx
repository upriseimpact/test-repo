import React from 'react';
import { Preview } from 'react-collectable';

import InnerFormFields from './InnerFormFields.jsx';
import FileUploadButton from './FileUploadButton.jsx';
// import { requireText } from './Validations.js';

import './ImportContactForm.scss';

function ImportContactForm() {
    return <Preview>{(lastValue, requestPrefetch) => <div className="import-contact-form">
        <InnerFormFields
            filter={(data) => data.fileUpload}
            fileUpload={<FileUploadButton
                name="File"
                buttonText="Browse"
                statusText="No file selected"
                onInput={() => requestPrefetch()}
            />}
        />

        {lastValue &&
            <div className="_preview">
                <table>
                    <thead>
                        <tr>
                            {Object.keys(lastValue[0]).map((key, index) =>
                                <th key={index}>{key}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {lastValue.map((row, rowIndex) =>
                            (rowIndex < 10
                                ? <tr key={rowIndex}>
                                    {Object.keys(row).map((key, keyIndex) =>
                                        <td key={keyIndex}>{row[key]}</td>
                                    )}
                                </tr>
                                : null
                            )
                        )}
                    </tbody>
                </table>
            </div>
        }
    </div>}</Preview>;
}

export default ImportContactForm;
