import { Injectable } from '@angular/core';

import { Supplier } from './supplier';
import { SupplierService } from './supplier.service';

export const mockSuppliers: Supplier[] = [
  new Supplier('000000001', 'Alice', '123', 'http://example.com/alice.jpg', []),
  new Supplier('000000002', 'Bob', '234-x', 'http://example.com/bob.jpg', []),
  new Supplier('000000003', 'Charlie', '345a', 'http://example.com/charlie.png', []),
];

@Injectable()
export class MockSupplierService extends SupplierService {
  lastPromise: Promise<any>;

  getAll(): Promise<Supplier[]> {
    return this.lastPromise = Promise.resolve<Supplier[]>(mockSuppliers);
  }

  get(id: string): Promise<Supplier> {
    let supplier = mockSuppliers.find(s => s._id === id);
    return this.lastPromise = Promise.resolve<Supplier>(supplier);
  }

  remove(supplier: Supplier): Promise<boolean> {
    return this.lastPromise = Promise.resolve<boolean>(true);
  }
}
