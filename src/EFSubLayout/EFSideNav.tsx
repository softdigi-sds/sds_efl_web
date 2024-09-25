import React from 'react'
import SmartMultiSideNav from '../components/site/SmartMultiSideNav'
import { LOGO } from '../services/ImageService'

const EFSideNav = () => {
 
    const listItems = [
      
        {
            id: 1,
            label: "Dashboard",
            icon: <i className="fa fa-dashcube" aria-hidden="true"></i>,
            link: "/e-fuel/dashboard",
            
          },
        
        {
            id: 2,
            label: "Offices",
            icon: <i className="fa fa-cubes" aria-hidden="true"></i>,
            link: "/e-fuel/offices-list",
            
          },
          {
            id: 3,
            label: "Hubs",
            icon: <i className="fa fa-car" aria-hidden="true"></i>,
            link: "/vehicle-details-system",
            
          },
          {
            id: 4,
            label: "Vendors",
            icon: <i className="fa fa-bell-o" aria-hidden="true"></i>,
            link: "/notification",
            
          },
          {
            id: 5,
            label: "Vendor Rates",
            icon: <i className="fa fa-users" aria-hidden="true"></i>,
            link: "/user-management",
            
          },
          {
            id: 5,
            label: "Vehicles Report",
            icon: <i className="fa fa-users" aria-hidden="true"></i>,
            link: "/user-management",
            
          },
          {
            id: 6,
            label: "Consumption  Report",
            icon: <i className="fa fa-users" aria-hidden="true"></i>,
            link: "/user-management",
            
          },
          {
            id: 7,
            label: "Invoices",
            icon: <i className="fa fa-users" aria-hidden="true"></i>,
            link: "/user-management",
            
          },

          {
            id: 8,
            label: "Users",
            icon: <i className="fa fa-cogs" aria-hidden="true"></i>,
            link: "/site-settings",
            
          },
          {
            id: 8,
            label: "Roles",
            icon: <i className="fa fa-cogs" aria-hidden="true"></i>,
            link: "/site-settings",
            
          },
          {
            id: 8,
            label: "Site Settings",
            icon: <i className="fa fa-cogs" aria-hidden="true"></i>,
            link: "/site-settings",
            
          },
    ]
  return (
    <div>
       <SmartMultiSideNav listItems={listItems} logo={LOGO} ></SmartMultiSideNav>
    </div>
  )
}
export default EFSideNav
