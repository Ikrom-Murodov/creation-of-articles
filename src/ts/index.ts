import "../sass/style";

import View from "./view";
import Model from "./model";
import Controller from "./controller";

const model: Model = new Model({});

const view: View = new View({});

const controller: Controller = new Controller({
  Model: model,
  View: view
});
