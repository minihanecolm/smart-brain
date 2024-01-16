import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
        {box.map((face, index) => (
          <div
            key= {index}
            className='bounding-box'
           style={{
                  top: face.topp,
                  right: face.rightt,
                  bottom: face.bottonn,
                  left: face.leftt
                }}

          ></div>
        ))}
      </div>
    </div>
  );
}

export default FaceRecognition;