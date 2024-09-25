import React from 'react'
import SmartMultiSideNav from '../components/site/SmartMultiSideNav'

const EFSideNav = () => {
 
    const listItems = [
      
        {
            id: 1,
            label: "Dashboard",
            icon: <i className="fa fa-dashcube" aria-hidden="true"></i>,
            link: "/dashboard",
            
          },
        
        {
            id: 2,
            label: "Device Management",
            icon: <i className="fa fa-cubes" aria-hidden="true"></i>,
            link: "/device-management",
            
          },
          {
            id: 3,
            label: "Vehicle Details System",
            icon: <i className="fa fa-car" aria-hidden="true"></i>,
            link: "/vehicle-details-system",
            
          },
        //   {
        //     id: 4,
        //     label: "Alerts & Notifications",
        //     icon: <i className="fa fa-bell-o" aria-hidden="true"></i>,
        //     link: "/notification",
            
        //   },
          {
            id: 5,
            label: "User Management",
            icon: <i className="fa fa-users" aria-hidden="true"></i>,
            link: "/user-management",
            
          },
          {
            id: 6,
            label: "Site Settings",
            icon: <i className="fa fa-cogs" aria-hidden="true"></i>,
            link: "/site-settings",
            
          },
    ]
  return (
    <div>
       <SmartMultiSideNav listItems={listItems}></SmartMultiSideNav>
    </div>
  )
}
export default EFSideNav
