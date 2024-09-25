import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./general.scss";
import { SideNavProps } from './SmartGeneralInterface';

const TopNav:React.FC<SideNavProps> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleNavigation = (link: string) => {
      navigate(link);
    };
    const{listItems}=props
  return (
    <div className='smart-top-nav-container'>
    <div className='columns is-multiline'>
       
        <div className='column '>
        <ul className="smart-top-menu-list">
          {listItems &&
            listItems.map((item: any, key: number) => (
              <li
                key={key}
                onClick={() => handleNavigation(item?.link)}
                className={
                  location.pathname === item.link
                    ? "smart-top-list-item-active"
                    : "smart-top-list-items "
                }
              >
                <span className="is-flex">
                 {item.icon && <span className="icon is-size-6 mx-1">{item.icon}</span>}
                {item.label&&  <span className="is-size-7 mt-1">{item.label}</span>}
                </span>

                {item.children && 
                <div className='smart-top-first-menu-list-container'>

             
                  <ul className="smart-top-first-menu-list ">
          {item.children &&
            item.children.map((item: any, key: number) => (
              <li
                key={key}
                onClick={() => handleNavigation(item?.link)}
                className={
                  location.pathname === item.link
                    ? "smart-top-first-list-item-active"
                    : "smart-top-first-list-items "
                }
              >
                <span className="is-flex">
                 {item.icon && <span className="icon is-size-6 mx-1">{item.icon}</span>}
                {item.label&&  <span className="is-size-7 mt-1">{item.label}</span>}
                </span>

                
                {item.subChildren && 
                <div className='smart-top-sec-menu-list-container'>

             
                  <ul className="smart-top-sec-menu-list ">
          {item.subChildren &&
            item.subChildren.map((item: any, key: number) => (
              <li
                key={key}
                onClick={() => handleNavigation(item?.link)}
                className={
                  location.pathname === item.link
                    ? "smart-top-sec-list-item-active"
                    : "smart-top-sec-list-items "
                }
              >
                <span className="is-flex">
                 {item.icon && <span className="icon is-size-6 mx-1">{item.icon}</span>}
                {item.label&&  <span className="is-size-7 mt-1">{item.label}</span>}
                </span>
              </li>
            ))}
        </ul>
        </div>}
              </li>
            ))}
        </ul>
        </div>}
              </li>
            ))}
        </ul>
        </div>
        
    </div>
    </div>
  )
}

export default TopNav
