import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ItemService } from '../model/item.service';
import { Item } from '../model/item';
import { SupplierService } from '../model/supplier.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item: Item;
  error: boolean = false;
  loaded: boolean = false;

  constructor(private itemService: ItemService,
              private supplierService: SupplierService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initItem();
  }

  initItem(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.itemService.get(params.get('id')))
      .subscribe(item => {
          this.item = item;
          this.supplierService.get(item.supplier_id)
            .then(supplier => {
              item.supplier = supplier;
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
