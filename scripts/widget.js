import { handlerController } from './handlerController.js';
import {startWidget} from './modules/widgetService.js';

const init = async (app) => {
  const {widget, form, btnEdit} = await startWidget();
 
  app.append(widget);
  handlerController(widget, form, btnEdit, app);
};
/*
const init = (app) => {
  startWidget().then(widget => {
    app.append(widget);
  });
}
*/
init(document.querySelector('#app'));
