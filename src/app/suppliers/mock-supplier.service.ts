import { Injectable } from '@angular/core';
import { Supplier } from './supplier';

export const MOCK_SUPPLIERS: Supplier[] = [
  new Supplier('000000001', 'Alice', '123', 'http://example.com/alice.jpg'),
  new Supplier('000000002', 'Bob', '234-x', 'http://example.com/bob.jpg'),
  new Supplier('000000003', 'Charlie', '345a', 'http://example.com/charlie.png'),
];

@Injectable()
export class MockSupplierService {
  lastPromise: Promise<any>;
  suppliers = MOCK_SUPPLIERS;

  getSuppliers(): Promise<Supplier[]> {
    return this.lastPromise = Promise.resolve<Supplier[]>(this.suppliers);
  }
}
