import React from "react";
import { ELETRIC_HOME_LEAVES } from "../../services/ImageService";

const OurMissions = () => {
  return (
    <>
      <div className="smart-electric-our-mission">
        <div className="container">
          <div className="row">
            <div className="columns">
              <div className="column is-4">
                <div className="has-text-weight-bold">Our mission</div>
                <div className="">
                  <p className="pt-3 has-text-white">
                    To provide the most efficient, innovative, and customer
                    friendly clean environment solutions for a better living.
                    It's our endeavor to promote the adoption of green
                    technology and contribute to the growth of society by
                    providing sustainable energy solutions.
                  </p>
                </div>
              </div>
              <div className="column is-3">
                <div className="mt-5">
                  <img src={ELETRIC_HOME_LEAVES} alt="" />
                </div>
              </div>
              <div className="column is-5">
                <div className="has-text-weight-bold">
                  Why choose an Electric Vehicle ?
                </div>
                <div className="">
                  <p className="pt-3 has-text-white">
                    Electric vehicles are one of the fastest growing modes of
                    transport in the present day scenario around the globe,
                    across multiple vehicle types, such as bikes, cars, transit
                    buses, and many more to come.
                  </p>
                  <p className="pt-3 has-text-white">
                    The emission rate of electric vehicles is zero, which
                    enables the restoration of greenhouse gases by keeping the
                    pollution under check.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurMissions;
