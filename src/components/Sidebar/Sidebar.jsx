import React, { useState, useEffect, useContext } from 'react';
import searchCity from '../../utils/API/getCity';
import getWeather from '../../utils/API/getWeather.js';

import { WeatherContext } from '../../context/WeatherContext.js';
import checkCityInHistory from '../../utils/checkCityInHistory.js';

import './Sidebar.css';

const Sidebar = ({ active, closeSidebar }) => {
  const {
    setIsLoading,
    isLoading,
    isLoadingHistory,
    setIsLoadingHistory,
    setCity,
    setHistoryOnLoad,
  } = useContext(WeatherContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedCityIndex, setSelectedCityIndex] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [isActionInProgress, setIsActionInProgress] = useState(false);

  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    const historyCityIndex = localStorage.getItem('selectedCityIndex');

    if (history) {
      setSearchHistory(JSON.parse(history));
    }
    if (historyCityIndex) {
      setSelectedCityIndex(Number(historyCityIndex));
    }
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const updateCity = (newCity) => {
    setCity(newCity.location);
    localStorage.setItem('city', newCity.location);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsActionInProgress(true);

    if (!searchQuery.trim()) {
      setSearchError('Поле поиска не может быть пустым');
      setTimeout(() => {
        setSearchError(null);
      }, 3000);
      setSearchQuery('');
      setIsActionInProgress(false);
      return;
    }

    setIsLoading(true);

    try {
      const locationData = await searchCity(searchQuery); // Поиск города
      checkCityInHistory(locationData.location); // Проверка наличия города в истории
      await getWeather(locationData.lat, locationData.lon); // Поиск прогноза по координатам
      const newHistory = [locationData.location, ...searchHistory].slice(0, 5);
      updateCity(locationData);
      setSearchHistory(newHistory);
      setSelectedCityIndex(0);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      localStorage.setItem('selectedCityIndex', '0');
      setSearchQuery('');
      closeSidebar();
    } catch (error) {
      setSearchError(error.message);
      setSearchQuery('');

      setTimeout(() => {
        setSearchError(null);
      }, 3000);
    }

    setIsLoading(false);
    setIsActionInProgress(false);
  };

  const handleClickHistoryItem = async (location, index) => {
    setIsActionInProgress(true);
    setHistoryOnLoad(true);
    setIsLoadingHistory({ ...isLoadingHistory, [index]: true });

    try {
      setSelectedCityIndex(index);
      const locationData = await searchCity(location);
      await getWeather(locationData.lat, locationData.lon);
      updateCity(locationData);
      localStorage.setItem('selectedCityIndex', index.toString());
      closeSidebar();
    } catch (error) {
      setSearchError(error.message);
      setTimeout(() => {
        setSearchError(null);
      }, 3000);
    }

    setIsLoadingHistory({ ...isLoadingHistory, [index]: false });
    setHistoryOnLoad(false);
    setIsActionInProgress(false);
  };

  return (
    <aside className={`sidebar ${active ? 'sidebar-active' : ''}`}>
      <div className='sidebar__button-close'>
        <button id='sidebar__close-sidebar' onClick={closeSidebar}></button>
      </div>
      <form
        id='sidebar__search-city'
        className={isLoading ? 'loading' : ''}
        onSubmit={handleSubmit}
      >
        {searchError && <div className='error-message'>{searchError}</div>}
        <label htmlFor='sidebar__input'>Найти город</label>
        <input
          type='search'
          id='sidebar__input'
          placeholder='Москва'
          value={searchQuery}
          onChange={handleInputChange}
          autoComplete='off'
          pattern='^[?!,.\-а-яА-ЯёЁ\s]+$'
          title='Пожалуйста, используйте только кириллицу'
        />
        <button type='submit' id='sidebar__find-city' disabled={!searchQuery || isActionInProgress}>
          Найти
        </button>
      </form>
      <ul className='sidebar__search-history'>
        {searchHistory.map((city, index) => (
          <li
            className={`search-history__container${
              index === selectedCityIndex ? ' city-choosen' : ''
            }`}
            key={index}
            onClick={() => {
              if (!isActionInProgress) {
                handleClickHistoryItem(city, index);
              }
            }}
          >
            <span className='container__city'>{city}</span>
            <div
              className={`container__divider${
                index === selectedCityIndex ? ' container__arrow' : ''
              }${isLoadingHistory[index] ? ' container__arrow-spin' : ''}`}
            ></div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
