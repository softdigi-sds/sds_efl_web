import React, { useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const HubsMapView = () => {
  const mapStyles = {        
    height: "500px",
    width: "100%"
  };
  
  const defaultCenter = {
    lat: 12.56432, lng: 79.94428 // Anupuram coordinates
  }

    // Array of multiple locations
    const locations = [
        { lat: 13.0827, lng: 80.2707, name: "Chennai Central", color: "red" },
        { lat: 12.9716, lng: 80.2494, name: "Marina Beach", color: "blue" },
        { lat: 13.0674, lng: 80.2376, name: "Guindy National Park", color: "green" },
        { lat: 13.0321, lng: 80.2687, name: "Kapaleeshwarar Temple", color: "yellow" },
        { lat: 13.0097, lng: 80.2129, name: "Chennai Trade Centre", color: "purple" }
      ];
      const mapRef = useRef(null);
  
      const onLoad = useCallback((map:any) => {
        mapRef.current = map;
        const bounds = new window.google.maps.LatLngBounds();
        locations.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
      }, [locations]);
    

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCA5bzDqci1RcEHa17XN7R09bzh3-nOVm0"> {/* Replace with your API key */}
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={8}
        // center={defaultCenter}
        onLoad={onLoad}
      >
           {locations?.map((location, index) => (
          <Marker 
            key={index} 
            position={{ lat: location.lat, lng: location.lng }} 
            title={location.name}  // Optional: shows the name on hover
            icon={`http://maps.google.com/mapfiles/ms/icons/red-dot.png`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}




export default HubsMapView
