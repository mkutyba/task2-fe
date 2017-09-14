import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Item } from '../model/item';
import { ItemService } from '../model/item.service';
import { Supplier } from '../model/supplier';
import { SupplierService } from '../model/supplier.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  form: FormGroup;
  model: Item = new Item('', '', 0, false, '', '', '');
  error: boolean = false;
  submitError: boolean = false;
  loading: boolean = false;
  submitting: boolean = false;
  suppliers: Supplier[] = [];

  constructor(private fb: FormBuilder,
              private itemService: ItemService,
              private supplierService: SupplierService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initModel();
    this.loadSuppliers();
    this.createForm();
  }

  initModel(): void {
    this.loading = true;
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.itemService.get(params.get('id'));
        } else {
          return Promise.resolve(this.model);
        }
      })
      .subscribe(item => {
          this.model = item;
          this.createForm();
          this.loading = false;
        },
        () => {
          this.error = true;
          this.loading = false;
        });
  }

  loadSuppliers(): void {
    this.loading = true;
    this.supplierService.getAll()
      .then(suppliers => {
        this.suppliers = suppliers;
        this.loading = false;
      })
      .catch(() => {
        this.error = true;
        this.loading = false;
      });
  }

  createForm(): void {
    this.form = this.fb.group({
      number: ['', Validators.required],
      stock: ['', Validators.required],
      online: [''],
      image: ['', Validators.required],
      description: ['', Validators.required],
      supplier_id: ['', Validators.required],
    });

    this.form.reset();

    this.form.setValue({
      number: this.model.number,
      stock: this.model.stock,
      online: this.model.online,
      image: this.model.image,
      description: this.model.description,
      supplier_id: this.model.supplier_id,
    });

    // hack for making labels above input fields
    Object.keys(this.form.controls).map(key => {
      this.form.get(key).markAsDirty();
    });
  }

  get number(): AbstractControl { return this.form.get('number'); }

  get stock(): AbstractControl { return this.form.get('stock'); }

  get online(): AbstractControl { return this.form.get('online'); }

  get image(): AbstractControl { return this.form.get('image'); }

  get description(): AbstractControl { return this.form.get('description'); }

  get supplierId(): AbstractControl { return this.form.get('supplier_id'); }

  onSubmit(): void {
    if (this.submitting || this.form.status !== 'VALID') {
      return;
    }
    this.submitting = true;
    this.submitError = false;
    this.prepareSave();
    this.saveItem();
  }

  prepareSave(): void {
    const formModel = this.form.value;
    this.model.number = formModel.number;
    this.model.stock = formModel.stock;
    this.model.online = formModel.online;
    this.model.image = formModel.image;
    this.model.description = formModel.description;
    this.model.supplier_id = formModel.supplier_id;
  }

  saveItem(): void {
    this.itemService
      .createOrUpdate(this.model)
      .then(() => this.goBack())
      .catch(() => {
        this.submitting = false;
        this.submitError = true;
      });
  }

  goBack(): void {
    this.router.navigate(['/items']);
  }
}
