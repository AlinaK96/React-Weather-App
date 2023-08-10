import React, { useContext } from 'react';
import { WeatherContext } from '../../../context/WeatherContext';
import windDirection from '../../../utils/windDirection';
import './DetailsForToday.css';
import convertPressure from '../../../utils/convertPressure';

import Detail from './Detail/Detail';

const DetailsForToday = () => {
  const { weather } = useContext(WeatherContext);

  if (!weather) {
    return (
      <div className='details-for-today'>
        <h3 className='details-for-today__title'>Подробно на сегодня</h3>
        <div className='details-for-today__details-container'>
          <Detail additionalClass='detail-wind' />
          <Detail additionalClass='detail-humidity' />
          <Detail additionalClass='detail-visibility' />
          <Detail additionalClass='detail-pressure' />
        </div>
      </div>
    );
  }

  const { direction, rotation } = windDirection(weather.wind.deg);

  const arrowRotationStyle = {
    transform: `rotate(${rotation}deg)`,
  };

  return (
    <div className='details-for-today'>
      <h3 className='details-for-today__title'>Подробно на сегодня</h3>
      <div className='details-for-today__details-container'>
        <Detail
          title='Скорость ветра'
          value={Math.round(weather.wind.speed)}
          unit='м/с'
          additionalClass='detail-wind'
          windDirection={direction}
          windDirectionStyle={arrowRotationStyle}
        />
        <Detail
          title='Влажность'
          value={weather.main.humidity}
          unit='%'
          additionalClass='detail-humidity'
        />
        <Detail
          title='Видимость'
          value={weather.visibility / 1000}
          unit='км'
          additionalClass='detail-visibility'
        />
        <Detail
          title='Давление'
          value={convertPressure(weather.main.pressure)}
          unit='мм рт. ст.'
          additionalClass='detail-pressure'
        />
      </div>
    </div>
  );
};

export default DetailsForToday;
