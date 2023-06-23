import {citySericeSearch} from './modules/citySericeSearch.js';
import {startWidget} from './modules/widgetService.js';

const init = async (app) => {
  const widget = await startWidget();

  app.append(widget);
  citySericeSearch(widget);
};

init(document.querySelector('#app'));
