import React, { useRef, useState,useCallback  } from "react";
import SignatureCanvas from 'react-signature-canvas'
import './SignPad.css';
import { useSiteContext } from "../../contexts/SiteProvider";
// npm i --save-dev @types/react-signature-canvas
const SignPad: React.FC = () => {
     
    const sigCanvas = useRef<SignatureCanvas>(null);
    const [sign,setSign]=useState('')
    const [webcamImg, setWebcamImg] = useState('');
    const { setLoading, openModal, closeModal } = useSiteContext();


    const clear = () => {
        sigCanvas.current?.clear();
        setSign('')
      };
    
      // Function to save the signature as an image
      const save = () => {
        // openConfirmModal();
        if (sigCanvas.current) {
          const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
          console.log(dataURL);
          setSign(dataURL)
          closeModal();
          
        }
      };
      const openConfirmModal = () => {
        let modelObject = {
          title: "",
          body: "Do you wish to save the Signature",
          okFunction: () => {
            save()
          },
          cancelFunction: () => {
            clear()
            closeModal();
            // console.log("cancel function")
          },
        };
        openModal(modelObject);
      };
  

    return(
        <div>
        <h2>Signature Canvas</h2>
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 500, height: 200, className: 'sigCanvas canvsMain'  }}
          ref={sigCanvas}
        />

      {sign && (
        <div>
          <h3>Your Signature:</h3>
          <img src={sign} alt="Signature"
        className= 'canvsMain'
          //  style={{ border: '1px solid black;border: 1px dashed;' }} 
           />
        </div>
      )}
        <div style={{ marginTop: '10px' }}>
          <button onClick={clear}>Clear</button>
          <button onClick={openConfirmModal}>Save</button>
        </div>
        {/* webcam */}
       
      </div>
    )
}

export default SignPad;