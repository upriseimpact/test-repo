import React, { PureComponent } from 'react';
import { Source } from 'react-collectable';

require('./ImageUploadButton.scss');

class ImageUploadButton extends PureComponent {
    render() {
        return <Source value={() => {
            const image = this._uploadNode.files[0];
            if (!image) {
                return Promise.resolve(null);
            }
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    resolve(event.target.result);
                };
                reader.readAsDataURL(image);
            });
        }}>
            <div className="image-upload-button">
                <span className="_label">{this.props.name}</span>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={() => this.props.onInput()}
                        ref={node => this._uploadNode = node}
                    />
                </div>
            </div>
        </Source>;
    }
}

export default ImageUploadButton;
