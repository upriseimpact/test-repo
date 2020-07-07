import React, { PureComponent } from 'react';
import { Source } from 'react-collectable';

//import csv from 'csv';

require('./FileUploadButton.scss');

function readAdvocateCSV(fullText) {
    // assumed form of csv?
    // entries delimited by \n (elements of array), elements delimited by , (entries in object)
    // first line details object keys, remaining lines detail object values
    var subText = fullText.split('\n');
    var arr = [];
    var keys = subText[0].split(',').map(s => s.trim());
    for (var i = 1; i < subText.length; i++) {
        var atomText = subText[i].split(',').map(s => s.trim());
        var entry = {};
        for (var j = 0; j < keys.length; j++) {
            entry[keys[j]] = atomText[j]
        }
        arr.push(entry);
    }
    return arr;
    return fullText.split('\n').map((line) => {
        return line.split(',');
    });
}

export default class FileUploadButton extends PureComponent {
    render() {
        return <Source value={() => {
            const file = this._uploadNode.files[0];
            if (!file) {
                return Promise.resolve({
                    'file': null,
                    'object': null
                });
            }
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    resolve({
                        'file': file,
                        'object': readAdvocateCSV(event.target.result)
                    });
                };
                reader.readAsText(file);
            });
        }}>
            <div className="file-upload-button">
                <input
                    type="file"
                    id="fileInput"
                    accept=".csv"
                    onChange={() => this.props.onInput()}
                    ref={node => this._uploadNode = node}
                />
                <label htmlFor="fileInput"
                    onClick={(e) => {
                        null;
                    }}>
                    Upload .csv
                </label>
            </div>
        </Source>;
    }
}
