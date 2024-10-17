import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix marker icon issue in Leaflet with Webpack (optional but common issue)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});



const getColorIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color}`,
    iconSize: [21, 34],
    iconAnchor: [10, 34],
    popupAnchor: [2, -32],
    shadowSize: [41, 41],
  });
};
interface HeaderProps {
  locations:any[],
  zoom?:number,
  height?:number,
}
const ReactMapView: React.FC<HeaderProps> = ({locations,zoom,height}) => {

  console.log("ReactMapView",locations)
  const center: LatLngExpression = [20.5937, 78.9629]; // Approx center of India
  
  return (
   
    <MapContainer center={center} zoom={zoom?zoom:5} style={{ height: height ? `${height}px` : '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {locations.map((location, index) => {

  if (location?.latitude && location?.longitude) {
    return (
      <Marker
        key={index}
        position={[location.latitude, location.longitude]}

        // icon={getColorIcon(location.color)}
      >
        <Popup>
          {location.hub_name ? location.hub_name : "No hub name available"}
        </Popup>
      </Marker>
    );
  }
  return null; 
})}

      
    </MapContainer>
  );
};





export default ReactMapView
