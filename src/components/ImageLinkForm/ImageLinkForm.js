import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return(
        <div>
            <p className="f3">
                This is the face detector
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input onChange={onInputChange} className="f4 pa2 w-70 center" type="tex" />
                    <button onClick={onSubmit} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer">Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;