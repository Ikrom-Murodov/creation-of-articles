interface IView {
  wrapperTabs: HTMLUListElement;
  linkTabs: NodeList;
  categoryTabs: NodeList;
}

class View {
  readonly wrapperTabs: HTMLUListElement;
  private linkTabs: NodeList;
  private categoryTabs: NodeList;

  constructor(settings: IView) {
    this.wrapperTabs = settings.wrapperTabs;
    this.linkTabs = settings.linkTabs;
    this.categoryTabs = settings.categoryTabs;

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
}

export default View;
