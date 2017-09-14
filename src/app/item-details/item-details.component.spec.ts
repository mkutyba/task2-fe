import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import any = jasmine.any;

import { ItemDetailsComponent } from './item-details.component';
import { MaterialComponentsModule } from '../material-components.module';
import { ItemService } from '../model/item.service';
import { mockItems, MockItemService } from '../model/mock-item.service';
import { ActivatedRouteStub } from '../../testing/router-stubs';
import { Item } from '../model/item';
import { SupplierService } from '../model/supplier.service';
import { MockSupplierService } from '../model/mock-supplier.service';

let activatedRoute: ActivatedRouteStub;
let component: ItemDetailsComponent;
let fixture: ComponentFixture<ItemDetailsComponent>;

describe('ItemDetailsComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemDetailsComponent],
      imports: [
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

    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    const compiled = fixture.debugElement.componentInstance;
    expect(compiled).toBeTruthy();
  });

  it('should not have item before ngOnInit', () => {
    expect(component.item).toBe(undefined);
  });

  it('should not have item immediately after ngOnInit', () => {
    fixture.detectChanges(); // runs initial lifecycle hooks
    expect(component.item).toBe(undefined);
  });

  it('should display loading spinner', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('md-spinner').length).toEqual(1);
  });

  describe('after init', () => {
    let expectedItem: Item;

    beforeEach(async(() => {
      expectedItem = mockItems[0];
      activatedRoute.testParamMap = {id: expectedItem._id};

      // 1st change detection triggers ngOnInit which gets a item
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges()); // 2nd change detection displays the async-fetched item
    }));

    it('should be created', () => {
      const compiled = fixture.debugElement.componentInstance;
      expect(compiled).toBeTruthy();
    });

    it('should have item', () => {
      expect(component.item).toEqual(any(Item));
      expect(component.item._id).toEqual(expectedItem._id);
      expect(component.item.number).toEqual(expectedItem.number);
      expect(component.item.stock).toEqual(expectedItem.stock);
      expect(component.item.online).toEqual(expectedItem.online);
      expect(component.item.image).toEqual(expectedItem.image);
      expect(component.item.description).toEqual(expectedItem.description);
      expect(component.item.supplier_id).toEqual(expectedItem.supplier_id);
      expect(component.item.supplier._id).toEqual(expectedItem.supplier._id);
    });

    it('should display item info', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('md-list-item').length).toEqual(6);
      let regex = new RegExp(`Number:\\s+${expectedItem.number}`, '');
      expect(compiled.querySelectorAll('md-list-item')[0].innerText).toMatch(regex);
      regex = new RegExp(`Stock:\\s+${expectedItem.stock}`, '');
      expect(compiled.querySelectorAll('md-list-item')[1].innerText).toMatch(regex);
      regex = new RegExp(`Online:\\s+${expectedItem.online ? 'Yes' : 'No'}`, '');
      expect(compiled.querySelectorAll('md-list-item')[2].innerText).toMatch(regex);
      regex = new RegExp(`Image:\\s+${expectedItem.image}`, '');
      expect(compiled.querySelectorAll('md-list-item')[3].innerText).toMatch(regex);
      regex = new RegExp(`Description:\\s+${expectedItem.description}`, '');
      expect(compiled.querySelectorAll('md-list-item')[4].innerText).toMatch(regex);
      regex = new RegExp(`Supplier:\\s+${expectedItem.supplier.name}`, '');
      expect(compiled.querySelectorAll('md-list-item')[5].innerText).toMatch(regex);
    });

    describe('when failure', () => {
      beforeEach(async(() => {
        component.item = undefined;
        component.loaded = false;
        component.error = true;
        fixture.detectChanges();
      }));

      it('should display error message', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('md-error').innerText).toMatch(/Failed to load item info/);
      });

      it('should display loading spinner after clicking reload button', () => {
        const compiled = fixture.debugElement.nativeElement;
        compiled.querySelector('button').click();
        fixture.detectChanges();
        expect(compiled.querySelectorAll('md-spinner').length).toEqual(1);
      });
    });
  });
});
