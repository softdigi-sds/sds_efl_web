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

// interface Location {
//   lat: number;
//   lng: number;
//   name: string;
//   color: string;
// }

// const locations: Location[] = [
//     { lat: 28.6139, lng: 77.2090, name: "New Delhi (Delhi)", color: "red" },
//     { lat: 12.9716, lng: 77.5946, name: "Bengaluru (Karnataka)", color: "blue" },
//     { lat: 13.0827, lng: 80.2707, name: "Chennai (Tamil Nadu)", color: "green" },
//     { lat: 19.0760, lng: 72.8777, name: "Mumbai (Maharashtra)", color: "yellow" },
//     { lat: 22.5726, lng: 88.3639, name: "Kolkata (West Bengal)", color: "purple" },
//     { lat: 17.3850, lng: 78.4867, name: "Hyderabad (Telangana)", color: "red" },
//     { lat: 26.9124, lng: 75.7873, name: "Jaipur (Rajasthan)", color: "blue" },
//     { lat: 23.2599, lng: 77.4126, name: "Bhopal (Madhya Pradesh)", color: "green" },
//     { lat: 15.3173, lng: 75.7139, name: "Vijayawada (Andhra Pradesh)", color: "yellow" },
//     { lat: 30.7333, lng: 76.7794, name: "Chandigarh (Punjab & Haryana)", color: "purple" },
//     { lat: 30.3165, lng: 78.0322, name: "Dehradun (Uttarakhand)", color: "red" },
//     { lat: 31.1048, lng: 77.1734, name: "Shimla (Himachal Pradesh)", color: "blue" },
//     { lat: 25.3176, lng: 82.9739, name: "Lucknow (Uttar Pradesh)", color: "green" },
//     { lat: 21.1458, lng: 79.0882, name: "Nagpur (Maharashtra)", color: "yellow" },
//     { lat: 9.9312, lng: 76.2673, name: "Kochi (Kerala)", color: "purple" },
//     { lat: 25.5941, lng: 85.1376, name: "Patna (Bihar)", color: "red" },
//     { lat: 26.8467, lng: 80.9462, name: "Kanpur (Uttar Pradesh)", color: "blue" },
//     { lat: 11.0168, lng: 76.9558, name: "Coimbatore (Tamil Nadu)", color: "green" },
//     { lat: 23.0225, lng: 72.5714, name: "Ahmedabad (Gujarat)", color: "yellow" },
//     { lat: 27.0238, lng: 74.2179, name: "Ajmer (Rajasthan)", color: "purple" },
//     { lat: 19.2183, lng: 72.9781, name: "Thane (Maharashtra)", color: "red" },
//     { lat: 21.1702, lng: 72.8311, name: "Surat (Gujarat)", color: "blue" },
//     { lat: 25.4484, lng: 91.8820, name: "Shillong (Meghalaya)", color: "green" },
//     { lat: 15.2993, lng: 74.1240, name: "Panaji (Goa)", color: "yellow" },
//     { lat: 11.6643, lng: 92.7289, name: "Port Blair (Andaman & Nicobar)", color: "purple" },
//     { lat: 10.7905, lng: 78.7047, name: "Tiruchirappalli (Tamil Nadu)", color: "red" },
//     { lat: 25.0340, lng: 85.3034, name: "Gaya (Bihar)", color: "blue" },
//     { lat: 26.2006, lng: 92.9376, name: "Dispur (Assam)", color: "green" },
//     { lat: 11.9416, lng: 79.8083, name: "Puducherry (Puducherry)", color: "yellow" },
//     { lat: 24.5854, lng: 73.7125, name: "Udaipur (Rajasthan)", color: "purple" },
//     { lat: 22.7196, lng: 75.8577, name: "Indore (Madhya Pradesh)", color: "red" },
//     { lat: 19.9975, lng: 73.7898, name: "Nashik (Maharashtra)", color: "blue" },
//     { lat: 24.7914, lng: 85.0002, name: "Nalanda (Bihar)", color: "green" },
//     { lat: 11.8477, lng: 79.7850, name: "Cuddalore (Tamil Nadu)", color: "yellow" },
//     { lat: 27.5330, lng: 88.5122, name: "Gangtok (Sikkim)", color: "purple" },
//     { lat: 23.3639, lng: 85.3380, name: "Ranchi (Jharkhand)", color: "red" },
//     { lat: 22.5727, lng: 82.1369, name: "Bilaspur (Chhattisgarh)", color: "blue" },
//     { lat: 25.4670, lng: 78.5830, name: "Jhansi (Uttar Pradesh)", color: "green" },
//     { lat: 21.7645, lng: 72.1519, name: "Bhavnagar (Gujarat)", color: "yellow" },
//     { lat: 23.8103, lng: 86.4412, name: "Dhanbad (Jharkhand)", color: "purple" },
//     { lat: 28.4595, lng: 77.0266, name: "Gurugram (Haryana)", color: "red" },
//     { lat: 25.8505, lng: 93.7997, name: "Imphal (Manipur)", color: "blue" },
//     { lat: 24.8170, lng: 93.9368, name: "Kohima (Nagaland)", color: "green" },
//     { lat: 31.6340, lng: 74.8723, name: "Amritsar (Punjab)", color: "yellow" },
//     { lat: 25.6751, lng: 94.1086, name: "Mokokchung (Nagaland)", color: "purple" },
//     { lat: 22.9734, lng: 78.6569, name: "Jabalpur (Madhya Pradesh)", color: "red" },
//     { lat: 28.7041, lng: 77.1025, name: "Noida (Uttar Pradesh)", color: "blue" },
//     { lat: 23.7451, lng: 91.7468, name: "Agartala (Tripura)", color: "green" },
//     { lat: 22.4234, lng: 87.3119, name: "Kharagpur (West Bengal)", color: "yellow" },
//     { lat: 34.0837, lng: 74.7973, name: "Srinagar (Jammu & Kashmir)", color: "purple" },
//     { lat: 33.7782, lng: 76.5762, name: "Leh (Ladakh)", color: "red" },
//     { lat: 12.2958, lng: 76.6394, name: "Mysore (Karnataka)", color: "blue" },
//     { lat: 9.9391, lng: 78.1212, name: "Madurai (Tamil Nadu)", color: "green" },
//     { lat: 8.5241, lng: 76.9366, name: "Thiruvananthapuram (Kerala)", color: "yellow" }
// ];

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
  locations:any[]
}
const ReactMapView: React.FC<HeaderProps> = ({locations}) => {

  console.log("ReactMapView",locations)
  const center: LatLngExpression = [20.5937, 78.9629]; // Approx center of India
  
  return (
   
    <MapContainer center={center} zoom={5} style={{ height: '600px', width: '100%' }}>
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
