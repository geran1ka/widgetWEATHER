import {startWidget} from './modules/widgetService.js';

const init = async (app) => {
  const widget = await startWidget();

  app.append(widget);
};
/*
const init = (app) => {
  startWidget().then(widget => {
    app.append(widget);
  });
}
*/
init(document.querySelector('#app'));
