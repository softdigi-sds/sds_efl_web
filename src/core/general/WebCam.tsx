import React, { useRef, useState,useCallback  } from "react";
import Webcam from 'react-webcam';
// npm i --save-dev @types/react-signature-canvas
const WebCam: React.FC = () => {

   
    const webcamRef = useRef<Webcam>(null);
    const [webcamImg, setWebcamImg] = useState('');
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);


    const captureWebcamImage = useCallback(() => {
        if (webcamRef.current) {
          const imageSrc = webcamRef.current.getScreenshot();
          if (imageSrc) {
            setWebcamImg(imageSrc); // Save the webcam image to state
          }
        }
      }, [webcamRef]);

      const imageClear = () => {
        
        setWebcamImg('')
      };

    return(
        <>
         <div style={{ marginTop: '20px' }}>
         <h3>Webcam Capture</h3>
        {!isCameraEnabled && (
          <button onClick={() => setIsCameraEnabled(true)}>Live Camera</button>
        )}
        
        {isCameraEnabled && (
          <div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              width={500}
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: 'user'
              }}
            />
            <div style={{ marginTop: '10px' }}>
              <button onClick={captureWebcamImage}>Capture Image</button>
              <button onClick={() => setIsCameraEnabled(false)}>Disable Camera</button>
            </div>
          </div>
        )}

        {webcamImg && (
          <div>
            <h4>Captured Image:</h4>
            <img src={webcamImg} alt="Webcam Capture" style={{ border: '1px solid black' }} />
          </div>
        )}
        </div>
        </>
    )
}

export default WebCam;