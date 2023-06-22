import {fetchForecast, fetchWeather} from './APIService.js';
import {renderWidgetForecast, renderWidgetOther, renderWidgetToday, showError} from './render.js';

export const startWidget = async () => {
  const city = 'Калининград'; // Новороссийск
  const widget = document.createElement('div');
  widget.classList.add('widget');


  const dataWeather = await fetchWeather(city);

  if (dataWeather.success) {
    renderWidgetToday(widget, dataWeather.data);
    renderWidgetOther(widget, dataWeather.data);
  } else {
    showError(dataWeather.error);
  }

  const dataForecast = await fetchForecast(city);
  console.log('dataForecast: ', dataForecast);


  if (dataForecast.success) {
    renderWidgetForecast(widget, dataForecast);
  } else {
    showError(dataForecast.error);
  }


  return widget;
};

