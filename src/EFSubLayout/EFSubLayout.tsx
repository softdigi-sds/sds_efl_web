import React, { useState } from "react";
import EFHeader from "./EFHeader";
import EFSideNav from "./EFSideNav";
import "./EFSubLayout.scss";
interface childrenProps {
  children: any;
}
const EFSubLayout: React.FC<childrenProps> = (props) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the state
  };
  // return (
  //   <div>
  //     <div className='smart-ef-sub-layout-main-container'>
  //       <div><EFSideNav isOpen={isOpen} /></div>
  //       <div className=''>
  //         <div className={isOpen ? "smart-ef-header-container-open" : 'smart-ef-header-container'}>
  //           <EFHeader toggleSidebar={toggleSidebar} isOpen={isOpen} /></div>
  //         <div className={isOpen ? "smart-middle-container-open" : 'smart-middle-container'}>
  //           {children}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
  return (
    <div className="container is-fluid smart-efl-container">
      <div className="efl-main-sidenav">
        <EFSideNav isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className={`efl-main-header ${isOpen ? "expanded" : ""}`}>
        <EFHeader setIsOpen={(value) => setIsOpen(value)} isOpen={isOpen} />
      </div>
      <div className={`efl-main-div ${isOpen ? "expanded" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default EFSubLayout;
