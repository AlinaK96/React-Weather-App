const convertHourSlider = (data) => {
  const formatDate = (date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
  };

  let currentHour = new Date();
  currentHour.setMinutes(0, 0, 0);
  currentHour.setHours(currentHour.getHours() + 1);

  let results = [];
  for (let i = 0; i < data.length - 1 && results.length < 12; i++) {
    let tempStart = data[i].main.temp;
    let tempEnd = data[i + 1].main.temp;
    let averageTemp = (tempStart + tempEnd) / 2;
    let description = data[i].weather[0].icon;

    const hoursDifference =
      new Date(data[i + 1].dt * 1000).getHours() - new Date(data[i].dt * 1000).getHours();

    for (let j = 0; j < hoursDifference && results.length < 12; j++) {
      results.push({
        hour: formatDate(currentHour),
        temp: Math.round(averageTemp),
        description: description,
      });
      currentHour.setHours(currentHour.getHours() + 1);
    }
  }
  return results;
};

export default convertHourSlider;
