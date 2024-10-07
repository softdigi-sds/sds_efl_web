import Aos from "aos";
import { useEffect } from "react";
import "../../ElectricFuelPages/ElectricFuel.scss";
import {
  OUR_SERVICE_CARD_FIVE,
  OUR_SERVICE_CARD_FOUR,
  OUR_SERVICE_CARD_ONE,
  OUR_SERVICE_CARD_SIX,
  OUR_SERVICE_CARD_THREE,
  OUR_SERVICE_CARD_TWO,
} from "../../services/ImageService";

const OurServices = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <div className="our-services-container">
      <p className="our-services-header-text has-text-centered-mobile">
        Our <span>Services</span>
      </p>
      <div className="columns is-multiline">
        <div className="column is-12-mobile is-6-tablet is-4-desktop">
          <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
            <div className="our-services-card-body">
              <div className="images">
                <img
                  src={OUR_SERVICE_CARD_ONE}
                  alt="EV Charging Stations"
                  className="is-fullwidth"
                />
              </div>
              <div className="our-services-card-header">
                EV Charging Stations
              </div>
              <div className="our-services-card-header-bar"></div>
              <div className="our-services-card-content">
                As a leading Service provider, EFL offers a highly versatile
                portfolio that includes slow and ultra fast chargers of AC & DC
                for all kinds of EV's.
              </div>
            </div>
          </div>
        </div>

        <div className="column is-12-mobile is-6-tablet is-4-desktop">
          <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
            <div className="our-services-card-body">
              <div className="images">
                <img
                  src={OUR_SERVICE_CARD_TWO}
                  alt="Corporate Charging Hubs"
                  className="is-fullwidth"
                />
              </div>
              <div className="our-services-card-header">
                Corporate Charging Hubs
              </div>
              <div className="our-services-card-header-bar"></div>
              <div className="our-services-card-content">
                We provide Corporate Charging Hubs to B2B companies who are
                serving e-commerce businesses for last mile delivery of products
                within the city.
              </div>
            </div>
          </div>
        </div>

        <div className="column is-12-mobile is-6-tablet is-4-desktop">
          <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
            <div className="our-services-card-body">
              <div className="images">
                <img
                  src={OUR_SERVICE_CARD_THREE}
                  alt="Highway Charging"
                  className="is-fullwidth"
                />
              </div>
              <div className="our-services-card-header">Highway Charging</div>
              <div className="our-services-card-header-bar"></div>
              <div className="our-services-card-content">
                We offer ultra fast charging to Electric vehicles along major
                highway routes. Heavy-duty EV trucks require intelligent
                high-power charging infrastructure.
              </div>
            </div>
          </div>
        </div>

        <div className="column is-12-mobile is-6-tablet is-4-desktop">
          <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
            <div className="our-services-card-body">
              <div className="images">
                <img
                  src={OUR_SERVICE_CARD_FOUR}
                  alt="Fleet Electrification"
                  className="is-fullwidth"
                />
              </div>
              <div className="our-services-card-header">
                Fleet Electrification
              </div>
              <div className="our-services-card-header-bar"></div>
              <div className="our-services-card-content">
                We facilitate conversion of diesel vehicles into electric
                through retrofitting, saving fleet operation costs up to 40%.
              </div>
            </div>
          </div>
        </div>

        <div className="column is-12-mobile is-6-tablet is-4-desktop">
          <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
            <div className="our-services-card-body">
              <div className="images">
                <img
                  src={OUR_SERVICE_CARD_FIVE}
                  alt="Residential Communities"
                  className="is-fullwidth"
                />
              </div>
              <div className="our-services-card-header">
                Residential Communities
              </div>
              <div className="our-services-card-header-bar"></div>
              <div className="our-services-card-content">
                With the rise of electric vehicles for personal use, we offer
                dedicated charging hubs for gated communities & corporate parks.
              </div>
            </div>
          </div>
        </div>

        <div className="column is-12-mobile is-6-tablet is-4-desktop">
          <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
            <div className="our-services-card-body">
              <div className="images">
                <img
                  src={OUR_SERVICE_CARD_SIX}
                  alt="Fleet Management"
                  className="is-fullwidth"
                />
              </div>
              <div className="our-services-card-header">Fleet Management</div>
              <div className="our-services-card-header-bar"></div>
              <div className="our-services-card-content">
                Using the latest cloud-based fleet management platform & mobile
                app, EFL offers Fleet Management Services for fleet and logistic
                companies.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
