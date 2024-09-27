import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteContext } from '../contexts/SiteProvider';



interface HeaderProps {
  setIsOpen: (open:boolean) => void;
  isOpen: boolean
}
const EFHeader: React.FC<HeaderProps> = ({ setIsOpen, isOpen }) => {
  const navigate = useNavigate();
  const basenav = "/";
  const { user, setUser, logout, setLoading } = useSiteContext();
  console.log("user " , user);
  const navigateLink = (index: any) => {
    // navigate(basenav + "/" + index);
    navigate(basenav + index);
  };
  const handleLogout = () => {
    logout();
    navigateLink("")
  };

  const HeaderProfile = () => {

    return (
      <>
        <div className="ml-3 profile-button-dropdown dropdown   is-hoverable  pb-0 mt-1 mb-1 ">
          <button className=" crop-business-laytout-top-button is-flex profile-hi-message-hover ">
            <div className="business-profile-image  ">
            </div>
            <div className="has-text-weight-bold ml-2 mt-1 is-flex ">
              <div>Hi Admin</div>
              <i className="fa fa-sort-desc ml-1 is-size-6 " aria-hidden="true"></i>
            </div>
          </button>
          <div className="dropdown-menu smart-header-dropdown-menu mr-6">
            <div className=" dropdown-content-profile pb-3 ">
              <div className="dropdown-item p-0">
                <div className="columns mb-0">


                </div>



                <div className="mt-3" key="g9">
                  <ul className=" has-text-center profile-business-icon-page px-2">
                    <li
                      className="smart-header-dropdown-list pointer"
                      onClick={() => navigateLink("home/my-profile-form")}
                    >
                      <span className="customer-home-icon-text-color">
                        <i
                          className="fa fa-user-circle-o"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <span>My Profile</span>
                    </li>

                    <li
                      className="smart-header-dropdown-list pointer"
                      onClick={() => navigateLink("settings/pin-change-form")}
                    >
                      <span className="customer-home-icon-text-color">
                        <i className="fa fa-cog" aria-hidden="true"></i>
                      </span>
                      <span>Settings</span>
                    </li>
                    <li
                      className="smart-header-dropdown-list pointer"
                      onClick={handleLogout}
                    >
                      <span className="customer-home-icon-text-color">
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                      </span>
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
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
    <nav className="navbar is-transparent efl-main-nav" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a onClick={()=>setIsOpen(!isOpen)}className="navbar-item">
            <i className='fa fa-bars'></i>
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable ">
            <a className="navbar-link">
                {user?.ename}
            </a>

            <div className="navbar-dropdown is-right">
              <a className="navbar-item">
                <span className='icon mr-1'>
                  <i className='fa fa-user-circle-o'></i>
                </span> Profile
              </a>
              <hr className="navbar-divider" />
              <a className="navbar-item">
                <span className='icon mr-1'>
                  <i className='fa fa-sign-out'></i>
                </span>                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )


}

export default EFHeader
