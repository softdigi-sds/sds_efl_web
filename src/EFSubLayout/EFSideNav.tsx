import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGO } from "../services/ImageService";
import { useSiteContext } from "../contexts/SiteProvider";
import { checkInterSection } from "../services/core/FilterService";
interface childrenProps {
  isOpen: boolean;
}
const EFSideNav: React.FC<childrenProps> = ({ isOpen }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const listItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: "fa-tachometer",
      link: "/e-fuel/dashboard",
      roles: ["ADMIN"],
    },

    {
      id: 2,
      label: "Offices",
      icon: " fa-building",
      link: "/e-fuel/offices-list",
      roles: ["ADMIN"],
    },
    {
      id: 3,
      label: "Hubs",
      icon: "fa-battery-full",
      link: "/e-fuel/hubs-list",
      roles: ["ADMIN"],
    },
    {
      id: 4,
      label: "Vendors",
      icon: "fa-sticky-note-o",
      link: "/e-fuel/vendors-list",
      roles: ["ADMIN"],
    },
    {
      id: 5,
      label: "Vendor Rates",
      icon: "fa fa-flag",
      link: "/e-fuel/vendors-rates-list",
      roles: ["ADMIN", "ACCOUNTS"],
    },
    {
      id: 5,
      label: "Vehicles Report",
      icon: "fa-car",
      link: "/e-fuel/vehicles-report",
      roles: ["ADMIN", "HUB", "ACCOUNTS"],
    },
    {
      id: 6,
      label: "Consumption  Report",
      icon: "fa-calendar-check-o",
      link: "/e-fuel/consumption-report",
      roles: ["ADMIN", "HUB", "ACCOUNTS"],
    },
    {
      id: 7,
      label: "Invoices",
      icon: "fa-inr",
      link: "/e-fuel/invoices",
      roles: ["ADMIN", "HUB", "ACCOUNTS"],
    },

    {
      id: 8,
      label: "Users",
      icon: "fa-user",
      link: "/e-fuel/users",
      roles: ["ADMIN"],
    },
    {
      id: 8,
      label: "Roles",
      icon: " fa-users",
      link: "/e-fuel/roles-list",
      roles: ["ADMIN"],
    },
    {
      id: 8,
      label: "Meter Reading",
      icon: "fa-cogs",
      link: "/e-fuel/meter-reading",
      roles: ["ADMIN"],
    },
    {
      id: 8,
      label: "MIS Reports",
      icon: "fa-inr",
      link: "/e-fuel/msi-reports",
      roles: ["ADMIN"],
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSiteContext();
  console.log("logged in user ", user);
  const navigateLink = (index: any) => {
    navigate(index);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      //setActive(false); // Close the dropdown when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`smart-sidenav ${isOpen ? "expanded" : ""}`}>
      {/* Brand Logo */}
      <div className="brand-logo">
        <img src={LOGO} alt="Brand Logo" />
      </div>
      {listItems.map((item, index) => {
        return (
          checkInterSection(user.roles || [], item.roles) && (
            <a
              key={`nav_link_${index}`}
              href="#"
              onClick={() => navigateLink(item.link)}
              className={
                location.pathname === item.link
                  ? "sidenav-link active-link"
                  : "sidenav-link"
              }
            >
              <i className={`icon fa ${item.icon} `}></i>
              <span className="link-text">{item.label}</span>
            </a>
          )
        );
      })}
    </div>
  );
};
export default EFSideNav;
