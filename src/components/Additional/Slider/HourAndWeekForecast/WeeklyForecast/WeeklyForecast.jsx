import React from 'react';
import Card from '../Card/Card';
import convertWeekSlider from '../../../../../utils/convertWeekSlider';
import cardsPerView from '../../../../../utils/cardsPerView';
import getIcon from '../../../../../utils/API/getIcon';

import './WeeklyForecast.css';

const WeeklyForecast = ({ forecast, isActive, startIndex, cardsInView }) => {
  const numberOfCards = cardsPerView();

  if (!forecast) {
    return (
      <ul className={`forecast-week ${isActive ? 'choosen' : ''}`}>
        {Array.from({ length: numberOfCards }).map((_, index) => (
          <Card key={index} />
        ))}
      </ul>
    );
  }

  const weekData = convertWeekSlider(forecast).slice(startIndex, startIndex + cardsInView);

  return (
    <ul className={`forecast-week ${isActive ? 'choosen' : ''}`}>
      {weekData.map((day) => (
        <Card
          key={day.date}
          title={day.date}
          max={`${day.temp_max}°C`}
          min={`${day.temp_min}°C`}
          iconUrl={getIcon(day.description, true)}
          className='forecast-week__card'
        />
      ))}
    </ul>
  );
};

export default WeeklyForecast;
