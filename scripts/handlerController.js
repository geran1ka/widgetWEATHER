import {fetchForecast, fetchWeather} from './modules/APIService.js';
import {renderForm, renderWidgetForecast, renderWidgetOther, renderWidgetToday, showError} from './modules/render.js';

export const handlerController = (widget, form, btnEdit, app) => {
  btnEdit.addEventListener('click', () => {
    widget.append(form);

    form.addEventListener('submit', async e => {
      e.preventDefault();

      const formData = new FormData(form);
      const city = Object.fromEntries(formData);
      const dataWeather = await fetchWeather(city.city);
      widget.textContent = '';
      if (dataWeather.success) {
        renderWidgetToday(widget, dataWeather.data);
        renderWidgetOther(widget, dataWeather.data);
      } else {
        showError(dataWeather.error);
      }

      const dataForecast = await fetchForecast(city.city);


      if (dataForecast.success) {
        renderWidgetForecast(widget, dataForecast.data);
      } else {
        showError(dataForecast.error);
      }
      app.append(widget);
    });
  });
};
