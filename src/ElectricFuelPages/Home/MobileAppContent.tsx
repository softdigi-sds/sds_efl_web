import React from "react";
import {
  ELETRIC_HOME_APP_IMG,
  ELETRIC_HOME_APPLE,
  ELETRIC_HOME_GOOGLEPLAY,
} from "../../services/ImageService";

const MobileAppContent = () => {
  return (
    <div className="smart-eletric-mobile-content p-3">
      <div className="container">
        <div className="columns is-vcentered is-multiline is-mobile">
    
          <div className="column is-12-mobile is-6-tablet is-4-desktop">
            <div className="is-size-5-mobile is-size-2-desktop">
              <span className="eletric-home-page-words">
                Locate the {" "}
                <span>charging hubs on</span> {" "}
                <span>Mobile App</span>
              </span>
            </div>
            <div className="has-text-success is-size-5-mobile is-size-2-desktop">
              <span>Mobile App</span>
            </div>
            <p className="smart-electric-app-para is-size-7-mobile ">
              Plan your highway travel on an Electric vehicle while getting
              acquainted with the charging hubs along your route. EFL also
              provides a host of amenities and conveniences available at
              Charging Hubs for you to relax and refresh while your EV is
              getting charged.
            </p>
          </div>
          
     
          <div className="column is-12-mobile is-6-tablet is-4-desktop">
            <div className="is-fullwidth">
              <img src={ELETRIC_HOME_APP_IMG} alt="Mobile App" className="is-fullwidth" />
            </div>
          </div>
          
       
          <div className="column is-12-mobile is-6-tablet is-4-desktop">
            <div className="is-size-5-mobile is-size-2-desktop">
              <span className="eletric-home-page-words">
                Features of
                <div>Mobile App</div>
              </span>
            </div>
            <div className="is-size-7-mobile smart-electric-app-para-two">
              <ul>
                <li>Easy to locate our charging hubs & services on Google Map</li>
                <li>Facilitate services for Retail & Corporate Customers</li>
                <li>Payments made easy with our Payment Gateway</li>
              </ul>
              <h6>Download the EFL App Now</h6>
            </div>

    
            <div className="columns is-mobile is-centered p-5">
              <div className="column is-half">
                <img src={ELETRIC_HOME_GOOGLEPLAY} alt="Google Play" className="is-fullwidth" />
              </div>
              <div className="column is-half">
                <img src={ELETRIC_HOME_APPLE} alt="Apple Store" className="is-fullwidth" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppContent;
