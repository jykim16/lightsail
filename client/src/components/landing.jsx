import React from 'react';
import Webcam from 'react-webcam';

const Landing = (props) => {
  var cam;
  var setRef = (webcam) => {
    cam = webcam;
  }

  return (
    <span>
      <h1>Celebrity Dopplegangers</h1>
      <div>Take a picture here and find your celebrity doppleganger!</div>
      <Webcam
        audio={false}
        height={350}
        ref={setRef}
        screenshotFormat="image/jpeg"
        width={350}
      />
    <button onClick={()=>{props.capture(cam)}}>Capture photo</button>
    </span>
  );
};

export default Landing;
