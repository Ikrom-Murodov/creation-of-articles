interface IView {
  wrapperTabs: HTMLUListElement;
  linkTabs: NodeList;
  categoryTabs: NodeList;
  form: HTMLFormElement;
  formTitle: HTMLInputElement;
  formDescription: HTMLTextAreaElement;
  formType: HTMLSelectElement;
}

class View {
  readonly wrapperTabs: HTMLUListElement;
  private linkTabs: NodeList;
  private categoryTabs: NodeList;
  readonly form: HTMLFormElement;
  readonly formTitle: HTMLInputElement;
  readonly formDescription: HTMLTextAreaElement;
  readonly formType: HTMLSelectElement;

  constructor(settings: IView) {
    this.wrapperTabs = settings.wrapperTabs;
    this.linkTabs = settings.linkTabs;
    this.categoryTabs = settings.categoryTabs;
    this.form = settings.form;
    this.formTitle = settings.formTitle;
    this.formDescription = settings.formDescription;
    this.formType = settings.formType;

    this.init();
  }
  private init() {}

  public wrapperTabsHandler(event: any) {
    const target = event.target;

    this.linkTabs.forEach((element: HTMLAnchorElement) => {
      element.classList.remove("section-tabs__link_active");
    });

    target.classList.add("section-tabs__link_active");

    this.categoryTabs.forEach((element: HTMLDivElement) => {
      element.classList.add("hide");

      if (target.getAttribute("data-name") == element.getAttribute("id")) {
        element.classList.remove("hide");
      }
    });
  }

  public formError() {
    if (this.formTitle.value.length < 3) {
      this.formTitle.value = "";
      this.formTitle.classList.add("errorForm");
      this.formTitle.placeholder = "Меньше чем трех символов вести нельзя";
    }

    if (this.formDescription.value.length < 10) {
      this.formDescription.value = "";
      this.formDescription.classList.add("errorForm");
      this.formDescription.placeholder =
        "Меньше чем десяти символов вести нельзя";
    }
  }

  public formNoError() {
    this.formDescription.value = "";
    this.formTitle.value = "";
    this.formDescription.placeholder = "Введите текст поста";
    this.formTitle.placeholder = "Введите название";
  }

  public formChange(element: HTMLElement) {
    element.classList.remove("errorForm");
  }
}

export default View;
