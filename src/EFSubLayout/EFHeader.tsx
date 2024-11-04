import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSiteContext } from "../contexts/SiteProvider";
import { ADMIN_USER_LOGO, LOGO } from "../services/ImageService";
import Notificaton from "../ElectricFuelPages/Notification/Notificaton";

interface HeaderProps {
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
}
const EFHeader: React.FC<HeaderProps> = ({ setIsOpen, isOpen }) => {
  const navigate = useNavigate();
  const basenav = "/";
  const { user, setUser, logout, setLoading } = useSiteContext();
  const [mobileScreen, setMobileScreen] = useState<boolean>(
    window.innerWidth <= 768
  );
  //console.log("user ", user);
  const navigateLink = (index: any) => {
    // navigate(basenav + "/" + index);
    navigate(basenav + index);
  };
  const handleLogout = () => {
    logout();
    navigateLink("");
  };
  useEffect(() => {
    const handleResize = () => {
      setMobileScreen(window.innerWidth <= 768);
     
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    
  }, []);
  useEffect(() =>{
    if(window.innerWidth <= 768){
      setIsOpen(false);
      // console.log("Mobile Screen")
    }
  },[mobileScreen])

  // return (
  //   <div>
  //     <div className='column is-flex is-justify-content-space-between'>
  //       {isOpen && <div className='' >
  //         <figure className="image  smart-el-header-icon-image">
  //           <img className="smart-side-nav-logo" src={LOGO} alt="" />
  //         </figure>
  //       </div>}
  //       <div className='is-flex' >
  //         <div className='header-close-icon pointer mt-1 is-size-4'><i className="fa fa-bars" aria-hidden="true"></i></div>
  //         <p className='smart-top-header-title'>Electric Fuel</p>
  //       </div>

  //       <div className=' ' >
  //         {HeaderProfile()}
  //       </div>

  //     </div>
  //   </div>
  // )

  const MobileSideOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav
      className="navbar is-transparent efl-main-nav"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
      <div className="header-brand-logo is-hidden-desktop">
        <img src={LOGO} alt="Brand Logo" />
      </div>
        <a
          role="button"
          className="navbar-burger has-text-white"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => MobileSideOpen()}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a onClick={() => setIsOpen(!isOpen)} className="navbar-item">
            <i className="fa fa-bars has-text-white"></i>
          </a>
        </div>

        <div className="navbar-end">
          <div className=" navbar-item  mr-1 smart-elf-notification">
            <Notificaton />

            <div className="dropdown is-active" key="s2"></div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable ">
            <a className="navbar-link">
             <span className="has-text-white mr-2">
             {user?.ename}
              </span>
              <img
                src={ADMIN_USER_LOGO}
                alt=""
                className="is-64x64 is-rounded with-out-pointer"
              />
            </a>
            {/* <SmartImageDisplay
                        srcType="DATA"
                        imageClass="is-64x64 is-rounded with-out-pointer"
                        default_img={ADMIN_USER_LOGO}
                      /> */}

            <div className="navbar-dropdown is-right">
              <a
                className="navbar-item"
                onClick={() => navigate("/e-fuel/profile")}
              >
                <span className="icon mr-1">
                  <i className="fa fa-user-circle-o"></i>
                </span>{" "}
                Profile
              </a>
              <hr className="navbar-divider" />
              <a onClick={() => handleLogout()} className="navbar-item">
                <span className="icon mr-1">
                  <i className="fa fa-sign-out"></i>
                </span>{" "}
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EFHeader;
