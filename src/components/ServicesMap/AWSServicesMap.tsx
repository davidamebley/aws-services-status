import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, GeoJSON, Tooltip, CircleMarker } from 'react-leaflet';
import { Feature,MultiPolygon, Geometry } from 'geojson';
import L from 'leaflet';

import LoadServiceLocationsTask from '../../Tasks/LoadServiceLocationsTask';
import { AWSService, Continent } from '../../Types/Types';
import './AWSServicesMap.css';
import { Layer } from 'leaflet';

/* type GeoJSONObject ={
  type: "FeatureCollection";
  continents: Continent;
} */

const AWSServicesMap = ({ continents}: any) => {
  const [awsServices, setAwsServices] = useState<AWSService[]>([])
  const [selectedService, setSelectedService] = useState("License service");

  useEffect(() => {
    const loadServiceLocations = async () => {
        const loadServiceLocationsTask = new LoadServiceLocationsTask();
        const awsServices = await loadServiceLocationsTask.getAWSServices();
        setAwsServices(awsServices);
    };
    loadServiceLocations();
  }, []);

  useEffect(()=>{
    console.log('Services:', awsServices.map(service => JSON.stringify(service)));
  }, [awsServices]);
  useEffect(()=>{
    console.log('Continents log:', continents.map((continent: any) => JSON.stringify(continent)));
  }, [continents]);

  const mapStyle = {
    // fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 0.6,
    className:"continent"
  };

  // Define the type of the properties of each continent
  interface ContinentProperties {
    continent: string;
    color: string;
  }

  // Define the type of a continent feature
  type Continent = Feature<MultiPolygon, ContinentProperties>;
  

  // On Each Drawn Continent...
  const onEachContinent = (continent:Continent, layer: any) => {
    // Fill each layer top of continent with color
    const color = continent.properties.color
    layer.setStyle({ fillColor: color });
    // layer.setStyle({ fillColor: 'yellow', weight: 2, fillOpacity: 5 })

    const name = continent.properties.continent;
    const service = 
    // Show continent Name, other text, etc, on Each continent in a Popup
    layer.bindPopup(`${name}`);

    // Change the fill color on mouse hover
    layer.on({
      mouseover: (e: L.LeafletMouseEvent) => {
        // e.target.setStyle({ fillColor: 'blue' });
      },
      mouseout: (e: L.LeafletMouseEvent) => {
        // e.target.setStyle({ fillColor: color });
      },
    });
    
  };


  return (
    <MapContainer
      style={{ height: '90vh' }} 
      zoom={2} center={[40, 0]} scrollWheelZoom={true}
    >
      <GeoJSON
        style={mapStyle}
        data={continents}  onEachFeature={onEachContinent} />
      {
        (awsServices)
        .filter((awsService =>
          awsService.coordinates &&
          awsService.coordinates[0] !== 0 &&
          awsService.coordinates[1] !== 0 &&
          awsService.name === selectedService))
          .map((awsService, index) => {
            console.log("Mapping AWS service:", awsService); // add this line to log each AWS service being mapped
            return  (
            <CircleMarker
            className={`circle-marker service-${awsService.state}`}
              key={index}
              center={[awsService.coordinates![0], awsService.coordinates![1]]}
              color={awsService.color}
              weight={5}
              radius={8}
            >
              <Tooltip><b>{awsService.name}</b><br/>
                Region: {awsService.aws_region}<br/>
                State: <b>{awsService.state}</b><br/>
                Last updated: <b>{`${new Date(awsService.updated).toLocaleString()}`}</b>
              </Tooltip>
            </CircleMarker>)
          })
      }
    </MapContainer>
  )
}

export default AWSServicesMap