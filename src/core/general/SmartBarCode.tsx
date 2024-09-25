import React from 'react'
import Barcode from 'react-barcode'
import { SmartBarCOdeProps } from './SmartGeneralInterface';

const SmartBarCode:React.FC<SmartBarCOdeProps> = (props) => {
  const {value,height} =props
  return (
    <div>
    <Barcode value={value} 
    width= {2}
    height={height ? height:100}
    // format= "CODE128"
    displayValue={ true }
    textAlign= "center"
    textPosition= "bottom"
    textMargin= {2}
    fontSize={ 20}
    background= "#ffffff"
    lineColor= "#000000"
    margin= {10}
    // className={ undefined}
    
    />
</div>
  )
}

export default SmartBarCode
