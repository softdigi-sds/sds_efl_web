import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// import "./ImageCarousel.css";

// Define prop types
interface HomeSliderProps {
  data: { content: string; data: React.ReactNode }[];
  isMulti?: boolean;
  showImages?: number;
  showButtons?: boolean;
  buttonsClassName?: string;
  dots?: boolean;
  showImageNumber?: number;
  containerClass?: string;
}

const HomeSlider: React.FC<HomeSliderProps> = (props) => {

  const {
    data = [],
    isMulti = false,
    showImages = 3,
    showButtons = false,
    buttonsClassName = "",
    dots = false,
    showImageNumber = 0,
    containerClass = "iamge-sldier-single-div"
  } = props;

  const [index, setIndex] = useState(0);
  const [content, setContent] = useState<string>("");

  let sliderRef = useRef<Slider | null>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const gotoSlide = (slideNumber: number) => {
    sliderRef.current?.slickGoTo(slideNumber);
  };

  useEffect(() => {
    gotoSlide(showImageNumber);
    if (data && data.length > 0) {
      setContent(data[0].content);
    }
  }, [showImageNumber, data]);

  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          {/* <img src={CROP_CUSTOMER_HOME_IMAGE_2} alt='' /> */}
        </a>
      );
    },
    infinite: true,
    speed: 500,
    autoplay: !showButtons,
    autoplaySpeed: showButtons ? undefined : 3000,
    cssEase: !showButtons ? "linear" : undefined,
    slidesToShow: isMulti ? showImages : 1,
    slidesToScroll: 1,
    dots: dots,
    beforeChange: (prev: number, next: number) => {
      setIndex(next);
    }
  };

  const prevNextButtons = () => {
    return (
      <div className={buttonsClassName}>
        <button disabled={index === 0} className="button is-previous" onClick={previous}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
        <button disabled={index === data.length - 1} className="button is-next" onClick={next}>
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    );
  };

  return (
    <>
      {content && (
        <figure className="image is-4by3">
          <img className="is-square" src={`data:image/png;base64,${content}`} alt="" />
        </figure>
      )}
      <Slider ref={(slider) => { sliderRef.current = slider }} {...settings}>
        {data.map((item, idx) => (
          <div key={idx} className={isMulti ? "image-slider-multi-div" : containerClass} onClick={() => setContent(item.content)}>
            {item.data}
          </div>
        ))}
      </Slider>
      {showButtons && prevNextButtons()}
    </>
  );
};

export default HomeSlider;
