import React, { useEffect } from 'react';
import { ImageSliderProps } from './SmartSliderInterface';
import './slider.scss'; 

const SmartImgSlider: React.FC<ImageSliderProps> = (props) => {
    const {
        title = "",
        titleClass = "",
        width = "100%",
        images,
        showCount = 1,
        auto = false,
        scrollButton = true,
        scrollTime = 2000,
        hideDots = false,
    } = props; 

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const imgCount: number = (showCount === 0) ? 1 : showCount;

    const getDotCount = (): number => {
        let value: number = images.length / imgCount;
        if(value % 1 !== 0.5 && value % 1 !== 0){
            value = Math.round(value) + 1;
        }
        return Math.round(value);
    };

    const prevSlide = () => {
        const newIndex = currentIndex === 0 ? getDotCount() - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const newIndex = currentIndex === getDotCount() - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const handleDot = (imgNo: number) => {
        setCurrentIndex(imgNo);
    };

    // Auto scroll logic using useEffect
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (auto) {
            interval = setInterval(() => {
                nextSlide();
            }, scrollTime);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [currentIndex, auto, scrollTime]); 

    const titleClassName = Array.isArray(titleClass) ? titleClass.join(' ') : titleClass;

    return (
        <div className='m-4 mb-6'>
            {title && <p className={`subtitle is-4 my-4 ${titleClassName}`}>{title}</p>}
            <div className="slider-container" style={{ width: width }}>
                
                <div className="slider-item">
                    <img src={images[currentIndex].image} alt={`Slide ${currentIndex + 1}`} />
                    {images[currentIndex].content && <div className="slider-content">{images[currentIndex].content}</div>}
                </div>

                {!hideDots && (
                    <div className='slider-dots'>
                        {Array.from({ length: getDotCount() }, (_, index) => (  
                            <span 
                                key={index} 
                                className={`mx-1 dot ${currentIndex === index ? 'dot-active' : ''}`}
                                onClick={() => handleDot(index)}
                            >
                                <i className="fa fa-circle"></i>
                            </span>
                        ))}
                    </div>
                )}

                {getDotCount() > 1 && scrollButton && (
                    <>
                        <span className='icon prev-button' onClick={prevSlide}>
                            <i className='fa fa-chevron-left'></i>
                        </span>
                        <span className='icon next-button' onClick={nextSlide}>
                            <i className='fa fa-chevron-right'></i>
                        </span>
                    </>
                )}
            </div>
        </div>
    );
};

export default SmartImgSlider;
