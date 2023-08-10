const formatDate = (date) => {
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  let formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(date);
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1, -1);
};

export default formatDate;
