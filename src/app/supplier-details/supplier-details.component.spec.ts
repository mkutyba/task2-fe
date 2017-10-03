import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import any = jasmine.any;

import { SupplierDetailsComponent } from './supplier-details.component';
import { MaterialComponentsModule } from '../material-components.module';
import { SupplierService } from '../model/supplier.service';
import { mockSuppliers, MockSupplierService } from '../model/mock-supplier.service';
import { ActivatedRouteStub } from '../../testing/router-stubs';
import { Supplier } from '../model/supplier';

let activatedRoute: ActivatedRouteStub;
let component: SupplierDetailsComponent;
let fixture: ComponentFixture<SupplierDetailsComponent>;

describe('SupplierDetailsComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierDetailsComponent],
      imports: [
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

    fixture = TestBed.createComponent(SupplierDetailsComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    const compiled = fixture.debugElement.componentInstance;
    expect(compiled).toBeTruthy();
  });

  it('should not have supplier before ngOnInit', () => {
    expect(component.supplier).toBe(undefined);
  });

  it('should not have supplier immediately after ngOnInit', () => {
    fixture.detectChanges(); // runs initial lifecycle hooks
    expect(component.supplier).toBe(undefined);
  });

  it('should display loading spinner', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('md-spinner').length).toEqual(1);
  });

  describe('after init', () => {
    let expectedSupplier: Supplier;

    beforeEach(async(() => {
      expectedSupplier = mockSuppliers[0];
      activatedRoute.testParamMap = {id: expectedSupplier.id};

      // 1st change detection triggers ngOnInit which gets a supplier
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges()); // 2nd change detection displays the async-fetched supplier
    }));

    it('should be created', () => {
      const compiled = fixture.debugElement.componentInstance;
      expect(compiled).toBeTruthy();
    });

    it('should have supplier', () => {
      expect(component.supplier).toEqual(any(Supplier));
      expect(component.supplier.id).toEqual(expectedSupplier.id);
      expect(component.supplier.name).toEqual(expectedSupplier.name);
      expect(component.supplier.number).toEqual(expectedSupplier.number);
      expect(component.supplier.logo).toEqual(expectedSupplier.logo);
    });

    it('should display supplier info', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('md-list-item').length).toEqual(4);
      let regex = new RegExp(`Name:\\s+${expectedSupplier.name}`, '');
      expect(compiled.querySelectorAll('md-list-item')[0].innerText).toMatch(regex);
      regex = new RegExp(`Number:\\s+${expectedSupplier.number}`, '');
      expect(compiled.querySelectorAll('md-list-item')[1].innerText).toMatch(regex);
      regex = new RegExp(`Logo:\\s+${expectedSupplier.logo}`, '');
      expect(compiled.querySelectorAll('md-list-item')[2].innerText).toMatch(regex);
      expect(compiled.querySelectorAll('md-list-item')[3].innerText).toMatch(/No items/);
    });

    describe('when failure', () => {
      beforeEach(async(() => {
        component.supplier = undefined;
        component.loaded = false;
        component.error = true;
        fixture.detectChanges();
      }));

      it('should display error message', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('md-error').innerText).toMatch(/Failed to load supplier info/);
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
