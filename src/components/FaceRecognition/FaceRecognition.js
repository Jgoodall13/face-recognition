import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" src={imageUrl} alt="face" width="500px" height="auto" />
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
}

const boxStyle = {
    position: 'absolute',
    boxShadow: '0 0 0 3px #149df2 inset',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    cursor: 'pointer'
}

export default FaceRecognition;