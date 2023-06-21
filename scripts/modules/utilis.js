const addZero = (n) => (n < 10 ? `0${n}` : n);

export const getCurrentDateTime = () => {
  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];

  const weekdays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];

  const date = new Date();
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const dayOfWeek = weekdays[date.getDay()];

  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  return {dayOfMonth, month, year, hours, minutes, dayOfWeek};
};

export const getDewPointTemperature = (temp, humidity) => {
  const formula = (17.27 * temp) / (237.7 + temp) + Math.log(humidity / 100);
  return 237.7 * formula / (17.27 - formula);
}

export const getDirectionWind = (deg) => {
  switch (true) {
    case 0:
      return '&#8593;';
    case (deg > 0 && deg < 90):
      return '&#8599;';
    case 90:
      return '&#8594;';
    case deg > 90 && deg < 180:
      return '&#8600;';
    case 180:
      return '&#8595;';
    case deg > 180 && deg < 270:
      return '&#8601;';
    case 270:
      return '&#8592;';
    case deg > 270 && deg < 360:
      return '&#8598;';
  }
};