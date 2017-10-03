import { Injectable } from '@angular/core';

import { Item } from './item';
import { ItemService } from './item.service';
import { mockSuppliers } from './mock-supplier.service';

export const mockItems: Item[] = [
  new Item('9991', '123-x-000', 123, true, 'http://example.com/123-x-000.jpg', 'Lorem ipsum dolor sit amet', '000000001', mockSuppliers[0]),
  new Item('9992', '234-w-000', 234, true, 'http://example.com/234-w-000.jpg', 'Lorem ipsum dolor sit amet', '000000003', mockSuppliers[2]),
  new Item('9993', '345-z-000', 345, true, 'http://example.com/345-z-000.jpg', 'Lorem ipsum dolor sit amet', '000000003', mockSuppliers[2]),
];

@Injectable()
export class MockItemService extends ItemService {
  lastPromise: Promise<any>;

  getAll(): Promise<Item[]> {
    return this.lastPromise = Promise.resolve<Item[]>(mockItems);
  }

  get(id: string): Promise<Item> {
    let item = mockItems.find(i => i.id === id);
    return this.lastPromise = Promise.resolve<Item>(item);
  }

  remove(item: Item): Promise<boolean> {
    return this.lastPromise = Promise.resolve<boolean>(true);
  }
}
