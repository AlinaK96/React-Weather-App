const convertPressure = (pressureInHPa) => {
  return Math.floor(pressureInHPa * 0.750062);
};

export default convertPressure;
