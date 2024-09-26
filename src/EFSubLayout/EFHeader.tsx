import React from 'react'
import { LOGO } from '../services/ImageService';
import './EFSubLayout.css';


interface HeaderProps {
  toggleSidebar: () => void;  
  isOpen:boolean
}
const EFHeader:React.FC<HeaderProps> = ({toggleSidebar,isOpen}) => {
  return (
    <div>
    <div className='columns'>
    {isOpen&&<div className='column is-3' >
       <figure className="image  smart-el-header-icon-image">
              <img className="smart-side-nav-logo" src={LOGO} alt="" />
            </figure>
       </div>}
       <div className='column is-1' >
      <div  className='header-close-icon pointer'><i className="fa fa-bars" aria-hidden="true"></i></div> 
       </div>
     
       <div className='column ' >
       <i className="fa fa-bell has-text-right" aria-hidden="true"></i>
   </div>
    </div>
       </div>
  )
}

export default EFHeader
