import {
  calculateDewPoint,
  convertPressure,
  gerWeatherForecasrData,
  getCurrentDateTime,
} from './utilis.js';

export const renderWidgetToday = (widget, data) => {
  const {dayOfMonth, month, year, hours, minutes, dayOfWeek} = getCurrentDateTime();

  widget.insertAdjacentHTML(
      'beforeEnd',
      `
      <div class="widget__today">
        <div class="widget__date-block">
          <p class="widget__date">${dayOfMonth} ${month} ${year}</p>
          <p class="widget__time">${hours}:${minutes}</p>
          <p class="widget__day">${dayOfWeek}</p>
        </div>
        <div class="widget__icon">
          <img class="widget__img" src="./icon/${data.weather[0].icon}.svg" alt="Погода">
        </div>
        <div class="widget__wheather">
          <div class="widget__city">
            <p>${data.name}</p>
            <button class="widget__change-city" aria-label="Изменить город"></button>
          </div>
          <p class="widget__temp-big">${(data.main.temp).toFixed(1)}°C</p>
          <p class="widget__felt">ощущается</p>
          <p class="widget__temp-small">${(data.main.feels_like).toFixed(1)} °C</p>
        </div>
      </div>
    `,
  );
};

export const renderWidgetOther = (widget, {wind: {speed, deg}, main: {temp, humidity, pressure}}) => {
  widget.insertAdjacentHTML(
      'beforeEnd',
      `
      <div class="widget__other">
        <div class="widget__wind">
          <p class="widget__wind-title">Ветер</p>
          <p class="widget__wind-speed">${speed} м/с</p>
          <p class="widget__wind-text" style="transform: rotate(${deg}deg)">&#8595;</p>

        </div>
        <div class="widget__humidity">
          <p class="widget__humidity-title">Влажность</p>
          <p class="widget__humidity-value">${humidity}%</p>
          <p class="widget__humidity-text">Т.Р: 
            ${calculateDewPoint(temp, humidity)} 
            °C</p>
        </div>
        <div class="widget__pressure">
          <p class="widget__pressure-title">Давление</p>
          <p class="widget__pressure-value">${convertPressure(pressure)}</p>
          <p class="widget__pressure-text">мм рт.ст.</p>
        </div>
      </div>
    `,
  );
};

export const renderWidgetForecast = (widget, data) => {
  const widgetForecast = document.createElement('ul');
  widgetForecast.className = 'widget__forecast';
  widget.append(widgetForecast);

  const forecastData = gerWeatherForecasrData(data);

  const items = forecastData.map((item) => {
    const widgetDateItem = document.createElement('li');
    widgetDateItem.className = 'widget__day-item';

    widgetDateItem.insertAdjacentHTML('beforeend', `
      <p class="widget__day-text">${item.dayOfWeek}</p>
      <img class="widget__day-img" src="./icon/${item.weatherIcon}.svg" alt="Погода">
      <p class="widget__day-temp">${(item.minTemp).toFixed(1)}°/${(item.maxTemp).toFixed(1)}°</p>
    `);
    return widgetDateItem;
  });

  widgetForecast.append(...items);
};

export const showError = (widget, error) => {
  widget.textContent = error.toString();
  widget.classList.add('widget_error');
  setTimeout(() => {
    location.reload();
  }, 2000);
};

