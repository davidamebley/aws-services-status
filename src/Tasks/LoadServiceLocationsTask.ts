import axios from 'axios';
import { Location, AWSService } from '../Types/Types';

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

    getAWSServicesData:() => Promise<AWSService[]> = async () => {
        const awsServices:AWSService[] = [];
        const services:AWSService[] = await JSON.parse(await this.#fetchServicesData());

        for (let i = 0; i < services.length; i++) {
            const awsService = services[i];
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

    #fetchServicesData = async () => {
        const response = await axios.get('https://yze2pu4fmh.execute-api.us-east-1.amazonaws.com/deploy');
        const data:AWSService[] = response.data
        return JSON.stringify(data);
    };


}

export default LoadServiceLocationsTask;