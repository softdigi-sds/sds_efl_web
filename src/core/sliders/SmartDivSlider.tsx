import React, { useEffect, useState } from 'react';
import { SmartDivSliderProps } from './SmartSliderInterface';

const SmartDivSlider: React.FC<SmartDivSliderProps> = (props) => {
  const {
    title = "",
    titleClass = "",
    width = "100%",
    height = "100%",
    auto = false, 
    children = <div className='has-background-light p-5 subtitle is-2 has-text-grey-light'>PLACE ELEMENTS</div>,                                                          
    scrollButton = true,
    scrollTime = 2000,
    hideDots = false,
  } = props;     
 
  const [currentIndex, setCurrentIndex] = useState<number>(0);  
  const normalizedChildren = Array.isArray(children) ? children :  React.Children.toArray(children);

  const handleNext = () => {
    setCurrentIndex(currentIndex  === normalizedChildren.length - 1 ? 0 : currentIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? normalizedChildren.length - 1  : currentIndex - 1);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (auto) {
      interval = setInterval(handleNext, scrollTime);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [auto, scrollTime]);

  const sliderStyle: React.CSSProperties = {
    width: width,
    height: height,
  };

  const slidesStyle: React.CSSProperties = {
    transform: `translateX(-${currentIndex * 100}%)`,
    width: `${normalizedChildren.length * 100}%`,
    transition: "all ease-in-out .9s",
    display: "flex",
    height: '100%',
  };

  const titleClassName = Array.isArray(titleClass) ? titleClass.join(' ') : titleClass;

  return (
    <>
      {title && <p className={`title mt-2 ml-3 ${titleClassName}`}>{title}</p>}

      <div className="slider-container m-3" style={sliderStyle}>
        <div style={slidesStyle}>
          {normalizedChildren.map((child, index) => (
            <div key={index} className='div-slide'>
              {typeof child === 'function' ? child() : child}
            </div>
          ))}
        </div>

        {scrollButton && normalizedChildren.length > 1 && (
          <>
            <span className='icon prev-button' onClick={handlePrev}>
              <i className='fa fa-chevron-left'></i>
            </span>
            <span className='icon next-button' onClick={handleNext}>
              <i className='fa fa-chevron-right'></i>
            </span>
          </>
        )}

        {!hideDots && (
          <div className='slider-dots'>
            {normalizedChildren.map((_, index) => (
              <span 
                key={index} 
                className={`icon dot ${currentIndex === index ? 'dot-active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              >
                <i className="fa fa-circle"></i>
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SmartDivSlider;
