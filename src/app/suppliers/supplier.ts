export class Supplier {
  _id: string;
  name: string;
  number: string;
  logo: string;

  constructor(_id, name, number, logo) {
    this._id = _id;
    this.name = name;
    this.number = number;
    this.logo = logo;
  }
}
