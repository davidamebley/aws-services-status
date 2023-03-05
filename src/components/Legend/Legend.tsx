import React from 'react';

import './Legend.css';

const Legend = () => {
  return (
    <div className='container__legend'>
      <h5>AWS Service States</h5>
      <div>
        <ul>
          <li>
            <h6>Ok</h6>
            <div className="circle circle-ok"></div>
          </li>
          <li>
          <h6>Alarm</h6>
            <div className="circle circle-alarm"></div>
          </li>
          <li>
          <h6>Failure</h6>
            <div className="circle circle-failure"></div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Legend