import { Component, OnInit } from '@angular/core';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];
  error = false;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.supplierService
      .getSuppliers()
      .then(suppliers => this.suppliers = suppliers)
      .catch(() => this.error = true);
  }
}
