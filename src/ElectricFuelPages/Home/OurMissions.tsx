import React from "react";
import { ELETRIC_HOME_LEAVES } from "../../services/ImageService";

const OurMissions = () => {
  return (
    <div className="smart-electric-our-mission p-3">
      <div className="container">
        <div className="columns is-vcentered is-multiline is-mobile">
    
          <div className="column is-12-mobile is-6-tablet is-4-desktop">
            <div className="has-text-weight-bold is-size-5-mobile is-size-4-tablet is-size-4-desktop">
              Our Mission
            </div>
            <div className="">
              <p className="pt-3 has-text-white is-size-7-mobile is-size-6-tablet">
                To provide the most efficient, innovative, and customer-friendly
                clean environment solutions for a better living. It's our
                endeavor to promote the adoption of green technology and
                contribute to the growth of society by providing sustainable
                energy solutions.
              </p>
            </div>
          </div>

      
          <div className="column is-12-mobile is-6-tablet is-3-desktop">
            <div className="mt-5">
              <img src={ELETRIC_HOME_LEAVES} alt="Leaves" className="is-fullwidth" />
            </div>
          </div>

     
          <div className="column is-12-mobile is-12-tablet is-5-desktop">
            <div className="has-text-weight-bold is-size-5-mobile is-size-4-tablet is-size-4-desktop">
              Why choose an Electric Vehicle?
            </div>
            <div className="">
              <p className="pt-3 has-text-white is-size-7-mobile is-size-6-tablet">
                Electric vehicles are one of the fastest growing modes of
                transport globally, across multiple vehicle types such as bikes,
                cars, transit buses, and many more to come.
              </p>
              <p className="pt-3 has-text-white is-size-7-mobile is-size-6-tablet">
                The emission rate of electric vehicles is zero, which helps
                restore the balance of greenhouse gases by keeping pollution in
                check.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMissions;
