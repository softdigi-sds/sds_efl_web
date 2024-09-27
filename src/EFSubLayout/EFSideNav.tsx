import React from 'react';
interface childrenProps {
  isOpen: boolean
}
const EFSideNav: React.FC<childrenProps> = ({ isOpen }) => {

  const listItems = [
    {
      id: 1,
      label: "Dashboard",
      icon:"fa-dashcube",
      link: "/e-fuel/dashboard",

    },

    {
      id: 2,
      label: "Offices",
      icon:"fa-cubes",
      link: "/e-fuel/offices-list",

    },
    {
      id: 3,
      label: "Hubs",
      icon:"fa-cubes",
      link: "/e-fuel/hubs-list",

    },
    {
      id: 4,
      label: "Vendors",
      icon:"fa-cubes",
      link: "/e-fuel/vendors-list",

    },
    {
      id: 5,
      label: "Vendor Rates",
      icon:"fa-cubes",
      link: "/e-fuel/vendors-rates-list",

    },
    {
      id: 5,
      label: "Vehicles Report",
      icon:"fa-cubes",
      link: "/e-fuel/vehicles-report",

    },
    {
      id: 6,
      label: "Consumption  Report",
      icon:"fa-cubes",
      link: "/e-fuel/consumption-report",

    },
    {
      id: 7,
      label: "Invoices",
      icon:"fa-cubes",
      link: "/e-fuel/invoices",

    },

    {
      id: 8,
      label: "Users",
      icon:"fa-cubes",
      link: "/e-fuel/users",

    },
    {
      id: 8,
      label: "Roles",
      icon:"fa-cubes",
      link: "/e-fuel/roles-list",

    },
    {
      id: 8,
      label: "Site Settings",
      icon:"fa-cubes",
      link: "/e-fuel/settings",

    },
  ]
  return (
    <div
      className={`smart-sidenav ${isOpen ? "expanded" : ""}`}
    >
       {/* Brand Logo */}
       <div className="brand-logo">
        <img src={""} alt="Brand Logo" />
      </div>
      {listItems.map((item,index)=>{
        return ( 
        <a href="#" className="sidenav-link">
         <i className={`icon fa ${item.icon}`}></i>
        <span className="link-text">{item.label}</span>
      </a>
        )
      })}    
    </div>
  );
}
export default EFSideNav
