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
};

export const calculateDewPoint = (temp, humidity) => {
  const a = 17.27;
  const b = 237.7;

  const ft = (a * temp) / (b + temp) + Math.log(humidity / 100);
  const dewPoint = b * ft / (a - ft);
  return dewPoint.toFixed(1);
};

export const convertPressure = (pressure) => {
  const mmHg = pressure * 0.750063755419211;
  return mmHg.toFixed(2);
};

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

export const getWindDirection = (deg) => {
  const directions = ['&#8593;', '&#8598;', '&#8592;', '&#8601;', '&#8595;', '&#8600;', '&#8594;', '&#8594;'];

  const i = Math.round(deg / 45) % 8;

  return directions[i];
};

export const gerWeatherForecasrData = (data) => {
  const forecast = data.list.filter(
      (item) => new Date(item.dt_txt).getHours() === 9 &&
      new Date(item.dt_txt).getDate() > new Date().getDate(),
  );

  const forecastData = forecast.map((item) => {
    const date = new Date(item.dt_txt);
    const weekdaysShort = [
      'вс',
      'пн',
      'вт',
      'ср',
      'чт',
      'пт',
      'сб',
    ];

    const dayOfWeek = weekdaysShort[date.getDay()];
    const weatherIcon = item.weather[0].icon;

    let minTemp = Infinity;
    let maxTemp = -Infinity;

    for (let i = 0; i < data.list.length; i++) {
      const temp = data.list[i].main.temp;
      const tempDate = new Date(data.list[i].dt_txt);

      if (tempDate.getDate() === date.getDate()) {
        if (temp < minTemp) {
          minTemp = temp;
        }
        if (temp > maxTemp) {
          maxTemp = temp;
        }
      }
    }

    return {
      dayOfWeek,
      weatherIcon,
      minTemp,
      maxTemp,
    };
  });

  return forecastData;
};
