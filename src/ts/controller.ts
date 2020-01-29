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
  }
}

export default Controller;
