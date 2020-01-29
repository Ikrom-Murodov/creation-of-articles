import View from "./view";
import Model from "./model";

interface IController {
  Model: Model;
  View: View;
}

class Controller {
  private Model: Model;
  private View: View;

  constructor(settings: IController) {
    this.Model = settings.Model;
    this.View = settings.View;

    this.init();
  }
  private init(): void {
    this.View.wrapperTabs.addEventListener("click", (event: any) => {
      if (event.target.tagName === "A") {
        this.View.wrapperTabsHandler(event);
      }
    });

    this.View.form.addEventListener("submit", () => {
      this.formHandler(event);
    });

    this.View.formDescription.addEventListener("change", () => {
      this.View.formChange(this.View.formDescription);
    });

    this.View.formTitle.addEventListener("change", () => {
      this.View.formChange(this.View.formTitle);
    });
  }

  private formHandler(event: Event) {
    event.preventDefault();
    if (
      this.View.formTitle.value.length < 3 ||
      this.View.formDescription.value.length < 10
    ) {
      this.View.formError();
    } else {
      this.View.formNoError();
    }
  }
}

export default Controller;
