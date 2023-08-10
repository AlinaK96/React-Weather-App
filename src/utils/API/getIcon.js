const getIcon = (data, card = false) => {
  return card
    ? `http://openweathermap.org/img/wn/${data}@2x.png`
    : `http://openweathermap.org/img/wn/${data}@4x.png`;
};

export default getIcon;
