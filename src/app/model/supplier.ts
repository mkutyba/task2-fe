import { Item } from './item';

export class Supplier {
  constructor(public id: string = '0',
              public name: string,
              public number: string,
              public logo: string,
              public items: Item[]) {}

  clone() {
    return new Supplier(this.id, this.name, this.number, this.logo, this.items);
  }
}
