import { Supplier } from './supplier';

export class Item {
  constructor(public _id: string = '0',
              public number: string,
              public stock: number,
              public online: boolean,
              public image: string,
              public description: string,
              public supplier_id: string,
              public supplier: Supplier = new Supplier('', '', '', '', [])) {}

  clone() {
    return new Item(this._id, this.number, this.stock, this.online, this.image, this.description, this.supplier_id, this.supplier);
  }
}
