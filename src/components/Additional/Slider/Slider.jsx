import React, { useState, useContext, useEffect } from 'react';
import { WeatherContext } from '../../../context/WeatherContext';
import cardsPerView from '../../../utils/cardsPerView';

import WeeklyForecast from './HourAndWeekForecast/WeeklyForecast/WeeklyForecast';
import HourlyForecast from './HourAndWeekForecast/HourlyForecast/HourlyForecast';
import Switcher from './Switcher/Switcher';

import './Slider.css';

const Slider = () => {
  const [isHourly, setIsHourly] = useState(false);
  const { forecast } = useContext(WeatherContext);

  const [hourlyStartIndex, setHourlyStartIndex] = useState(0);
  const [weeklyStartIndex, setWeeklyStartIndex] = useState(0);
  const [cardsInView, setCardsInView] = useState(cardsPerView());

  useEffect(() => {
    const updateCardsInView = () => {
      setCardsInView(cardsPerView());
    };

    window.addEventListener('resize', updateCardsInView);
    return () => {
      window.removeEventListener('resize', updateCardsInView);
    };
  }, []);

  useEffect(() => {
    setHourlyStartIndex(0);
    setWeeklyStartIndex(0);
  }, [cardsInView]);

  const handleSlideLeft = () => {
    if (isHourly && hourlyStartIndex > 0) {
      setHourlyStartIndex((prevIndex) => prevIndex - 1);
    } else if (!isHourly && weeklyStartIndex > 0) {
      setWeeklyStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSlideRight = () => {
    if (isHourly && hourlyStartIndex + cardsInView < 12) {
      setHourlyStartIndex((prevIndex) => prevIndex + 1);
    } else if (!isHourly && weeklyStartIndex + cardsInView < 7) {
      setWeeklyStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const isLeftButtonDisabled =
    (isHourly && hourlyStartIndex <= 0) || (!isHourly && weeklyStartIndex <= 0);
  const isRightButtonDisabled =
    (isHourly && hourlyStartIndex + cardsInView >= 12) ||
    (!isHourly && weeklyStartIndex + cardsInView >= 7);

  return (
    <div className='forecast-switcher'>
      <Switcher isHourly={isHourly} setIsHourly={setIsHourly} />
      <div className='forecast-switcher__cards-container'>
        <button
          disabled={isLeftButtonDisabled}
          className={`forecast-switcher__arrow-button cards-container__arrow-left ${
            isLeftButtonDisabled ? 'disabled' : ''
          }`}
          id='swipe-left-btn'
          onClick={handleSlideLeft}
        ></button>

        <WeeklyForecast
          forecast={forecast}
          startIndex={weeklyStartIndex}
          cardsInView={cardsInView}
          isActive={!isHourly}
        />
        <HourlyForecast
          forecast={forecast}
          startIndex={hourlyStartIndex}
          cardsInView={cardsInView}
          isActive={isHourly}
        />

        <button
          disabled={isRightButtonDisabled}
          className={`forecast-switcher__arrow-button cards-container__arrow-right ${
            isRightButtonDisabled ? 'disabled' : ''
          }`}
          id='swipe-right-btn'
          onClick={handleSlideRight}
        ></button>
      </div>
    </div>
  );
};

export default Slider;
