import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import './AWSServicesMap.css';

const AWSServicesMap = ({ continents }: any) => {
  const mapStyle = {
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };

  // On Each Drawn Continent...
  const onEachContinent = (continent:any, layer:any) => {
    // Fill each layer top of continent with color
    layer.options.fillColor = continent.properties.color;

    const name = continent.properties.ADMIN;
    const confirmedText = continent.properties.confirmedText;
    // Show continent Name, other text, etc, on Each continent in a Popup
    layer.bindPopup(`${name} ${confirmedText}`);

    // Change the fill color on mouse hover
    /* layer.on({
      mouseover: (e) => {
        e.target.setStyle({ fillColor: 'blue' });
      },
      mouseout: (e) => {
        e.target.setStyle({ fillColor: continent.properties.color });
      },
    }); */

  };


  return (
    <MapContainer
      style={{ height: '90vh' }} 
      zoom={2} center={[20, 100]} scrollWheelZoom={true}
    >
      <GeoJSON
        style={mapStyle}
        data={continents} onEachFeature={onEachContinent} />
    </MapContainer>
  )
}

export default AWSServicesMap