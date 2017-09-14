import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { SupplierService } from '../model/supplier.service';
import { Supplier } from '../model/supplier';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {
  supplier: Supplier;
  error: boolean = false;
  loaded: boolean = false;

  constructor(private supplierService: SupplierService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initSupplier();
  }

  initSupplier(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.supplierService.get(params.get('id')))
      .subscribe(supplier => {
          this.supplier = supplier;
          this.loaded = true;

          this.supplierService.getItems(supplier._id)
            .then(items => {
              this.supplier.items = items;
              this.loaded = true;
            })
            .catch(() => this.error = true);
        },
        () => this.error = true);
  }

  reload(): void {
    this.loaded = false;
    this.error = false;
    this.ngOnInit();
  }
}
