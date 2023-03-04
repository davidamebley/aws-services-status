import AWSServicesData from '../data/aws_services.json';
import { Location, AWSService, ServiceLocation } from '../Types/Types';

const { services } = AWSServicesData;
const locations: Location[] =[ 
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

class LoadServiceLocationsTask{
    // #serviceLocations:ServiceLocation|any = {};
    #awsServices: AWSService[] = [];
    #locations: Location[];
    #services:AWSService[] = services;

    constructor(){
        this.#locations = locations;

        // Load Service Locations
        this.#load(this.#locations);
    }

    #load:(locations: Location[])=>void = (locations: Location[]) => {
        this.#awsServices = this.#processAWSServicesData(locations);
    };

    #processAWSServicesData:(locations: Location[]) => AWSService[] = (locations:Location[]) => {
        const awsServices:AWSService[] = [];

        for (let i = 0; i < this.#services.length; i++) {
            const awsService = this.#services[i];
            const serviceLocation = locations.find(
                (location) => location.name === awsService.aws_region
            );

            awsService.coordinates = [];
            awsService.color = "";

            if (serviceLocation) {
                // Set color
                switch (awsService.state) {
                    case "ok":
                        awsService.color="#32CD32"; //Lime Green
                        break;
                    case "alarm":
                        awsService.color="#FFC107";  //Warning Yellow
                        break;
                    default:
                        awsService.color="#FF0000";  // Failure: Bright Red
                        break;
                }

                // Set coordinates
                awsService.coordinates = serviceLocation.coordinates;
            }

            awsServices.push(awsService);
        }
        return awsServices;
    };

    getAWSServices = async (): Promise<AWSService[]> => {
        return this.#awsServices;
    };

}

export default LoadServiceLocationsTask;