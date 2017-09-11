import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { environment } from '../../environments/environment';

import { SupplierService } from './supplier.service';
import { MOCK_SUPPLIERS } from './mock-supplier.service';
import { Supplier } from './supplier';

describe('SupplierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        SupplierService,
        {provide: XHRBackend, useClass: MockBackend},
      ]
    });
  });

  it('should be created', inject([SupplierService], (service: SupplierService) => {
    expect(service).toBeTruthy();
  }));

  describe('when getSuppliers', () => {
    let backend: MockBackend;
    let service: SupplierService;
    let mockSuppliers: Supplier[];
    let response: Response;

    beforeEach(inject([SupplierService, XHRBackend], (se: SupplierService, be: MockBackend) => {
      backend = be;
      service = se;
      mockSuppliers = MOCK_SUPPLIERS;
      let options = new ResponseOptions({status: 200, body: {data: mockSuppliers}});
      response = new Response(options);
    }));

    it('should have expected fake entities', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/suppliers`);

        c.mockRespond(response);
      });

      service.getSuppliers()
        .then(suppliers => {
          expect(suppliers.length).toBe(mockSuppliers.length);
          expect(suppliers[0].name).toEqual(mockSuppliers[0].name);
          expect(suppliers[1].name).toEqual(mockSuppliers[1].name);
          expect(suppliers[2].name).toEqual(mockSuppliers[2].name);
        });
    })));


    it('should be OK returning no entities', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getSuppliers()
        .then(suppliers => {
          expect(suppliers.length).toBe(0);
        });
    })));

    it('should treat 404 as an error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getSuppliers()
        .then(() => {
          fail('should not respond with supppliers');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/);
          return Promise.resolve(null);
          // return Observable.of(null); // failure is the expected test result
        });
    })));
  });
});
