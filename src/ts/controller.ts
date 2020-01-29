import View from "./view";
import Model from "./model";

interface IController {
  Model: Model;
  View: View;
}

interface IContentData {
  title: string;
  description: string;
  type: string;
  date: string;
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
      this.wrapperTabsHandler(event);
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

  private async wrapperTabsHandler(event: any) {
    if (event.target.tagName === "A") {
      this.View.wrapperTabsHandler(event);
    }

    if (event.target.getAttribute("data-name") === "post") {
      const response = await this.Model.getData();
      this.View.showPost(response);
      this.View.buttonSaveDataHandler();
    }
  }

  private formHandler(event: Event): void {
    event.preventDefault();
    if (
      this.View.formTitle.value.length < 3 ||
      this.View.formDescription.value.length < 10
    ) {
      this.View.formError();
    } else {
      const content: IContentData = {
        title: this.View.formTitle.value,
        description: this.View.formDescription.value,
        type: this.View.formType.value,
        date: new Date().toLocaleDateString()
      };
      this.Model.saveData(content);
      this.View.formNoError();
    }
  }
}

export default Controller;
