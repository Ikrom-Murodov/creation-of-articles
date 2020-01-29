interface IView {
  wrapperTabs: HTMLUListElement;
  linkTabs: NodeList;
  categoryTabs: NodeList;
  form: HTMLFormElement;
  formTitle: HTMLInputElement;
  formDescription: HTMLTextAreaElement;
  formType: HTMLSelectElement;
  sectionPost: HTMLDivElement;
}

interface ICreatePostsCard {
  nameTag: string;
  className: string;
  innerTag?: string;
  attributeName?: string;
  attributeValue?: string;
}

class View {
  readonly wrapperTabs: HTMLUListElement;
  private linkTabs: NodeList;
  private categoryTabs: NodeList;
  readonly form: HTMLFormElement;
  readonly formTitle: HTMLInputElement;
  readonly formDescription: HTMLTextAreaElement;
  readonly formType: HTMLSelectElement;
  readonly sectionPost: HTMLDivElement;

  constructor(settings: IView) {
    this.wrapperTabs = settings.wrapperTabs;
    this.linkTabs = settings.linkTabs;
    this.categoryTabs = settings.categoryTabs;
    this.form = settings.form;
    this.formTitle = settings.formTitle;
    this.formDescription = settings.formDescription;
    this.formType = settings.formType;
    this.sectionPost = settings.sectionPost;

    this.init();
  }
  private init() {}

  public wrapperTabsHandler(event: any): void {
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

  public formError(): void {
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

  public formNoError(): void {
    this.formDescription.value = "";
    this.formTitle.value = "";
    this.formDescription.placeholder = "Введите текст поста";
    this.formTitle.placeholder = "Введите название";
  }

  public formChange(element: HTMLElement) {
    element.classList.remove("errorForm");
  }

  public showPost(content: any) {
    this.sectionPost.innerText = "";
    for (let key in content) {
      const element: HTMLElement = this.createElementPost(
        content[key].title,
        content[key].type,
        content[key].description,
        content[key].date,
        key
      );
      this.sectionPost.appendChild(element);
    }
  }

  public buttonSaveDataHandler() {
    // Данный участок кода в будущем будет изменен так как это не соответствует шаблону проектированию MVC
    const buttons: NodeList = document.querySelectorAll(".post__button-save");
    buttons.forEach((element: HTMLButtonElement) => {
      element.addEventListener("click", () => {
        const id: string = element.getAttribute("id");
        if (id) {
          let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
          if (favorites.includes(id)) {
            element.textContent = "Сохранить";
            element.classList.remove("test");
            favorites = favorites.filter((fid: any) => fid !== id);
          } else {
            element.classList.add("test");
            element.textContent = "Удалить";
            favorites.push(id);
          }
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }
      });
    });
    // Данный участок кода в будущем будет изменен так как это не соответствует шаблону проектированию MVC //
  }

  private createElementPost(
    title: string,
    type: string,
    description: string,
    date: string,
    id: string
  ) {
    const post: HTMLElement = this.createElement({
      nameTag: "div",
      className: "post wrapper-posts__post"
    });

    const postContent: HTMLElement = this.createElement({
      nameTag: "div",
      className: "post__content"
    });

    const postWrapperTitle: HTMLElement = this.createElement({
      nameTag: "div",
      className: "post__wrapper-title"
    });

    const postTitle: HTMLElement = this.createElement({
      nameTag: "h3",
      className: "post__title",
      innerTag: title
    });

    const postType: HTMLElement = this.createElement({
      nameTag: "div",
      className: "post__type",
      innerTag: type
    });

    this.elementAppendChild(postWrapperTitle, postTitle, postType);

    const postWrapperDescription: HTMLElement = this.createElement({
      nameTag: "div",
      className: "post__wrapper-description"
    });

    const postDescription: HTMLElement = this.createElement({
      nameTag: "span",
      className: "post__description",
      innerTag: description
    });

    this.elementAppendChild(postWrapperDescription, postDescription);

    const postWrapperDate: HTMLElement = this.createElement({
      nameTag: "div",
      className: "post__wrapper-date"
    });

    const postDate: HTMLElement = this.createElement({
      nameTag: "div",
      className: "post__date",
      innerTag: date
    });

    // Данный участок кода в будущем будет изменен так как это не соответствует шаблону проектированию MVC
    const result = (
      JSON.parse(localStorage.getItem("favorites")) || []
    ).includes(id);
    // Данный участок кода в будущем будет изменен так как это не соответствует шаблону проектированию MVC //

    const postButton: HTMLElement = this.createElement({
      nameTag: "button",
      className: "post__button-save",
      attributeName: "id",
      attributeValue: id,
      innerTag: result ? "Удалить" : "Сохранить"
    });

    this.elementAppendChild(postWrapperDate, postDate, postButton);

    this.elementAppendChild(
      postContent,
      postWrapperTitle,
      postWrapperDescription,
      postWrapperDate
    );

    this.elementAppendChild(post, postContent);
    return post;
  }

  private createElement(settings: ICreatePostsCard): HTMLElement {
    const element: HTMLElement = document.createElement(settings.nameTag);
    element.className = settings.className;
    element.innerText = settings.innerTag || "";
    element.setAttribute(
      settings.attributeName || "data-name",
      settings.attributeValue || ""
    );
    return element;
  }

  private elementAppendChild(
    whereToPut?: HTMLElement,
    ...args: HTMLElement[]
  ): void {
    args.forEach(elements => {
      whereToPut.appendChild(elements);
    });
  }
}

export default View;
