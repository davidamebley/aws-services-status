import React, { useEffect, useState } from 'react'

import LoadContinentsTask from '../../Tasks/LoadContinentsTask';
import { Continent } from '../../Types/Types';
import Legend from '../Legend/Legend';
import Loading from '../Misc/Loading';
import AWSServicesMap from '../ServicesMap/AWSServicesMap';

const AWSServices = () => {
    const [continents, setContinents] = useState<Continent[]>([]);

    useEffect(() => {
       loadContinents(); 
    }, []);

    const loadContinents =async () => {
        const loadContinentsTask = new LoadContinentsTask();
        const continents = await loadContinentsTask.getContinents();
        setContinents(continents);
    }

    useEffect(()=>{console.log(`continents: ${continents}`)}, [continents]);

  return (
    <div>
        {
            continents.length === 0 ? 
            (<Loading />) : 
            (   
                <div>
                    <AWSServicesMap continents={continents} />
                    <Legend />
                </div> 
            )
        }
    </div>
  )
}

export default AWSServices