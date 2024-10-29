export abstract class Transformer<T> {
  abstract transform(response: T): any;

  handle(response: T | T[]): any {
    if (Array.isArray(response)) {
      return response.map((item: T) => this.transform(item));
    }

    return this.transform(response);
  }
}
