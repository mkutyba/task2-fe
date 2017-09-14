import { Component, OnInit } from '@angular/core';

import { ItemService } from '../model/item.service';
import { Item } from '../model/item';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent implements OnInit {
  items: Item[] = [];
  error: boolean = false;
  removeError: boolean = false;
  loaded: boolean = false;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService
      .getAll()
      .then(items => {
        this.items = items;
        this.loaded = true;
      })
      .catch(() => this.error = true);
  }

  remove(item: Item): void {
    this.removeError = false;
    this.itemService
      .remove(item)
      .then(() => this.items = this.items.filter(i => i._id !== item._id))
      .catch(() => this.removeError = true);
  }

  reload(): void {
    this.loaded = false;
    this.error = false;
    this.ngOnInit();
  }
}
