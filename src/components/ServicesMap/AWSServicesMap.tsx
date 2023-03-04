import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, GeoJSON, Tooltip, CircleMarker } from 'react-leaflet';
import { Feature,MultiPolygon, Geometry } from 'geojson';

import LoadServiceLocationsTask from '../../Tasks/LoadServiceLocationsTask';
import { AWSService, Continent } from '../../Types/Types';
import './AWSServicesMap.css';

const AWSServicesMap = ({ continents }: any) => {
  const locations =[ 
    {
      name: "ap-northeast-1",
      coordinates: [35.6761919, 139.6503106],
    },
    {
      name: "eu-west-1",
      coordinates: [53.41291, -8.24389],
    },
    {
      name: "us-east-1",
      coordinates: [37.4783967, -76.4530772],
    },
  ]
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

  const mapStyle = {
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
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
    layer.options.fillColor = continent.properties.color;

    const name = continent.properties.continent;
    // const confirmedText = continent.properties.confirmedText;
    // Show continent Name, other text, etc, on Each continent in a Popup
    layer.bindPopup(`${name}`);

    // Change the fill color on mouse hover
    /* layer.on({
      mouseover: (e) => {
        e.target.setStyle({ fillColor: 'blue' });
      },
      mouseout: (e) => {
        e.target.setStyle({ fillColor: continent.properties.color });
      },
    }); */
    /* 
    Bright Turquoise - #00FFD5
    Lime Green - #32CD32
    Yellow - #FFFF00
    Bright Red - #FF0000
    Red - #FF6347
    Warning Yellow - #FFC107
    */

  };


  return (
    <MapContainer
      style={{ height: '90vh' }} 
      zoom={2} center={[40, 0]} scrollWheelZoom={true}
    >
      <GeoJSON
        style={mapStyle}
        data={continents} onEachFeature={onEachContinent} />
      {
        (awsServices)
        .filter((awsService =>
          awsService.coordinates &&
          awsService.coordinates[0] !== 0 &&
          awsService.coordinates[1] !== 0 &&
          awsService.name === selectedService))
          .map((awsService, index) => {
            console.log("Mapping AWS service:", awsService); // add this line to log each AWS service being mapped
            return  (<CircleMarker
              key={index}
              center={[awsService.coordinates![0], awsService.coordinates![1]]}
              color={awsService.color}
              weight={5}
              radius={10}
            >
              <Tooltip>{awsService.name}</Tooltip>
            </CircleMarker>)
          })
      }
    </MapContainer>
  )
}

export default AWSServicesMap