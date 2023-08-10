import React, { useContext } from 'react';
import { WeatherContext } from '../../../../../context/WeatherContext';
import LoadingOverlay from '../../../../LoadingOverlay/LoadingOverlay';

import './Card.css';

const Card = ({ title, max, min, iconUrl, hourly = false }) => {
  const { isLoading, historyOnLoad } = useContext(WeatherContext);
  const cardClass = hourly ? 'forecast-hour__card' : 'forecast-week__card';

  return (
    <li
      className={`${cardClass}`}
      style={{ background: `url(${iconUrl}) no-repeat var(--background-light) center 24px` }}
    >
      {(isLoading || historyOnLoad) && <LoadingOverlay />}
      <div className='card__title'>{title}</div>
      <div className='card__info'>
        <span className='info__max'>{max}</span>
        {!hourly && <span className='info__min'>{min}</span>}
      </div>
    </li>
  );
};

export default Card;
