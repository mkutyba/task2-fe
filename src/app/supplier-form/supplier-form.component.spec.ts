import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import any = jasmine.any;

import { SupplierFormComponent } from './supplier-form.component';
import { SupplierService } from '../model/supplier.service';
import { MaterialComponentsModule } from '../material-components.module';
import { Supplier } from '../model/supplier';
import { ActivatedRouteStub } from '../../testing/router-stubs';
import { mockSuppliers, MockSupplierService } from '../model/mock-supplier.service';

let component: SupplierFormComponent;
let fixture: ComponentFixture<SupplierFormComponent>;
const dummyModel = new Supplier('', '', '', '', []);
let expectedModel: Supplier;
let activatedRoute: ActivatedRouteStub;

describe('SupplierFormComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach(async(() => {
    expectedModel = dummyModel;

    TestBed.configureTestingModule({
      declarations: [SupplierFormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MaterialComponentsModule,
        NoopAnimationsModule,
        HttpModule,
      ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: SupplierService, useClass: MockSupplierService},
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SupplierFormComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    const compiled = fixture.debugElement.componentInstance;
    expect(compiled).toBeTruthy();
  });

  it('should have dummy model before ngOnInit', () => {
    expect(component.model).toEqual(any(Supplier));
    expect(component.model.id).toEqual(expectedModel.id);
    expect(component.model.name).toEqual(expectedModel.name);
    expect(component.model.number).toEqual(expectedModel.number);
    expect(component.model.logo).toEqual(expectedModel.logo);
  });

  it('should have dummy model immediately after ngOnInit', () => {
    fixture.detectChanges();
    expect(component.model).toEqual(any(Supplier));
    expect(component.model.id).toEqual(expectedModel.id);
    expect(component.model.name).toEqual(expectedModel.name);
    expect(component.model.number).toEqual(expectedModel.number);
    expect(component.model.logo).toEqual(expectedModel.logo);
  });

  it('should display loading spinner', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('md-spinner').length).toEqual(1);
  });

  describe('after init edit supplier form', () => {
    beforeEach(async(() => {
      expectedModel = mockSuppliers[0];
      activatedRoute.testParamMap = {id: expectedModel.id};

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges());
    }));

    it('should be created', () => {
      const compiled = fixture.debugElement.componentInstance;
      expect(compiled).toBeTruthy();
    });

    it('should have model', () => {
      expect(component.model).toEqual(any(Supplier));
      expect(component.model.id).toEqual(expectedModel.id);
      expect(component.model.name).toEqual(expectedModel.name);
      expect(component.model.number).toEqual(expectedModel.number);
      expect(component.model.logo).toEqual(expectedModel.logo);
    });

    it('should fill form with model info', () => {
      expect(component.form.get('name').value).toEqual(expectedModel.name);
      expect(component.form.get('number').value).toEqual(expectedModel.number);
      expect(component.form.get('logo').value).toEqual(expectedModel.logo);
    });
  });

  describe('after init new supplier form', () => {
    beforeEach(async(() => {
      expectedModel = dummyModel;
      activatedRoute.testParamMap = {id: null};

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges());
    }));

    it('should be created', () => {
      const compiled = fixture.debugElement.componentInstance;
      expect(compiled).toBeTruthy();
    });

    it('should form controls have empty values', () => {
      expect(component.form.get('name').value).toEqual('');
      expect(component.form.get('number').value).toEqual('');
      expect(component.form.get('logo').value).toEqual('');
    });
  });
});
