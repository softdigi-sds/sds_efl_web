import React, { useRef, useState } from "react";
import SignatureCanvas from 'react-signature-canvas';
import './SignPad.css';
import { useSiteContext } from "../../contexts/SiteProvider";

interface SignPadProps {
  onSave?: (signature: string) => void;
}

const SignPad: React.FC<SignPadProps> = ({ onSave }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [sign, setSign] = useState('');
  const { setLoading, openModal, closeModal } = useSiteContext();

  const clear = () => {
    sigCanvas.current?.clear();
    setSign('');
  };

  const save = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      setSign(dataURL);

      // Use the onSave prop if provided
      if (onSave) {
        onSave(dataURL);
      }

      closeModal();
    }
  };

  const openConfirmModal = () => {
    const modelObject = {
      title: "",
      body: "Do you wish to save the Signature?",
      okFunction: save,
      cancelFunction: () => {
        clear();
        closeModal();
      },
    };
    openModal(modelObject);
  };

  return (
    <div>
      <h2>Signature</h2>
      <SignatureCanvas
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas canvsMain' }}
        ref={sigCanvas}
      />

      {sign && (
        <div>
          <h3>Your Signature:</h3>
          <img
            src={sign}
            alt="Signature"
            className='canvsMain'
          />
        </div>
      )}

      <div style={{ marginTop: '10px' }}>
        <button onClick={clear}>Clear</button>
        <button onClick={openConfirmModal}>Save</button>
      </div>
    </div>
  );
};

export default SignPad;
