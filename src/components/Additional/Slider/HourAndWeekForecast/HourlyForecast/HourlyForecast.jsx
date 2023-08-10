import React from 'react';
import Card from '../Card/Card';
import convertHourSlider from '../../../../../utils/convertHourSlider';
import cardsPerView from '../../../../../utils/cardsPerView';
import getIcon from '../../../../../utils/API/getIcon';

import './HourlyForecast.css';

const HourlyForecast = ({ forecast, isActive, startIndex, cardsInView }) => {
  const numberOfCards = cardsPerView();

  if (!forecast) {
    return (
      <ul className={`forecast-hour ${isActive ? 'choosen' : ''}`}>
        {Array.from({ length: numberOfCards }).map((_, index) => (
          <Card key={index} hourly={true} />
        ))}
      </ul>
    );
  }

  const hourData = convertHourSlider(forecast).slice(startIndex, startIndex + cardsInView);

  return (
    <ul className={`forecast-hour ${isActive ? 'choosen' : ''}`}>
      {hourData.map((hour) => (
        <Card
          key={hour.hour}
          title={hour.hour}
          max={`${hour.temp}°C`}
          hourly={true}
          iconUrl={getIcon(hour.description, true)}
          className='forecast-hour__card'
        />
      ))}
    </ul>
  );
};

export default HourlyForecast;
