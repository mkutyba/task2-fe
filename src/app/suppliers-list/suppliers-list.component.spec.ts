import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

import { SuppliersListComponent } from './suppliers-list.component';
import { SupplierService } from '../model/supplier.service';
import { MaterialComponentsModule } from '../material-components.module';
import { mockSuppliers, MockSupplierService } from '../model/mock-supplier.service';

let component: SuppliersListComponent;
let fixture: ComponentFixture<SuppliersListComponent>;

describe('SuppliersListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersListComponent],
      providers: [
        {provide: SupplierService, useClass: MockSupplierService},
      ],
      imports: [
        MaterialComponentsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        HttpModule,
      ],
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(SuppliersListComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should be created', async () => {
    const compiled = fixture.debugElement.componentInstance;
    expect(compiled).toBeTruthy();
  });

  it('should not have suppliers before ngOnInit', () => {
    expect(component.suppliers.length).toBe(0);
  });

  it('should not have suppliers immediately after ngOnInit', () => {
    fixture.detectChanges(); // runs initial lifecycle hooks
    expect(component.suppliers.length).toBe(0);
  });

  it('should display loading spinner', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('md-list md-spinner').length).toEqual(1);
  });

  describe('after init', () => {
    // Trigger component so it gets suppliers and binds to them
    beforeEach(async(() => {
      fixture.detectChanges(); // runs ngOnInit -> getAll
      fixture.whenStable()
        .then(() => fixture.detectChanges()); // bind to suppliers
    }));

    it('should be created', () => {
      const compiled = fixture.debugElement.componentInstance;
      expect(compiled).toBeTruthy();
    });

    it('should have suppliers', () => {
      expect(component.suppliers.length).toBe(3);
    });

    it('should display suppliers', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('md-list-item').length).toEqual(3);
    });

    it('supplier should have info button with correct url', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('md-list-item:first-child a').length).toEqual(2);
      const regex = new RegExp(`.*/view/${mockSuppliers[0]._id}`, '');
      expect(compiled.querySelectorAll('md-list-item:first-child a')[0].href).toMatch(regex);
    });

    it('supplier should have edit button with correct url', () => {
      const compiled = fixture.debugElement.nativeElement;
      const regex = new RegExp(`.*/edit/${mockSuppliers[0]._id}`, '');
      expect(compiled.querySelectorAll('md-list-item:first-child a')[1].href).toMatch(regex);
    });

    it('should have 1 supplier less after clicking remove button', async(() => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('md-list-item:first-child button').length).toEqual(1);

      compiled.querySelector('md-list-item:first-child button').click();
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          expect(component.suppliers.length).toBe(2);
        });
    }));

    it('should display error message when failed to remove', async(() => {
      let supplierService = TestBed.get(SupplierService);
      const compiled = fixture.debugElement.nativeElement;
      spyOn(supplierService, 'remove').and.returnValue(Promise.reject('some error'));

      compiled.querySelector('md-list-item:first-child button').click();
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          fixture.detectChanges();
          expect(component.suppliers.length).toBe(3);
          expect(compiled.querySelector('md-list-item:first-child').innerText).toMatch(/Failed to delete supplier/);
        });
    }));

    it('should display no suppliers info', () => {
      component.suppliers = [];
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('md-list-item').length).toEqual(1);
      expect(compiled.querySelector('md-list-item').innerText).toMatch(/No suppliers to display/);
    });

    describe('when failure', () => {
      beforeEach(async(() => {
        component.suppliers = [];
        component.loaded = false;
        component.error = true;
        fixture.detectChanges();
      }));

      it('should display error message', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('md-list-item').length).toEqual(1);
        expect(compiled.querySelector('md-list-item').innerText).toMatch(/Failed to load suppliers/);
      });

      it('should display loading spinner after clicking reload button', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('md-list-item button').length).toEqual(1);
        compiled.querySelector('md-list-item button').click();
        fixture.detectChanges();
        expect(compiled.querySelectorAll('md-list md-spinner').length).toEqual(1);
      });
    });
  });
});
