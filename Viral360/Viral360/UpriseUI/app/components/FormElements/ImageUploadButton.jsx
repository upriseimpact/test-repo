import React, { PureComponent } from 'react';
import { Source } from 'react-collectable';

require('./FileUploadButton.scss');

class ImageUploadButton extends PureComponent {
    // accepts onINput from form and init value (has value -> true)
    // return null -> input selected null or value removed
    // return value if input is used
    // return 0 if no action
    constructor(props) {
        super(props);

        this.state = {
            inInitState: true,
            uploadState: props.init
        }
    }
    render() {
        const { onInput, pageKey } = this.props;
        return <Source value={() => {
            const image = this._uploadNode.files[0];
            if (this.state.inInitState == true) {
                return Promise.resolve(0);
            }
            if (!image || this.state.uploadState == false) {
                return Promise.resolve({
                    'file': null,
                    'url': ''
                });
            }
            return new Promise((resolve) => {
                // backend wants raw image file
                const reader = new FileReader();
                reader.onload = (event) => {
                    resolve({
                        'file': image,
                        'url': event.target.result
                    });
                };
                reader.readAsDataURL(image);
            });
        }}>
            <div className="file-upload-button" >
                <input
                    type="file"
                    id={"fileInput" + pageKey}
                    accept="video/*,image/*"
                    onChange={() => this.props.onInput()}
                    ref={node => this._uploadNode = node}
                    onClick={(e) => {
                        if (this.state.uploadState == false) {
                            e.preventDefault();
                            if (onInput) onInput();
                        }
                    }}
                />
                <label
                    onClick={(e) => {
                        this.setState({ inInitState: false, uploadState: false });
                    }}
                    htmlFor={"fileInput" + pageKey}
                    hidden={!this.state.uploadState}>
                    Remove Media
                </label>
                
                <label
                    onClick={(e) => {
                        this.setState({ inInitState: false, uploadState: true });
                    }}
                    htmlFor={"fileInput" + pageKey}
                    hidden={this.state.uploadState}>
                    Upload Media
                </label>
            </div>
        </Source>;
    }
}

export default ImageUploadButton;
