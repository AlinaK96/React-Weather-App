const checkCityInHistory = (city) => {
  const history = localStorage.getItem('searchHistory');
  const historyArray = history ? JSON.parse(history) : [];

  if (historyArray.includes(city)) {
    throw new Error(`Этот город уже есть в истории - ${city}`);
  }
};

export default checkCityInHistory;
