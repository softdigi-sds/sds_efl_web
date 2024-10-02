import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGO } from '../services/ImageService';
interface childrenProps {
  isOpen: boolean
}
const EFSideNav: React.FC<childrenProps> = ({ isOpen }) => {

  const listItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: "fa-tachometer",
      link: "/e-fuel/dashboard",

    },

    {
      id: 2,
      label: "Offices",
      icon: " fa-building",
      link: "/e-fuel/offices-list",

    },
    {
      id: 3,
      label: "Hubs",
      icon: "fa-battery-full",
      link: "/e-fuel/hubs-list",

    },
    {
      id: 4,
      label: "Vendors",
      icon: "fa-sticky-note-o",
      link: "/e-fuel/vendors-list",

    },
    {
      id: 5,
      label: "Vendor Rates",
      icon: "fa fa-flag",
      link: "/e-fuel/vendors-rates-list",

    },
    {
      id: 5,
      label: "Vehicles Report",
      icon: "fa-car",
      link: "/e-fuel/vehicles-report",

    },
    {
      id: 6,
      label: "Consumption  Report",
      icon: "fa-calendar-check-o",
      link: "/e-fuel/consumption-report",

    },
    {
      id: 7,
      label: "Invoices",
      icon: "fa-inr",
      link: "/e-fuel/invoices",

    },

    {
      id: 8,
      label: "Users",
      icon: "fa-user",
      link: "/e-fuel/users",

    },
    {
      id: 8,
      label: "Roles",
      icon: " fa-users",
      link: "/e-fuel/roles-list",

    },
    // {
    //   id: 8,
    //   label: "Site Settings",
    //   icon: "fa-cogs",
    //   link: "/e-fuel/settings",

    // },
  ]
  const navigate = useNavigate();
  const location = useLocation();
  const navigateLink = (index: any) => {   
    navigate(index);
  };


  return (
    <div
      className={`smart-sidenav ${isOpen ? "expanded" : ""}`}
    >
      {/* Brand Logo */}
      <div className="brand-logo">
        <img src={LOGO} alt="Brand Logo" />
      </div>
      {listItems.map((item, index) => {
        return (
          <a key={`nav_link_${index}`} href="#" onClick={()=>navigateLink(item.link)} 
          className={  location.pathname === item.link?"sidenav-active-link":"sidenav-link"}>
            <i className={`icon fa ${item.icon} `}></i>
            <span className="link-text">{item.label}</span>
          </a>
        )
      })}
    </div>
  );
}
export default EFSideNav
