import { Continent } from '../Types/Types';

class LoadContinentsTask{
    #mapContinents:Continent[] = [];
    #continents:Continent[]= [];

    constructor(){
       this.#fetchContinents();
    }

    #load = async () => {
        await this.#fetchContinents();
        this.#processContinentData();
      };

    #processContinentData = () => {
        for (let i = 0; i < this.#continents.length; i++) {
            const continent = this.#continents[i];
            const mapContinent = continent;

            if (mapContinent) {
                switch (mapContinent.properties.continent) {
                    case "Africa":
                        mapContinent.properties.color="#8A2BE2"
                        break;
                    case "Asia":
                        mapContinent.properties.color="#7B68EE"
                        break;
                    case "Europe":
                        mapContinent.properties.color="#6A5ACD"
                        break;
                    case "North America":
                        mapContinent.properties.color="#4B0082"
                        break;
                    case "South America":
                        mapContinent.properties.color="#483D8B"
                        break;
                    default:    //Australia
                        mapContinent.properties.color="#9400D3"
                        break;
                }                    
            }
            
            this.#mapContinents.push(mapContinent);
        }
    };

    getContinents: () => Promise<Continent[]> = async () => {
        await this.#load();
        return this.#mapContinents;
    };

    #fetchContinents = async () => {
        const response = await fetch(
        'https://raw.githubusercontent.com/davidamebley/aws-services-status/files/continents.json'
        );
        const data = await response.json();
        this.#continents = data.features;
    };

};


export default LoadContinentsTask;