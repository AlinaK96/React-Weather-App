import React, { useState, useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import { WeatherContext } from '../../context/WeatherContext';

import Sidebar from '../Sidebar/Sidebar';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import translateToRU from '../../utils/translateToRU';
import formatDate from '../../utils/formatDate';
import getIcon from '../../utils/API/getIcon';

import './Main.css';

const Main = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const { city, isLoading, historyOnLoad, weather } = useContext(WeatherContext);

  const themeButtonClass = darkTheme ? 'active' : '';

  if (!weather) {
    return (
      <section className='main-info'>{(isLoading || historyOnLoad) && <LoadingOverlay />}</section>
    );
  }

  const temperature = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const weatherDescription = translateToRU(weather.weather[0].main);
  const currentDate = formatDate(new Date(weather.dt_txt));
  const iconUrl = getIcon(weather.weather[0].icon);

  return (
    <section className='main-info'>
      {(isLoading || historyOnLoad) && <LoadingOverlay />}
      <div className='main-info__button-block'>
        <button id='main-info__open-sidebar' onClick={() => setSidebarActive(true)}>
          Поиск города
        </button>
        <button
          id='main-info__switch-theme'
          className={themeButtonClass}
          onClick={() => toggleTheme()}
        ></button>
      </div>
      <div
        className='main-info__center-img'
        style={{ background: `url(${iconUrl}) no-repeat center` }}
      ></div>
      <div className='main-info__big-info'>
        <p className='main-info__temperature'>
          <span className='temperature__degree'>{temperature}</span> °C
        </p>
        <h2 className='main-info__weather'>{weatherDescription}</h2>
        <span className='main-info__feelslike'>Ощущается как {feelsLike} °C</span>
      </div>
      <div className='main-info__small-info'>
        <div className='main-info__date-inner'>
          <p className='main-info__small-date'>Сегодня</p>
          <p className='main-info__small-date'>{currentDate}</p>
        </div>
        <div className='main-info__location'>
          <div className='main-info__location-svg'></div>
          <span className='main-info__location-city'>{city}</span>
        </div>
      </div>
      <Sidebar active={sidebarActive} closeSidebar={() => setSidebarActive(false)} />
    </section>
  );
};

export default Main;
