import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, faceBox}) => {
    let bounding = null;
    if (faceBox && faceBox.length) {
        bounding = faceBox.map((box, index) => {
            return (
                <div
                    key={index}
                    className="bounding-box"
                    style={{
                        top: box.topRow,
                        left: box.leftCol,
                        bottom: box.bottomRow,
                        right: box.rightCol
                    }}
                >
                </div>
            );
        });
    }
    return (
        <div className='center ma0'>
            <div className="mt2 absolute">
                <img id='inputImage'
                     src={imageUrl}
                     alt=""
                     width='500px'
                     height='auto'/>

                {bounding}
            </div>
        </div>
    );
};

export default FaceRecognition;