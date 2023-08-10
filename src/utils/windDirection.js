const windDirection = (angle) => {
  const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];

  const degreesPerDirection = 360 / directions.length;
  const coef =
    Math.floor((angle + degreesPerDirection / 2) / degreesPerDirection) % directions.length;

  const rotation = coef * 45;

  return {
    direction: directions[coef],
    rotation: rotation + 45,
  };
};

export default windDirection;
