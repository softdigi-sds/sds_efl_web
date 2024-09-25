import React from 'react';
import './general.scss';
import { SmartTabsProps } from './SmartGeneralInterface';

const SmartTabs: React.FC<SmartTabsProps> = (props) => {
  const { tabs, tab, handleTabs } = props 
    return (
      <div className="tabs">
        <ul>
          {tabs && tabs.map((item: any, index: any) => {
            return (
              <li
                key={index}
                onClick={() => handleTabs(item.index)}
                className={
                  tab === item.index ? "smart-active-tab" : "smart-tab"
                }
              >
                <a href="#">
                  <span
                    className={
                      tab === item.index
                        ? "smart-active-tab-text pr-5 pl-5"
                        : "pr-5 pl-5"
                    }
                  >
                    {item.label}
                  </span>
                  <span className="icon ">
                    {item.image && (<img
                      className="image smart-tab-images"
                      src={item.image}
                      alt=""
                    />)}
                    {item.icon && (<i className={item.icon} aria-hidden="true"></i>)}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
}

export default SmartTabs
