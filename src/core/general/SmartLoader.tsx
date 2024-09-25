import React, { useEffect, useState } from "react";
import loader_image1 from "../../assets/images/loader/Blocks@1x-1.0s-200px-200px.svg";
import loader_image2 from "../../assets/images/loader/Cube@1x-1.0s-200px-200px.svg";
import loader_image3 from "../../assets/images/loader/Double Ring@1x-1.0s-200px-200px.svg";
import loader_image4 from "../../assets/images/loader/Dual Ring@1x-1.0s-200px-200px.svg";
import loader_image5 from "../../assets/images/loader/Eclipse@1x-1.0s-200px-200px.svg";
import loader_image6 from "../../assets/images/loader/Ellipsis@1x-1.0s-200px-200px.svg";
import loader_image7 from "../../assets/images/loader/Gear@1x-0.2s-200px-200px.svg";
import loader_image8 from "../../assets/images/loader/Infinity@1x-1.0s-200px-200px.svg";
import loader_image9 from "../../assets/images/loader/Pulse@1x-1.0s-200px-200px.svg";
import loader_image10 from "../../assets/images/loader/Radio@1x-1.0s-200px-200px.svg";
import loader_image11 from "../../assets/images/loader/Reload@1x-1.0s-200px-200px.svg";
import loader_image12 from "../../assets/images/loader/Rolling@1x-1.0s-200px-200px.svg";
import loader_image13 from "../../assets/images/loader/Spin@1x-1.0s-200px-200px.svg";
import loader_image14 from "../../assets/images/loader/Spinner@1x-1.0s-200px-200px.svg";
import loader_image15 from "../../assets/images/loader/Triangles@1x-1.0s-200px-200px.svg";
import './SmartLoader.css';
const SmartLoader: React.FC = () => {

    const [text,setText]= useState('')
    const [showImg,setShowImg]= useState(true)
    
    useEffect(() => {
        setTimeout(()=>{
            setText("Please Wait....Loading")
        },3000)
    }, []);
    return (
        <>
        <div>
            {
                showImg?(
                    <>
                    <img src={loader_image1} className="small-image"/>
                    <img src={loader_image2} className="small-image"/>
                    <img src={loader_image3} className="small-image"/>
                    <img src={loader_image4} className="small-image"/>
                    <img src={loader_image5} className="small-image"/>

                    <img src={loader_image6} className="small-image"/>
                    <img src={loader_image7} className="small-image"/>
                    <img src={loader_image8} className="small-image"/>
                    <img src={loader_image9} className="small-image"/>
                    <img src={loader_image10} className="small-image"/>

                    <img src={loader_image11} className="small-image"/>
                    <img src={loader_image12} className="small-image"/>
                    <img src={loader_image13} className="small-image"/>
                    <img src={loader_image14} className="small-image"/>
                    <img src={loader_image15} className="small-image"/>
                    </>

                ):(
                    <h3>text</h3>
                )
            }
        </div>
        </>
        );
}

export default SmartLoader;