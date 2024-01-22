import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const Map: React.FC = () => {
    const containerStyle = {
      width: '100%',
      height: '500px',
    };

    const center = {
        lat: -34.397,
        lng: 150.644,
      };
 

  return (
    <LoadScript googleMapsApiKey="AIzaSyA27NypPwVfdLfQH3e0_X8O2KPvQeIaPlA">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Dodaj dodatkowe elementy mapy tutaj */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;