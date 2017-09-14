import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import any = jasmine.any;

import { ItemFormComponent } from './item-form.component';
import { ItemService } from '../model/item.service';
import { MaterialComponentsModule } from '../material-components.module';
import { Item } from '../model/item';
import { ActivatedRouteStub } from '../../testing/router-stubs';
import { mockItems, MockItemService } from '../model/mock-item.service';
import { SupplierService } from '../model/supplier.service';
import { MockSupplierService } from '../model/mock-supplier.service';

let component: ItemFormComponent;
let fixture: ComponentFixture<ItemFormComponent>;
const dummyModel = new Item('', '', 0, false, '', '', '');
let expectedModel: Item;
let activatedRoute: ActivatedRouteStub;

describe('ItemFormComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach(async(() => {
    expectedModel = dummyModel;

    TestBed.configureTestingModule({
      declarations: [ItemFormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MaterialComponentsModule,
        NoopAnimationsModule,
        HttpModule,
      ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: ItemService, useClass: MockItemService},
        {provide: SupplierService, useClass: MockSupplierService},
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ItemFormComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    const compiled = fixture.debugElement.componentInstance;
    expect(compiled).toBeTruthy();
  });

  it('should have dummy model before ngOnInit', () => {
    expect(component.model).toEqual(any(Item));
    expect(component.model._id).toEqual(expectedModel._id);
    expect(component.model.number).toEqual(expectedModel.number);
    expect(component.model.stock).toEqual(expectedModel.stock);
    expect(component.model.online).toEqual(expectedModel.online);
    expect(component.model.image).toEqual(expectedModel.image);
    expect(component.model.description).toEqual(expectedModel.description);
    expect(component.model.supplier_id).toEqual(expectedModel.supplier_id);
  });

  it('should have dummy model immediately after ngOnInit', () => {
    fixture.detectChanges();
    expect(component.model).toEqual(any(Item));
    expect(component.model._id).toEqual(expectedModel._id);
    expect(component.model.number).toEqual(expectedModel.number);
    expect(component.model.stock).toEqual(expectedModel.stock);
    expect(component.model.online).toEqual(expectedModel.online);
    expect(component.model.image).toEqual(expectedModel.image);
    expect(component.model.description).toEqual(expectedModel.description);
    expect(component.model.supplier_id).toEqual(expectedModel.supplier_id);
  });

  it('should display loading spinner', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('md-spinner').length).toEqual(1);
  });

  describe('after init edit item form', () => {
    beforeEach(async(() => {
      expectedModel = mockItems[0];
      activatedRoute.testParamMap = {id: expectedModel._id};

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges());
    }));

    it('should be created', () => {
      const compiled = fixture.debugElement.componentInstance;
      expect(compiled).toBeTruthy();
    });

    it('should have model', () => {
      expect(component.model).toEqual(any(Item));
      expect(component.model._id).toEqual(expectedModel._id);
      expect(component.model.number).toEqual(expectedModel.number);
      expect(component.model.stock).toEqual(expectedModel.stock);
      expect(component.model.online).toEqual(expectedModel.online);
      expect(component.model.image).toEqual(expectedModel.image);
      expect(component.model.description).toEqual(expectedModel.description);
      expect(component.model.supplier_id).toEqual(expectedModel.supplier_id);
    });

    it('should fill form with model info', () => {
      expect(component.form.get('number').value).toEqual(expectedModel.number);
      expect(component.form.get('stock').value).toEqual(expectedModel.stock);
      expect(component.form.get('online').value).toEqual(expectedModel.online);
      expect(component.form.get('image').value).toEqual(expectedModel.image);
      expect(component.form.get('description').value).toEqual(expectedModel.description);
      expect(component.form.get('supplier_id').value).toEqual(expectedModel.supplier_id);
    });
  });

  describe('after init new item form', () => {
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
      expect(component.form.get('number').value).toEqual('');
      expect(component.form.get('stock').value).toEqual(0);
      expect(component.form.get('online').value).toEqual(false);
      expect(component.form.get('image').value).toEqual('');
      expect(component.form.get('description').value).toEqual('');
      expect(component.form.get('supplier_id').value).toEqual('');
    });
  });
});
