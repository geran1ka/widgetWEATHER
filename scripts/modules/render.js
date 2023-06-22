import {calculateDewPoint, convertPressure, gerWeatherForecasrData, getCurrentDateTime, getDewPointTemperature, getDirectionWind, getWindDirection} from './utilis.js';

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
          <p class="widget__temp-big">${(data.main.temp - 273.15).toFixed(1)}°C</p>
          <p class="widget__felt">ощущается</p>
          <p class="widget__temp-small">${(data.main.feels_like - 273.15).toFixed(1)} °C</p>
        </div>
      </div>
    `,
  );
};

export const renderWidgetOther = (widget, data) => {
  console.log('data: ', data);
  widget.insertAdjacentHTML(
      'beforeEnd',
      `
      <div class="widget__other">
        <div class="widget__wind">
          <p class="widget__wind-title">Ветер</p>
          <p class="widget__wind-speed">${data.wind.speed} м/с</p>
          <p class="widget__wind-text">${getWindDirection(data.wind.deg)}</p>

        </div>
        <div class="widget__humidity">
          <p class="widget__humidity-title">Влажность</p>
          <p class="widget__humidity-value">${data.main.humidity}%</p>
          <p class="widget__humidity-text">Т.Р: 
            ${calculateDewPoint((data.main.feels_like - 273.15), data.main.humidity)} 
            °C</p>
        </div>
        <div class="widget__pressure">
          <p class="widget__pressure-title">Давление</p>
          <p class="widget__pressure-value">${convertPressure(data.main.pressure)}</p>
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

    widgetDateItem.insertAdjacentElement('beforebegin', `
      <p class="widget__day-text">${item.dayOfWeek}</p>
      <img class="widget__day-img" src="./icon/${item.weatherIcon}.svg" alt="Погода">
      <p class="widget__day-temp">${(item.minTemp - 273.15).toFixed(1)}°/${(item.maxTemp - 273.15).toFixed(1)}°</p>
    `);
    return widgetDateItem;
  });

  widgetForecast.append(...items);
};

export const showError = (widget, error) => {
  widget.textContent = error.toString();
  widget.classList.add('widget_error');
};
/*
{

  const nord = 0; &#8593;
  const nordEast = 45; &#8599;
  const east = 90; &#8594;
  const southEast = 135; &#8600;
  const south = 180; &#8595;
  const southWest = 225; &#8601;
  const west = 270; &#8592;
  const nordWest = 315; &#8598;

}*/

