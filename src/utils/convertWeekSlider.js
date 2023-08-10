import formatDate from './formatDate';

const convertWeekSlider = (data) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  let groupedData = {};
  data.forEach((item) => {
    const date = new Date(item.dt * 1000);
    if (date.toDateString() === today.toDateString()) {
      return;
    }

    const formattedDate =
      date.toDateString() === tomorrow.toDateString() ? 'Завтра' : formatDate(date);
    if (!groupedData[formattedDate]) {
      groupedData[formattedDate] = {
        tempsMax: [],
        tempsMin: [],
        descriptions: [],
      };
    }

    groupedData[formattedDate].tempsMax.push(item.main.temp_max);
    groupedData[formattedDate].tempsMin.push(item.main.temp_min);
    groupedData[formattedDate].descriptions.push(item.weather[0].icon);
  });

  let result = [];
  let allTempsMax = [];
  let allTempsMin = [];
  let lastDescription = null;

  Object.entries(groupedData).forEach(([key, value]) => {
    const tempMax = Math.round(Math.max(...value.tempsMax));
    const tempMin = Math.round(Math.min(...value.tempsMin));
    const mostCommonDescription = [...value.descriptions]
      .sort(
        (a, b) =>
          value.descriptions.filter((v) => v === a).length -
          value.descriptions.filter((v) => v === b).length
      )
      .pop();

    result.push({
      date: key,
      temp_max: tempMax,
      temp_min: tempMin,
      description: mostCommonDescription,
    });

    allTempsMax = allTempsMax.concat(value.tempsMax);
    allTempsMin = allTempsMin.concat(value.tempsMin);
    lastDescription = mostCommonDescription;
  });

  let averageMaxFromResult = 0;
  let averageMinFromResult = 0;

  if (result.length > 0) {
    averageMaxFromResult = Math.round(
      result.reduce((acc, curr) => acc + curr.temp_max, 0) / result.length
    );
    averageMinFromResult = Math.round(
      result.reduce((acc, curr) => acc + curr.temp_min, 0) / result.length
    );
  }

  let currentDate = new Date(tomorrow.setDate(today.getDate() + 6));

  while (result.length < 7) {
    result.push({
      date: formatDate(currentDate),
      temp_max: averageMaxFromResult,
      temp_min: averageMinFromResult,
      description: lastDescription,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
};

export default convertWeekSlider;
