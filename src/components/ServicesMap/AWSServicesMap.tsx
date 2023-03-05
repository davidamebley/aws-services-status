import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, GeoJSON, Tooltip, CircleMarker } from 'react-leaflet';
import { Feature,MultiPolygon, Geometry } from 'geojson';
import L from 'leaflet';
import Dropdown from 'react-bootstrap/Dropdown';

import LoadServiceLocationsTask from '../../Tasks/LoadServiceLocationsTask';
import { AWSService, Continent } from '../../Types/Types';
import './AWSServicesMap.css';

const AWSServicesMap = ({ continents}: any) => {
  const [awsServices, setAwsServices] = useState<AWSService[]>([])
  const [serviceNames, setServiceNames] = useState([""]);
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    const loadServiceLocations = async () => {
        const loadServiceLocationsTask = new LoadServiceLocationsTask();
        const awsServices = await loadServiceLocationsTask.getAWSServices();
        // Get Distinct AWS Service Names using the Set object, & convert result to array with the help of the spread operator.
        const serviceNames = [...new Set(awsServices.map((service) => service.name))];
        setServiceNames(serviceNames);
        // Pre-set selected service
        if (selectedService === "" && serviceNames) {
          setSelectedService(serviceNames[0]);
        }else if (!serviceNames?.length)
          {
          setSelectedService("No service data to show");
        }

        setAwsServices(awsServices);
    };
    loadServiceLocations();
  }, [selectedService]);

  const mapStyle = {
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

    const name = continent.properties.continent;
    const service = 
    // Show continent Name, other text, etc, on Each continent in a Popup
    layer.bindPopup(`${name}`);
    
  };


  return (
    <div className='container__map'>
      {<Dropdown className='map-dropdown'
        onSelect={(e) => setSelectedService(e! as string)}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {selectedService}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {serviceNames.map((serviceName, index) => (
            <Dropdown.Item
              key={index}
              eventKey={serviceName}
            >
              {serviceName} {/* Drop-down list */}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>}

    <MapContainer
      style={{ height: '100%' }} 
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
          (awsService.name === selectedService)))
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
    </div>
  )
}

export default AWSServicesMap