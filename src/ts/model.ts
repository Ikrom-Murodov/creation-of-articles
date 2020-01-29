interface IModel {
  url: string;
}

interface IContentData {
  title: string;
  description: string;
  type: string;
  date: string;
}

class Model {
  private url: string;

  constructor(settings: IModel) {
    this.url = settings.url;
  }

  public async saveData(content: IContentData): Promise<void> {
    try {
      const response = await fetch(`${this.url}/posts.json`, {
        method: "POST",
        body: JSON.stringify(content)
      });
      if (response.status == 404) {
        console.log("Страница не найдено", response.url);
      }
    } catch (error) {
      console.log(new Error(`Ошибка ${error}`));
    }
  }

  public async getData() {
    const response: Response = await fetch(`${this.url}/posts.json`);
    const responseJSON = await response.json();
    return responseJSON;
  }

  public async getDataFavorite() {
    const arr: string[] = [];

    const responseLS = JSON.parse(localStorage.getItem("favorites"));

    for (let index = 0; index < responseLS.length; index++) {
      const element = responseLS[index];
      const response = await fetch(`${this.url}/posts/${element}.json`);
      const responseJSON = await response.json();
      arr.push(responseJSON);
    }

    return arr;
  }
}

export default Model;
