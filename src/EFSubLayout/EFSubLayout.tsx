import React, { useState } from 'react'
import './EFSubLayout.css';
import EFSideNav from './EFSideNav';
import EFHeader from './EFHeader';
interface   childrenProps {
    children:any
  }
const EFSubLayout:React.FC<childrenProps> = (props) => {
    const{children} = props
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Toggle the state
      };
  return (
    <div>
    <div className='smart-ef-sub-layout-main-container'>
        <div><EFSideNav isOpen={isOpen}/></div>
        <div className=''>
          <div className={isOpen?"smart-ef-header-container-open":'smart-ef-header-container'}><EFHeader toggleSidebar={toggleSidebar} isOpen={isOpen}/></div>  
          <div className={isOpen?"smart-middle-container-open":'smart-middle-container'}>
            {children}
          </div>
        </div>
    </div>
    </div>
  )
}

export default EFSubLayout
