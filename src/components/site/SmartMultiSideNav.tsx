// import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SmartMultiSideNav.css";
import { ReactElement } from "react";
export interface  SideNavProps {
    listItems:any[]
    logo?:any|ReactElement;
  }



const SmartMultiSideNav: React.FC<SideNavProps> = (props) => {
  const { listItems, logo } = props;
  console.log(listItems)

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (link: string) => {
    navigate(link);
  };

  return (
    <>
      <div className="smart-side-nav-menu">
        {logo && (
          <div className="smart-side-nav-menu-logo-box ">
            <figure className="image my-3">
              <img className="smart-side-nav-logo" src={logo} alt="" />
            </figure>
          </div>
        )}
        <ul className="smart-menu-list">
          {listItems &&
            listItems.map((item: any, key: number) => (
              <li
                key={key}
                onClick={() => handleNavigation(item?.link)}
                className={
                  location.pathname === item.link
                    ? "smart-list-item-active"
                    : "smart-list-items "
                }
              >
                <span className="is-flex">
                  {item.icon && (
                    <span className="icon is-size-6">{item.icon}</span>
                  )}
                  {item.label && (
                    <span className="is-size-7 mt-1">{item.label}</span>
                  )}
                </span>
                {item.children && (
                  <li>
                    <ul className="first-smart-sub-menu">
                      {item.children.map((subItem: any, subKey: number) => (
                        <li
                          key={subKey}
                          onClick={() => handleNavigation(subItem.link)}
                          className={
                            location.pathname === subItem.link
                              ? "smart-sub-menu-item-active"
                              : "smart-sub-menu-items"
                          }
                        >
                             {subItem.icon && (
                            <span className="is-size-7 mx-1">{subItem.icon}</span>
                          )}
                          {subItem.label && (
                            <span className="is-size-7">{subItem.label}</span>
                          )}


{subItem.subChildren && (
                  <li>
                    <ul className="second-smart-sub-menu">
                      {subItem.subChildren.map((subItem: any, subKey: number) => (
                      
                        <li
                          key={subKey}
                          onClick={() => handleNavigation(subItem.link)}
                          className={
                            location.pathname === subItem.link
                              ? "smart-sub-children-menu-item-active"
                              : "smart-sub-children-menu-items"
                          }
                        >
                             {subItem.icon && (
                            <span className="is-size-7 mx-1">{subItem.icon}</span>
                          )}
                          {subItem.label && (
                            <span className="is-size-7">{subItem.label}</span>
                          )}

{subItem.Children && (
                  <li>
                    <ul className="third-smart-sub-menu">
                      {subItem.Children.map((subItem: any, subKey: number) => (
                      
                        <li
                          key={subKey}
                          onClick={() => handleNavigation(subItem.link)}
                          className={
                            location.pathname === subItem.link
                              ? "smart-sub-third-menu-item-active"
                              : "smart-sub-third-menu-items"
                          }
                        >
                             {subItem.icon && (
                            <span className="is-size-7 mx-1">{subItem.icon}</span>
                          )}
                          {subItem.label && (
                            <span className="is-size-7">{subItem.label}</span>
                          )}
                          
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                          
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                          
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default SmartMultiSideNav;
