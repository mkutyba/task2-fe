import { Component, OnInit } from '@angular/core';

import { SupplierService } from '../model/supplier.service';
import { Supplier } from '../model/supplier';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.css'],
})
export class SuppliersListComponent implements OnInit {
  suppliers: Supplier[] = [];
  error: boolean = false;
  removeError: boolean = false;
  loaded: boolean = false;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.supplierService
      .getAll()
      .then(suppliers => {
        this.suppliers = suppliers;
        this.loaded = true;
      })
      .catch(() => this.error = true);
  }

  remove(supplier: Supplier): void {
    this.removeError = false;
    this.supplierService
      .remove(supplier)
      .then(() => this.suppliers = this.suppliers.filter(s => s.id !== supplier.id))
      .catch(() => this.removeError = true);
  }

  reload(): void {
    this.loaded = false;
    this.error = false;
    this.ngOnInit();
  }
}
