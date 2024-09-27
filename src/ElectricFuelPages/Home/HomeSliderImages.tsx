import React from "react";
import {
  ELETRIC_HOME_IMAGE_1,
  ELETRIC_HOME_IMAGE_2,
  ELETRIC_HOME_IMAGE_3,
  ELETRIC_HOME_IMAGE_4,
} from "../../services/ImageService";
import SmartImgSlider from "../../core/sliders/SmartImgSlider";

const HomeSliderImages: React.FC = () => {
  const imageSliderContent = [
    {
      image: ELETRIC_HOME_IMAGE_1,
      content: (
        <div className="smart-customer-home-page-details">
          <div className="is-size-2">
            <h2>
              <span className="eletric-home-page-words">WE EMPOWER</span>
              <div>
                YOUR MOBILITY
                <br />
                WITH ELECTRICITY
              </div>
            </h2>
          </div>
        </div>
      ),
    },
    {
      image: ELETRIC_HOME_IMAGE_2,
      content: (
        <div className="smart-customer-home-page-details">
          {/* <div className="is-size-2">
            <h2>
              <span className="eletric-home-page-words">WE ELECTRIFY</span>
              <div>
                YOUR VEHICLES
                <br />
                WITH ELECTRIC FUEL
              </div>
            </h2>
          </div> */}
        </div>
      ),
    },
    {
      image: ELETRIC_HOME_IMAGE_3,
      content: (
        <div className="smart-customer-home-page-details">
          {/* <div className="is-size-2">
            <h2>
              <span className="eletric-home-page-words">WE ENERGIZE</span>
              <div>
                YOUR EV WITH
                <br />
                SUPERIOR CHARGERS
              </div>
            </h2>
          </div> */}
        </div>
      ),
    },
    {
      image: ELETRIC_HOME_IMAGE_4,
      content: (
        <div className="smart-customer-home-page-details">
          {/* <div className="is-size-2">
            <h2>
              <span className="eletric-home-page-words">WE BOOST</span>
              <div>YOUR EV EXPERIENCE</div>
            </h2>
          </div> */}
        </div>
      ),
    },
  ];

  return (
    <div>
      <SmartImgSlider
        title="Our Electric Solutions"
        images={imageSliderContent.map((item) => ({
          image: item.image,
          content: item.content,
        }))}
        showCount={1}
        auto={true}
        scrollButton={true}
      />
    </div>
  );
};

export default HomeSliderImages;
