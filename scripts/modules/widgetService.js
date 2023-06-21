import { fetchWeather } from "./APIService.js";
import { renderWidgetForecast, renderWidgetOther, renderWidgetToday } from "./render.js";

export const startWidget = async () => {
  const widget = document.createElement('div');
  widget.classList.add('widget');


  const dataWeather = await fetchWeather('Новороссийск');

  if (dataWeather.success) {
    renderWidgetToday(widget, dataWeather);
    renderWidgetOther(widget);
  }


  renderWidgetForecast(widget);

  return widget
};

