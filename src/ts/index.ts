import "../sass/style";

import View from "./view";
import Model from "./model";
import Controller from "./controller";

const model: Model = new Model({});

const view: View = new View({
  wrapperTabs: document.querySelector(".section-tabs__wrapper-item"),
  linkTabs: document.querySelectorAll(".section-tabs__link"),
  categoryTabs: document.querySelectorAll("#create, #post, #favorite"),
  form: document.querySelector(".form"),
  formTitle: document.querySelector(".form__input-title"),
  formDescription: document.querySelector(".form__input-textarea"),
  formType: document.querySelector(".form__type-post")
});

const controller: Controller = new Controller({
  Model: model,
  View: view
});
