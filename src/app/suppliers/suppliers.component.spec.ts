import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { SuppliersComponent } from './suppliers.component';
import { SupplierService } from './supplier.service';
import { MaterialComponentsModule } from '../material-components.module';
import { MockSupplierService } from './mock-supplier.service';

let component: SuppliersComponent;
let fixture: ComponentFixture<SuppliersComponent>;

describe('SuppliersComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersComponent],
      providers: [
        {provide: SupplierService, useClass: MockSupplierService},
      ],
      imports: [MaterialComponentsModule],
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(SuppliersComponent);
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

  describe('after init', () => {
    // Trigger component so it gets suppliers and binds to them
    beforeEach(async(() => {
      fixture.detectChanges(); // runs ngOnInit -> getSuppliers
      fixture.whenStable() // No need for the `lastPromise` hack!
        .then(() => {
          fixture.detectChanges();
        }); // bind to suppliers
    }));

    it('should be created', async () => {
      const compiled = fixture.debugElement.componentInstance;
      expect(compiled).toBeTruthy();
    });

    it('should have suppliers', async(() => {
      expect(component.suppliers.length).toBe(3);
    }));

    it('should display suppliers', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('md-list-item').length).toEqual(3);
    });
  });
});
