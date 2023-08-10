import React, { useContext } from 'react';
import { WeatherContext } from '../../../../context/WeatherContext';

import LoadingOverlay from '../../../LoadingOverlay/LoadingOverlay';

import './Detail.css';

const Detail = ({ title, value, unit, additionalClass, windDirection, windDirectionStyle }) => {
  const { isLoading, historyOnLoad } = useContext(WeatherContext);

  return (
    <article className={`detail ${additionalClass}`}>
      {(isLoading || historyOnLoad) && <LoadingOverlay />}
      <h5 className='detail__title'>{title}</h5>
      <p className='detail__info'>
        <span className='info__value'>{value} </span>
        <span className='info__unit'>{unit}</span>
      </p>
      {windDirection && (
        <div className='detail__wind-direction'>
          <div className='wind-direction__img' style={windDirectionStyle}></div>
          <span>{windDirection}</span>
        </div>
      )}
      {title === 'Влажность' && (
        <div className='detail__progress-bar-container'>
          <div className='progress-bar' style={{ width: `${value}%` }}></div>
          <div className='progress-bar__numbers'>
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
          <div className='progress-bar__percent'>%</div>
        </div>
      )}
    </article>
  );
};

export default Detail;
