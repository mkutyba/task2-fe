export class Supplier {
  constructor(public _id: string = '0',
              public name: string,
              public number: string,
              public logo: string) {}

  clone() {
    return new Supplier(this._id, this.name, this.number, this.logo);
  }
}
