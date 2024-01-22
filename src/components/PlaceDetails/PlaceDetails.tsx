import React from 'react';
interface Place {
    name: string;
  }
  
  interface PlaceDetailsProps {
    place: Place;
  }
  
  const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place }) => {

    
    return(
        <h1>{place.name}</h1>

    );
}

export default PlaceDetails;