import React from 'react';

import './Loading.css';

const Loading = () => {
  return (
    <div className='loading-spinner'>
        <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-info" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}

export default Loading