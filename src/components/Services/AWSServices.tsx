import React, { useEffect, useState } from 'react'
import LoadContinentsTask from '../../Tasks/LoadContinentsTask';
import Legend from '../Legend/Legend';
import Loading from '../Misc/Loading';
import AWSServicesMap from '../ServicesMap/AWSServicesMap';

const AWSServices = () => {
    const [continents, setContinents] = useState([]);

    const load = ()=>{
        const loadContinentsTask = new LoadContinentsTask();
        loadContinentsTask.load(setContinents);
    }

    useEffect(load, []);

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