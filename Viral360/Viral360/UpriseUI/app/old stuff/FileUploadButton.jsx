import React, { PureComponent } from 'react';
import { Source } from 'react-collectable';
import Papa from 'papaparse';

class FileUploadButton extends PureComponent {
    render() {
        return <Source value={() => {
            const fileUpload = this._uploadNode.files[0];
            if (!fileUpload) {
                return Promise.resolve(null);
            }
            return new Promise((resolve) => {
                Papa.parse(fileUpload, {
                    header: true,
                    complete: function (results) {
                        resolve(results.data);
                    }
                });
            });
        }}>
            <div className="file-upload-button">
                <span className="_label">{this.props.name}</span>
                <div>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={() => this.props.onInput()}
                        ref={node => this._uploadNode = node}
                    />
                </div>
            </div>
        </Source>;
    }
}

export default FileUploadButton;
