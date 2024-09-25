import React from 'react'
import QRCode from 'react-qr-code';
import { SmartQRCodeProps } from './SmartGeneralInterface';

const SmartQrCode:React.FC<SmartQRCodeProps> = (props) => {

  const{data,QRsize}=props
  return (
    <div >
   
      <QRCode
       value={data}
       size={QRsize?QRsize:200} 
       fgColor="#000" 
       bgColor="#fff"
       />
    
       
    </div>
 
 

  )
}

export default SmartQrCode
