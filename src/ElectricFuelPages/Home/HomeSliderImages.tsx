import React from "react";
import HomeSlider from "../../components/HomeSlider";
import {
  ELETRIC_HOME_IMAGE_1,
  ELETRIC_HOME_IMAGE_2,
  ELETRIC_HOME_IMAGE_3,
  ELETRIC_HOME_IMAGE_4,
} from "../../services/ImageService";

interface HomePageSliderProps {}

const HomeSliderImages: React.FC<HomePageSliderProps> = () => {
  const imageSlider = () => {
    return (
      <div style={{ position: "relative" }}>
            <div className="smart-customer-home-page-details">
              <div className="is-size-2">
                <h2>
                  <span className="eletric-home-page-words">WE EMPOWER</span>
                  <div className="">
                    YOUR MOBILITY
                    <br></br> WITH ELECTRICITY
                  </div>
                </h2>
              </div>
            </div>
            <div className="customer-home-side-images">
              <div
                className="customer-home-right-image"
              >
                <img src={ELETRIC_HOME_IMAGE_1} alt="" />
              </div>
            </div>
         
      </div>
    );
  };

  const imageSliderTwo = () => {
    return (
      <div style={{ position: "relative" }}>
   
          <div className="smart-customer-home-page-details">
            <div className="is-size-2">
              <h2>
                <span className="eletric-home-page-words">WE ELECTRIFY</span>
                <div className="">
                  YOUR VEHICLES
                  <br></br> WITH ELECTRIC FUEL
                </div>
              </h2>
            </div>
          </div>
          <div className="">
            <div className="customer-home-side-images">
              <div className="customer-home-right-image">
                <img src={ELETRIC_HOME_IMAGE_2} alt="" />
              </div>
            </div>
          </div>
        
      </div>
    );
  };

  const imageSliderThree = () => {
    return (
      <div style={{ position: "relative" }}>

            <div className="smart-customer-home-page-details">
              <div className="is-size-2">
                <h2>
                  <span className="eletric-home-page-words">WE ENERGIZE</span>
                  <div className="">
                    YOUR EV WITH
                    <br></br>SUPERIOR CHARGERS
                  </div>
                </h2>
              </div>
            </div>
          
          <div className="">
            <div className="customer-home-side-images">
              <div className="customer-home-right-image">
                <img src={ELETRIC_HOME_IMAGE_3} alt="" />
              </div>
            </div>
          </div>
        
      </div>
    );
  };

  const imageSliderFour = () => {
    return (
      <div style={{ position: "relative" }}>
        
            <div className="smart-customer-home-page-details">
              <div className="is-size-2">
                <h2>
                  <span className="eletric-home-page-words">WE BOOST</span>
                  <div className="">YOUR EV EXPERIENCE</div>
                </h2>
              </div>
            </div>
          
          <div className="">
            <div className="customer-home-side-images">
              <div className="customer-home-right-image">
                <img
                  src={ELETRIC_HOME_IMAGE_4}
                />
              </div>
            </div>
          </div>
        
      </div>
    );
  };

  const getImageData = () => {
    return [
      { content: "", data: imageSliderTwo() },
      { content: "", data: imageSlider() },
      { content: "", data: imageSliderThree() },
      { content: "", data: imageSliderFour() },
    ];
  };

  return (
    <div className="smart-image-home-slider">
      <HomeSlider
        data={getImageData()}
        key="singleImage"
        showButtons={false}
        buttonsClassName="product-image-buttons"
        containerClass="smart-home-slider"
      />
    </div>
  );
};

export default HomeSliderImages;
