import React from "react";
import { ELETRIC_HOME_CMS_PLATEFORM } from "../../services/ImageService";

const CmsPlateForm = () => {
  return (
    <div className="smart-eletric-mobile-content">
      <div className="container">
        <div className="row">
          <div className="columns">
            <div className="column is-5">
              <div className="is-size-4">
                <span className="eletric-home-page-words">
                  Cloud based CMS platform
                </span>
              </div>
              <p className="m-0 mt-3">
                Cloud based Central Management System (CMS), is a platform for
                centralized monitoring and operations. This system will not only
                ensure the highest levels of Charger quality and service
                availability, but also connect customers to our Charging network
                for seamless Authentication, Authorization and Payment process
                in a full automated mode.
              </p>
              <div className="mt-3">
                <p>We are a full scale CMS Platform</p>
              </div>
            </div>
            <div className="column is-7">
              <div className="p-0">
                <img src={ELETRIC_HOME_CMS_PLATEFORM} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmsPlateForm;
