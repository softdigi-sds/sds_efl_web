import React, { useEffect, useRef, useState } from 'react';
import { VHSliderProps } from './SmartSliderInterface';
import './slider.scss'; 

const SmartSlider: React.FC<VHSliderProps> = (props) => {
    const {
        title = "",
        titleClass = "",
        width = "100%",
        height = "100%",
        images,
        isVertical = true,
      } = props     

    const [imgSrc, setImgSrc] = useState<string>(images[0]);
    const sliderRef = useRef<HTMLDivElement | null>(null); 
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
      });

    useEffect(()=>{
        if(images)setImgSrc(images[0])
    },[images])

    // useEffect(() => {
    //     if (imgRef.current) {
    //       // Get the rendered (current) width and height of the image after loading
    //       const updateDimensions = () => {
    //         if (imgRef.current) {
    //           setDimensions({
    //             width: imgRef.current.offsetWidth,
    //             height: imgRef.current.offsetHeight,
    //           });
    //         }
    //       };
    //       updateDimensions();
    //     }
    //   }, []);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (imgRef.current) {
            setDimensions({
              width: imgRef.current.offsetWidth,
              height: imgRef.current.offsetHeight,
            });
          }
    };

    
    const handleScroll = (operator: string = "+", align: string = "left") => {
        if (!sliderRef.current) return;

        const scrollValue = operator === "+" ? 100 : -100;
        const scrollOptions: ScrollToOptions = { behavior: 'smooth' };

        if (align === "left") {
            scrollOptions.left = scrollValue;
        } else if (align === "top") {
            scrollOptions.top = scrollValue;
        }

        sliderRef.current.scrollBy(scrollOptions);
    };

    const titleClassName = Array.isArray(titleClass) ? titleClass.join(' ') : titleClass;

    const clickImg =(img:string) =>{
        setImgSrc(img);
    }

    return (
        <>
        {title && <p className={`subtitle is-4 my-4 ml-3 m-0  ${titleClassName}`}>{title}</p>}

        {/* vertical horizonal slider */}
        <div className={`slider-container m-3 p-5 ${isVertical ? "slider-vertical-container" : "slider-hor-container"}`} >
            {imgSrc && <div className='flex-center img-shadow' style={{width, height}}>
                <img ref={imgRef} src={imgSrc} alt="" onLoad={handleImageLoad} />
            </div>} 
               
            {/* vertical slider */}
            {isVertical && <div className='slider-vertical mr-5' style={{height: dimensions?.height}}>
                <span className="icon top-button" onClick={()=>handleScroll("-","top")}>
                    <i className='fa fa-chevron-up'></i>
                </span>

                <div ref={sliderRef} className="slider-vertical my-3 py-2 pr-2" >
                    {images && images.map((img, index) => (
                    <div key={index} onClick={()=>clickImg(img)} className={`v-slider-item ${imgSrc === img && "active-slide"}`}>
                        <img src={img} alt={`slide-${index}`}/>
                    </div>
                    ))}
                </div>

                <div className="icon bottom-button" onClick={()=>handleScroll("+","top")}>
                    <i className='fa fa-chevron-down'></i>
                </div>
            </div>}
            
            {/* horizonal slider */}
            {!isVertical && <div className='slider-hor mt-5' style={{width: dimensions?.width}}>
                <span className="icon left-button" onClick={()=>handleScroll("-","left")}>
                    <i className='fa fa-chevron-left'></i>
                </span>

                <div ref={sliderRef} className="slider-hor mx-3 px-2 pb-2">
                    {images && images.map((img, index) => (
                    <div key={index} onClick={()=>clickImg(img)} className={`h-slider-item ${imgSrc === img && "active-slide"}`}>
                        <img src={img} alt={`slide-${index}`}/>
                    </div>
                    ))}
                </div>

                <span className="icon right-button" onClick={()=>handleScroll("+","left")}>
                    <i className='fa fa-chevron-right'></i>
                </span>
            </div>}
         
        </div>
        </>
    );
};

export default SmartSlider;
