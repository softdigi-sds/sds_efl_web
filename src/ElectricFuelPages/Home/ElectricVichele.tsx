import React from "react";
import { ELETRIC_HOME_ADVANTAGE } from "../../services/ImageService";

const ElectricVichele = () => {
  return (
    <div className="smart-electric-vaichele-cont p-3">
      <div className="container">
        <div className="columns is-vcentered is-multiline is-mobile">
          <div className="column is-12">
            <div className="smart-electric-fuel-vichele-con is-size-6-mobile is-size-5-tablet is-size-2-desktop">
              Merits of using an
              <div className="">
                <span className="eletric-home-page-words">
                  Electric Vehicle
                </span>
              </div>
            </div>
          </div>

  
          <div className="column is-12-mobile is-6-tablet is-4-desktop">
            <div className="smart-elecric-vichele-card">
              <h2 className="is-size-6-mobile is-size-5-tablet is-size-5-desktop">
                <span className="has-text-weight-bold">1</span> No fuel, no emissions
              </h2>
              <p className="is-size-7-mobile is-size-6-tablet">
                Reducing the carbon footprint is the need of the hour. The electric engine within an EV operates on a closed circuit, so it does not emit gases often associated with global warming.
              </p>
            </div>

            <div className="smart-elecric-vichele-card">
              <h2 className="is-size-6-mobile is-size-5-tablet is-size-5-desktop">
                <span className="has-text-weight-bold">2</span> Low maintenance
              </h2>
              <p className="is-size-7-mobile is-size-6-tablet">
                Electric vehicles don’t require expensive maintenance like fuel-run vehicles. Servicing is easy, less frequent, and overall cheaper.
              </p>
            </div>

            <div className="smart-elecric-vichele-card">
              <h2 className="is-size-6-mobile is-size-5-tablet is-size-5-desktop">
                <span className="has-text-weight-bold">3</span> Noise-free driving experience
              </h2>
              <p className="is-size-7-mobile is-size-6-tablet">
                The quietness of the vehicle creates a far more noise-free, comfortable, and relaxing driving experience.
              </p>
            </div>
          </div>

          <div className="column is-12-mobile is-6-tablet is-4-desktop">
            <div className="p-0">
              <img
                src={ELETRIC_HOME_ADVANTAGE}
                alt="Electric Vehicle Advantages"
                className="is-fullwidth"
              />
            </div>
          </div>

          <div className="column is-12-mobile is-6-tablet is-4-desktop">
            <div className="smart-elecric-vichele-card">
              <h2 className="is-size-6-mobile is-size-5-tablet is-size-5-desktop">
                <span className="has-text-weight-bold">4</span> Fast & convenient charging
              </h2>
              <p className="is-size-7-mobile is-size-6-tablet">
                EFL deploys ultrafast chargers at convenient locations to speed up the charging process.
              </p>
            </div>

            <div className="smart-elecric-vichele-card">
              <h2 className="is-size-6-mobile is-size-5-tablet is-size-5-desktop">
                <span className="has-text-weight-bold">5</span> Negligible running costs
              </h2>
              <p className="is-size-7-mobile is-size-6-tablet">
                The cost of electricity required to charge an EV is around 40% less than petrol for a similar-sized vehicle driving the same distance.
              </p>
            </div>

            <div className="smart-elecric-vichele-card">
              <h2 className="is-size-6-mobile is-size-5-tablet is-size-5-desktop">
                <span className="has-text-weight-bold">6</span> Freedom from rising fuel costs
              </h2>
              <p className="is-size-7-mobile is-size-6-tablet">
                With petrol and diesel prices at an all-time high, shifting to an EV saves from rising fuel costs. This makes EVs affordable in the long run!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricVichele;
