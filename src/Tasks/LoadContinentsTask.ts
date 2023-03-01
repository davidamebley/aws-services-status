import ContinentsData from '../data/continents.json';
import AWSServicesData from '../data/aws_services.json';

const { features } = ContinentsData;

class LoadContinentsTask{
    setState = null;
    mapContinents = features;

    load = (setState: any) => {
        this.setState = setState;

        setState(this.mapContinents);


        // this.setState(this.mapContinents);
    };
}

export default LoadContinentsTask;