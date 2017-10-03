import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

import { ItemsListComponent } from './items-list.component';
import { ItemService } from '../model/item.service';
import { MaterialComponentsModule } from '../material-components.module';
import { mockItems, MockItemService } from '../model/mock-item.service';

let component: ItemsListComponent;
let fixture: ComponentFixture<ItemsListComponent>;

describe('ItemsListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsListComponent],
      providers: [
        {provide: ItemService, useClass: MockItemService},
      ],
      imports: [
        MaterialComponentsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        HttpModule,
      ],
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(ItemsListComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should be created', async () => {
    const compiled = fixture.debugElement.componentInstance;
    expect(compiled).toBeTruthy();
  });

  it('should not have items before ngOnInit', () => {
    expect(component.items.length).toBe(0);
  });

  it('should not have items immediately after ngOnInit', () => {
    fixture.detectChanges(); // runs initial lifecycle hooks
    expect(component.items.length).toBe(0);
  });

  it('should display loading spinner', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('md-list md-spinner').length).toEqual(1);
  });

  describe('after init', () => {
    // Trigger component so it gets items and binds to them
    beforeEach(async(() => {
      fixture.detectChanges(); // runs ngOnInit -> getAll
      fixture.whenStable()
        .then(() => fixture.detectChanges()); // bind to items
    }));

    it('should be created', () => {
      const compiled = fixture.debugElement.componentInstance;
      expect(compiled).toBeTruthy();
    });

    it('should have items', () => {
      expect(component.items.length).toBe(3);
    });

    it('should display items', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('md-list-item').length).toEqual(3);
    });

    it('item should have info button with correct url', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('md-list-item:first-child a').length).toEqual(2);
      const regex = new RegExp(`.*/view/${mockItems[0].id}`, '');
      expect(compiled.querySelectorAll('md-list-item:first-child a')[0].href).toMatch(regex);
    });

    it('item should have edit button with correct url', () => {
      const compiled = fixture.debugElement.nativeElement;
      const regex = new RegExp(`.*/edit/${mockItems[0].id}`, '');
      expect(compiled.querySelectorAll('md-list-item:first-child a')[1].href).toMatch(regex);
    });

    it('should have 1 item less after clicking remove button', async(() => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('md-list-item:first-child button').length).toEqual(1);

      compiled.querySelector('md-list-item:first-child button').click();
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          expect(component.items.length).toBe(2);
        });
    }));

    it('should display error message when failed to remove', async(() => {
      let itemService = TestBed.get(ItemService);
      const compiled = fixture.debugElement.nativeElement;
      spyOn(itemService, 'remove').and.returnValue(Promise.reject('some error'));

      compiled.querySelector('md-list-item:first-child button').click();
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          fixture.detectChanges();
          expect(component.items.length).toBe(3);
          expect(compiled.querySelector('md-list-item:first-child').innerText).toMatch(/Failed to delete item/);
        });
    }));

    it('should display no items info', () => {
      component.items = [];
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('md-list-item').length).toEqual(1);
      expect(compiled.querySelector('md-list-item').innerText).toMatch(/No items to display/);
    });

    describe('when failure', () => {
      beforeEach(async(() => {
        component.items = [];
        component.loaded = false;
        component.error = true;
        fixture.detectChanges();
      }));

      it('should display error message', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('md-list-item').length).toEqual(1);
        expect(compiled.querySelector('md-list-item').innerText).toMatch(/Failed to load items/);
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
