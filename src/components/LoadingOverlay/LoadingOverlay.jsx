import React from 'react';
import './LoadingOverlay.css';

const LoadingOverlay = () => {
  return (
    <div className='loading-overlay'>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
