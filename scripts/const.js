const btnEdit = document.querySelector('.widget__change-city');
btnEdit.addEventListener('click', () => {
});

const form = renderForm();
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

  return widget;
});
