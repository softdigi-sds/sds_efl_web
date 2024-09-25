import React from "react";
import { ELETRIC_HOME_APP_IMG, ELETRIC_HOME_APPLE, ELETRIC_HOME_GOOGLEPLAY } from "../../services/ImageService";

const MobileAppContent = () => {
  return (
    <div className="smart-eletric-mobile-content">
      <div className="container">
        <div className="row">

       
      <div className="columns">
        <div className="column is-4">
          <div className="is-size-1">
              <span className="eletric-home-page-words">
                Locate the
                <div className="">charging hubs on</div>
                <div className="">Mobile App</div>
              </span>
          </div>
          <div className="has-text-success is-size-2 ">
            <h2>Mobile App</h2>
          </div>
          <p className="smart-electric-app-para m-0 is-size-6">
            Plan your highway travel on an Electric vehicle while getting
            acquainted with the charging Hubs along your route. EFL also
            provides a host of amenities and conveniences available at Charging
            Hubs for you to relax and refresh while your EV is getting charged.
          </p>
        </div>
        <div className="column is-4">
          <div className="">
            <img src={ELETRIC_HOME_APP_IMG} alt="" />
          </div>
        </div>

        <div className="column is-4">
          <div className="is-size-1">
              <span className="eletric-home-page-words">
              Features of
                <div className="">Mobile App</div>
              </span>
          </div>
          <div className=" m-0 is-size-5 smart-electric-app-para-two">
            <ul>
              <li>Easy to locate our charging hubs & services on Google Map</li>
              <li>Facilitate services for Retail & Corporate Customers</li>
              <li>Payments made easy with our Payment Gateway</li>
            </ul>
            <h6 className="m-0">Download the EFL App Now</h6>
          </div>
          <div className="columns p-5">
            <div className="column is-5">
              <div className="">
                <img src={ELETRIC_HOME_GOOGLEPLAY} alt="" />
              </div>
            </div>
            <div className="column is-5">
              <div className="">
                <img src={ELETRIC_HOME_APPLE} alt="" />
              </div>
            </div>
          </div>
        </div>
       
      </div>
      </div>
      </div>
    </div>
  );
};

export default MobileAppContent;
