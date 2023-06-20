import { startWidget } from "./modules/widgetService.js";

const init = (app) => {
  const widget = startWidget();

  app.append(widget);
}



init(document.querySelector('#app'));