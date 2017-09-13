import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, RequestMethod, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { environment } from '../../environments/environment';

import { SupplierService } from './supplier.service';
import { mockSuppliers } from './mock-supplier.service';

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

  describe('when getAll', () => {
    let backend: MockBackend;
    let service: SupplierService;
    let response: Response;

    beforeEach(inject([SupplierService, XHRBackend], (se: SupplierService, be: MockBackend) => {
      backend = be;
      service = se;
      let options = new ResponseOptions({status: 200, body: {data: mockSuppliers}});
      response = new Response(options);
    }));

    it('should have expected mock entities', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/suppliers`);

        c.mockRespond(response);
      });

      service.getAll()
        .then(suppliers => {
          expect(suppliers.length).toBe(mockSuppliers.length);
          expect(suppliers[0].name).toEqual(mockSuppliers[0].name);
          expect(suppliers[0].number).toEqual(mockSuppliers[0].number);
          expect(suppliers[0].logo).toEqual(mockSuppliers[0].logo);
          expect(suppliers[1].name).toEqual(mockSuppliers[1].name);
          expect(suppliers[1].number).toEqual(mockSuppliers[1].number);
          expect(suppliers[1].logo).toEqual(mockSuppliers[1].logo);
          expect(suppliers[2].name).toEqual(mockSuppliers[2].name);
          expect(suppliers[2].number).toEqual(mockSuppliers[2].number);
          expect(suppliers[2].logo).toEqual(mockSuppliers[2].logo);
        });
    })));


    it('should be OK returning no entities', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getAll()
        .then(suppliers => {
          expect(suppliers.length).toBe(0);
        });
    })));

    it('should treat 404 as an error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getAll()
        .then(() => {
          fail('should not respond with suppliers');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/);
          return Promise.resolve(null);
        });
    })));
  });

  describe('when get(id)', () => {
    let backend: MockBackend;
    let service: SupplierService;
    let response: Response;

    beforeEach(inject([SupplierService, XHRBackend], (se: SupplierService, be: MockBackend) => {
      backend = be;
      service = se;
      let options = new ResponseOptions({status: 200, body: {data: mockSuppliers[0]}});
      response = new Response(options);
    }));

    it('should have expected mock entity', async(inject([], () => {
      let id = '1234';

      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/suppliers/${id}`);

        c.mockRespond(response);
      });

      service.get(id)
        .then(supplier => {
          expect(supplier).toBeTruthy();
          expect(supplier.name).toEqual(mockSuppliers[0].name);
          expect(supplier.number).toEqual(mockSuppliers[0].number);
          expect(supplier.logo).toEqual(mockSuppliers[0].logo);
        });
    })));

    it('should treat 404 as an error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.get('1234')
        .then(() => {
          fail('should not respond with supplier');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/);
          return Promise.resolve(null);
        });
    })));
  });

  describe('when create(supplier)', () => {
    let backend: MockBackend;
    let service: SupplierService;
    let response: Response;

    beforeEach(inject([SupplierService, XHRBackend], (se: SupplierService, be: MockBackend) => {
      backend = be;
      service = se;
      let options = new ResponseOptions({status: 201, body: {data: mockSuppliers[0]}});
      response = new Response(options);
    }));

    it('should respond with entity data on success', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/suppliers`);
        expect(c.request.method).toBe(RequestMethod.Post);

        c.mockRespond(response);
      });

      let newSupplier = mockSuppliers[0].clone();
      newSupplier._id = '';
      service.create(newSupplier)
        .then(supplier => {
          expect(supplier).toBeTruthy();
          expect(supplier._id).not.toEqual(newSupplier._id, 'should generate new _id on insert');
          expect(supplier.name).toEqual(newSupplier.name);
          expect(supplier.number).toEqual(newSupplier.number);
          expect(supplier.logo).toEqual(newSupplier.logo);
        });
    })));

    it('should treat 400 as an error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 400}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.create(mockSuppliers[0])
        .then(() => {
          fail('should not respond with supplier');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/);
          return Promise.resolve(null);
        });
    })));
  });

  describe('when update(supplier)', () => {
    let backend: MockBackend;
    let service: SupplierService;
    let response: Response;

    beforeEach(inject([SupplierService, XHRBackend], (se: SupplierService, be: MockBackend) => {
      backend = be;
      service = se;
      let options = new ResponseOptions({status: 201, body: {data: mockSuppliers[0]}});
      response = new Response(options);
    }));

    it('should respond with entity data on success', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/suppliers/${mockSuppliers[0]._id}`);
        expect(c.request.method).toBe(RequestMethod.Put);

        c.mockRespond(response);
      });

      service.update(mockSuppliers[0])
        .then(supplier => {
          expect(supplier).toBeTruthy();
          expect(supplier._id).toEqual(mockSuppliers[0]._id);
          expect(supplier.name).toEqual(mockSuppliers[0].name);
          expect(supplier.number).toEqual(mockSuppliers[0].number);
          expect(supplier.logo).toEqual(mockSuppliers[0].logo);
        });
    })));

    it('should treat 404 as an error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.update(mockSuppliers[0])
        .then(() => {
          fail('should not respond with supplier');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/);
          return Promise.resolve(null);
        });
    })));
  });

  describe('when createOrUpdate(supplier) recognize which method to use', () => {
    let backend: MockBackend;
    let service: SupplierService;
    let response: Response;

    beforeEach(inject([SupplierService, XHRBackend], (se: SupplierService, be: MockBackend) => {
      backend = be;
      service = se;
      let options = new ResponseOptions({status: 200, body: {data: mockSuppliers[0]}});
      response = new Response(options);
    }));

    it('should be created', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/suppliers`);
        expect(c.request.method).toBe(RequestMethod.Post);

        c.mockRespond(response);
      });

      let newSupplier = mockSuppliers[0].clone();
      newSupplier._id = '';
      service.createOrUpdate(newSupplier);
    })));

    it('should be updated', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/suppliers/${mockSuppliers[0]._id}`);
        expect(c.request.method).toBe(RequestMethod.Put);

        c.mockRespond(response);
      });

      service.createOrUpdate(mockSuppliers[0]);
    })));
  });

  describe('when remove(supplier)', () => {
    let backend: MockBackend;
    let service: SupplierService;
    let response: Response;

    beforeEach(inject([SupplierService, XHRBackend], (se: SupplierService, be: MockBackend) => {
      backend = be;
      service = se;
      let options = new ResponseOptions({status: 201, body: {data: mockSuppliers[0]}});
      response = new Response(options);
    }));

    it('should respond with entity data on success', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/suppliers/${mockSuppliers[0]._id}`);
        expect(c.request.method).toBe(RequestMethod.Delete);

        c.mockRespond(response);
      });

      service.remove(mockSuppliers[0]);
    })));

    it('should treat 404 as an error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.remove(mockSuppliers[0])
        .then(() => {
          fail('should not respond with success');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/);
          return Promise.resolve(null);
        });
    })));
  });
});
