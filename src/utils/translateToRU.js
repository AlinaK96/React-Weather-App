const translateToRU = (description) => {
  const data = {
    Thunderstorm: 'Гроза',
    Drizzle: 'Морось',
    Rain: 'Дождь',
    Snow: 'Снег',
    Clear: 'Ясно',
    Clouds: 'Облачно',
  };

  return data[description] || 'Туман';
};

export default translateToRU;
