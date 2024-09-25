import React, { useState } from 'react'
import './EFSubLayout.css';
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
    
    </div>
  )
}

export default EFSubLayout
