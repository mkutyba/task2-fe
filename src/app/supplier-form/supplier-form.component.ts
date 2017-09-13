import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Supplier } from '../model/supplier';
import { SupplierService } from '../model/supplier.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {
  form: FormGroup;
  model: Supplier = new Supplier('', '', '', '');
  error: boolean = false;
  submitError: boolean = false;
  loading: boolean = false;
  submitting: boolean = false;

  constructor(private fb: FormBuilder,
              private supplierService: SupplierService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initModel();
    this.createForm();
  }

  initModel(): void {
    this.loading = true;
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.supplierService.get(params.get('id'));
        } else {
          return Promise.resolve(this.model);
        }
      })
      .subscribe(supplier => {
          this.model = supplier;
          this.createForm();
          this.loading = false;
        },
        () => {
          this.error = true;
          this.loading = false;
        });
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      logo: ['', Validators.required],
    });

    this.form.reset();

    this.form.setValue({
      name: this.model.name,
      number: this.model.number,
      logo: this.model.logo,
    });

    // hack for making labels above input fields
    Object.keys(this.form.controls).map(key => {
      this.form.get(key).markAsDirty();
    });
  }

  get name(): AbstractControl { return this.form.get('name'); }

  get number(): AbstractControl { return this.form.get('number'); }

  get logo(): AbstractControl { return this.form.get('logo'); }

  onSubmit(): void {
    if (this.submitting || this.form.status !== 'VALID') {
      return;
    }
    this.submitting = true;
    this.submitError = false;
    this.prepareSave();
    this.saveSupplier();
  }

  prepareSave(): void {
    const formModel = this.form.value;
    this.model.name = formModel.name;
    this.model.number = formModel.number;
    this.model.logo = formModel.logo;
  }

  saveSupplier(): void {
    this.supplierService
      .createOrUpdate(this.model)
      .then(() => this.goBack())
      .catch(() => {
        this.submitting = false;
        this.submitError = true;
      });
  }

  goBack(): void {
    this.router.navigate(['/suppliers']);
  }
}
