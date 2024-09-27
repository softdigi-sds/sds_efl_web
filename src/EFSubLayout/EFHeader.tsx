import React from 'react'
import { LOGO } from '../services/ImageService';
import './EFSubLayout.css';
import { useNavigate } from 'react-router-dom';
import { useSiteContext } from '../contexts/SiteProvider';


interface HeaderProps {
  toggleSidebar: () => void;  
  isOpen:boolean
}
const EFHeader:React.FC<HeaderProps> = ({toggleSidebar,isOpen}) => {
  const navigate = useNavigate();
  const basenav = "/";
  const { user, setUser, logout, setLoading } = useSiteContext();
    const navigateLink = (index:any) => {
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
              {/* <SmartImageDisplay
                srcType="DATA"
                // url={img_url}
                data={user?.profile_image}
                // imageClass="is-48x48  is-rounded pointer"
                // default_img={ADMIN_USER_LOGO}
              /> */}
            </div>
            <div className="has-text-weight-bold ml-2 mt-1 is-flex ">
              <div>Hi Admin</div>
              <i className="fa fa-sort-desc ml-1 is-size-6 " aria-hidden="true"></i>
            </div>
          </button>
          {/*         
          <img
            src={BUSSINESS_HEAD_TOP_RIGHT_lOGO}
            alt="Business Head Top Right Logo"
          /> */}
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

  
  return (
    <div>
    <div className='column is-flex is-justify-content-space-between'>
    {isOpen&&<div className='' >
       <figure className="image  smart-el-header-icon-image">
              <img className="smart-side-nav-logo" src={LOGO} alt="" />
            </figure>
       </div>}
       <div className='is-flex' >
      <div  className='header-close-icon pointer mt-1 is-size-4'><i className="fa fa-bars" aria-hidden="true"></i></div> 
     <p className='smart-top-header-title'>Electric Fuel</p> 
       </div>
     
       <div className=' ' >
      {HeaderProfile()}
   </div>
   
    </div>
       </div>
  )
}

export default EFHeader
