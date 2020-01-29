interface IView {}

class View {
  constructor(settings: IView) {
    this.init();
  }
  private init() {}
}

export default View;
