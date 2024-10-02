import React from "react";
import { useNavigate } from "react-router-dom";
import { useSiteContext } from "../contexts/SiteProvider";
import { ADMIN_USER_LOGO } from "../services/ImageService";
import Notificaton from "../ElectricFuelPages/Notification/Notificaton";

interface HeaderProps {
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
}
const EFHeader: React.FC<HeaderProps> = ({ setIsOpen, isOpen }) => {
  const navigate = useNavigate();
  const basenav = "/";
  const { user, setUser, logout, setLoading } = useSiteContext();
  //console.log("user ", user);
  const navigateLink = (index: any) => {
    // navigate(basenav + "/" + index);
    navigate(basenav + index);
  };
  const handleLogout = () => {
    logout();
    navigateLink("");
  };

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

  return (
    <nav
      className="navbar is-transparent efl-main-nav"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
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
            <i className="fa fa-bars"></i>
          </a>
        </div>

        <div className="navbar-end">
          <div className=" navbar-item  mr-1 smart-elf-notification">
            <Notificaton />

            <div className="dropdown is-active" key="s2"></div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable ">
            <a className="navbar-link">
              {user?.ename}
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
              <a className="navbar-item" onClick={() => navigate("/e-fuel/profile")}>
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
