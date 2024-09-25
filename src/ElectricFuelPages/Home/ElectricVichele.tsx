import React from "react";
import { ELETRIC_HOME_ADVANTAGE } from "../../services/ImageService";

const ElectricVichele = () => {
  return (
    <>
      <div className="smart-electric-vaichele-cont">
        <div className="container">
          <div className="row">
            <div className="smart-electric-fuel-vichele-con">
              Merits of using an
              <div className="">
                <span className="eletric-home-page-words">
                  Electric Vehicle
                </span>
              </div>
            </div>
            <div className="columns">
              <div className="column is-4">
                <div className="smart-elecric-vichele-card">
                  <h2 className="is-size-5">
                    <span className="">1</span>
                    No fuel, no emissions
                  </h2>
                  <p className="is-size-6">
                    Reducing the carbon footprint is the need of the hour. The
                    electric engine within an EV operates on a closed circuit,
                    so an electric vehicle does not emit any of the gases often
                    associated with global warming.
                  </p>
                </div>
                <div className="smart-elecric-vichele-card">
                  <h2 className="is-size-5">
                    <span>2</span>
                    Low maintenance
                  </h2>
                  <p className="is-size-6">
                    Electric vehicles don’t require any expensive maintenance
                    like the fuel-run vehicles. Servicing is easy, less frequent
                    and overall cheaper.
                  </p>
                </div>
                <div className="smart-elecric-vichele-card">
                  <h2 className="is-size-5">
                    <span>3</span>
                    Noise-free driving experience
                  </h2>
                  <p className="is-size-6">
                    The quietness of the vehicle creates a far more noise-free,
                    comfortable & relaxing driving experience.
                  </p>
                </div>
              </div>
              <div className="column is-4">
                <div className="">
                  <img src={ELETRIC_HOME_ADVANTAGE} alt="" />
                </div>
              </div>
              <div className="column is-4">
                <div className="smart-elecric-vichele-card">
                <h2 className="is-size-5">
                    <span>4</span>
                    Fast & convenient charging
                  </h2>
                  <p className="is-size-6">
                    EFL deploys ultrafast chargers at convenient locations to
                    speed up the charging process.
                  </p>
                </div>
                <div className="smart-elecric-vichele-card">
                <h2 className="is-size-5">
                    <span>5</span>
                    Negligible running costs
                  </h2>
                  <p className="is-size-6">
                    The cost of the electricity required to charge an EV is
                    around 40% less than the cost to use petrol for a similar
                    sized vehicle driving the same distance.
                  </p>
                </div>
                <div className="smart-elecric-vichele-card">
                <h2 className="is-size-5">
                    <span>6</span>
                    Freedom from rising fuel costs
                  </h2>
                  <p className="is-size-6">
                    With petrol and diesel prices at an all time high, shifting
                    to an EV saves us from the rising fuel costs. This makes
                    EV’s affordable in the long run too!
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

export default ElectricVichele;
