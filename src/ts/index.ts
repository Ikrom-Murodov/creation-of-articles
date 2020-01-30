import "../sass/style";

import View from "./view";
import Model from "./model";
import Controller from "./controller";

const model: Model = new Model({
  url: "https://post-fb8f6.firebaseio.com/"
});

const view: View = new View({
  wrapperTabs: document.querySelector(".section-tabs__wrapper-item"),
  linkTabs: document.querySelectorAll(".section-tabs__link"),
  categoryTabs: document.querySelectorAll("#create, #post, #favorite"),
  form: document.querySelector(".form"),
  formTitle: document.querySelector(".form__input-title"),
  formDescription: document.querySelector(".form__input-textarea"),
  formType: document.querySelector(".form__type-post"),
  sectionPost: document.querySelector(".wrapper-posts"),
  sectionFavorite: document.querySelector(".favorite")
});

const controller: Controller = new Controller({
  Model: model,
  View: view
});

// Данный фрагмент кода будет изменен
(() => {
  document.querySelector(".section").classList.add("hide");
  if (localStorage.getItem("visited")) {
    document.querySelector(".header").classList.add("hide");
    document.querySelector(".section").classList.remove("hide");
  } else {
    document.querySelector(".header__button").addEventListener("click", () => {
      document.querySelector(".header").classList.add("hide");
      localStorage.setItem("visited", JSON.stringify(true));
      document.querySelector(".section").classList.remove("hide");
    });
  }
})();
// Данный фрагмент кода будет изменен //
