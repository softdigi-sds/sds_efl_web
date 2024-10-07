import React from "react";
import { ELETRIC_HOME_CMS_PLATEFORM } from "../../services/ImageService";

const CmsPlateForm = () => {
  return (
    <div className="smart-eletric-mobile-content p-3">
      <div className="container">
        <div className="columns is-vcentered is-multiline is-mobile">
        
          <div className="column is-12-mobile is-6-tablet is-5-desktop">
            <div className="is-size-5-mobile is-size-4-desktop is-size-3">
              <span className="eletric-home-page-words">
                Cloud-based CMS platform
              </span>
            </div>
            <p className="m-0 mt-3 is-size-7-mobile is-size-6-tablet">
              Cloud based Central Management System (CMS), is a platform for
              centralized monitoring and operations. This system will not only
              ensure the highest levels of Charger quality and service
              availability, but also connect customers to our Charging network
              for seamless Authentication, Authorization and Payment processes
              in a fully automated mode.
            </p>
            <div className="mt-3 is-size-7-mobile is-size-6-tablet">
              <p>We are a full-scale CMS Platform.</p>
            </div>
          </div>

       
          <div className="column is-12-mobile is-6-tablet is-7-desktop">
            <div className="p-0">
              <img
                src={ELETRIC_HOME_CMS_PLATEFORM}
                alt="CMS Platform"
                className="is-fullwidth"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmsPlateForm;
