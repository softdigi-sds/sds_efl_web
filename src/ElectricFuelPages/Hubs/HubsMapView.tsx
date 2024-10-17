import React, { useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerF,  } from '@react-google-maps/api';
import ReactMapView from '../../components/site/ReactMapView';

interface headerProps{
  data:any[]
}
const HubsMapView:React.FC<headerProps> = ({data}) => {
  console.log("hub map data",data)

  let hubData = [];
  hubData.push(data);
  
   


  return (
   
    <>
    <ReactMapView locations={hubData} zoom={5} />
    </>
  )
}




export default HubsMapView
