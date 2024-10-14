import React, { useState } from "react";


interface NavbarLink {
  label: string;
  href?: string;
  dropdown?: NavbarLink[];
  className?: string;
}

const navbarLinks: NavbarLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About us",
    dropdown: [
      { label: "Company Profile", href: "/company-profile" },
      { label: "Vision & Mission", href: "/vision-mission" },
      { label: "Management", href: "/management" },
      { label: "What We Do", href: "/what-we-do" },
      { label: "EV Station Network (Map)", href: "/ev-network" },
      { label: "How to Charge @EV (Pic/Video)", href: "/how-to-charge" },
    ],
  },
  {
    label: "Services",
    dropdown: [
      { label: "EV Charging Stations", href: "/ev-charging-stations" },
      { label: "Fleet Electrification", href: "/fleet-electrification" },
      { label: "Fleet Management", href: "/fleet-management" },
      { label: "Corporate Charging Hubs", href: "/corporate-charging-hubs" },
      { label: "Residential Communities", href: "/residential-communities" },
      { label: "Highway Charging", href: "/highway-charging" },
    ],
  },
  { label: "About Technology", href: "/about-technology" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact-us" },
];

const HeaderNavBar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar is-white" role="navigation" aria-label="main navigation">
      <div className="container">
        {/* Mobile burger toggle */}
        <div className="navbar-brand">
          <a
            role="button"
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMenu"
            onClick={toggleNavbar}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        {/* Navbar Menu */}
        <div id="navbarMenu" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start">
            {navbarLinks.map((link, index) => (
              <div key={index} className={`navbar-item ${link.dropdown ? "is-hoverable" : ""}`}>
                <a className="navbar-hover-green" href={link.href || "#"}>
                  {link.label}
                  {link.dropdown && (
                    <i
                      className="fa fa-angle-down"
                      style={{ marginLeft: "5px" }}
                      aria-hidden="true"
                    ></i>
                  )}
                </a>
                {link.dropdown && (
                  <div className="navbar-dropdown has-text-centered">
                    {link.dropdown.map((dropdownLink, idx) => (
                      <a key={idx} href={dropdownLink.href} className="navbar-item">
                        {dropdownLink.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default HeaderNavBar;