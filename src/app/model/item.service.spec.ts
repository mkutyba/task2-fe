import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, RequestMethod, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { environment } from '../../environments/environment';

import { ItemService } from './item.service';
import { mockItems } from './mock-item.service';

describe('ItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ItemService,
        {provide: XHRBackend, useClass: MockBackend},
      ]
    });
  });

  it('should be created', inject([ItemService], (service: ItemService) => {
    expect(service).toBeTruthy();
  }));

  describe('when getAll', () => {
    let backend: MockBackend;
    let service: ItemService;
    let response: Response;

    beforeEach(inject([ItemService, XHRBackend], (se: ItemService, be: MockBackend) => {
      backend = be;
      service = se;
      let options = new ResponseOptions({status: 200, body: {data: mockItems}});
      response = new Response(options);
    }));

    it('should have expected mock entities', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/items`);

        c.mockRespond(response);
      });

      service.getAll()
        .then(items => {
          expect(items.length).toBe(mockItems.length);
          for (let i = 0; i < mockItems.length; i++) {
            expect(items[i].number).toEqual(mockItems[i].number);
            expect(items[i].stock).toEqual(mockItems[i].stock);
            expect(items[i].online).toEqual(mockItems[i].online);
            expect(items[i].image).toEqual(mockItems[i].image);
            expect(items[i].description).toEqual(mockItems[i].description);
            expect(items[i].supplier_id).toEqual(mockItems[i].supplier_id);
          }
        });
    })));


    it('should be OK returning no entities', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getAll()
        .then(items => {
          expect(items.length).toBe(0);
        });
    })));

    it('should treat 404 as an error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getAll()
        .then(() => {
          fail('should not respond with items');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/);
          return Promise.resolve(null);
        });
    })));
  });

  describe('when get(id)', () => {
    let backend: MockBackend;
    let service: ItemService;
    let response: Response;

    beforeEach(inject([ItemService, XHRBackend], (se: ItemService, be: MockBackend) => {
      backend = be;
      service = se;
      let options = new ResponseOptions({status: 200, body: {data: mockItems[0]}});
      response = new Response(options);
    }));

    it('should have expected mock entity', async(inject([], () => {
      let id = '1234';

      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/items/${id}`);

        c.mockRespond(response);
      });

      service.get(id)
        .then(item => {
          expect(item).toBeTruthy();
          expect(item.number).toEqual(mockItems[0].number);
          expect(item.stock).toEqual(mockItems[0].stock);
          expect(item.online).toEqual(mockItems[0].online);
          expect(item.image).toEqual(mockItems[0].image);
          expect(item.description).toEqual(mockItems[0].description);
          expect(item.supplier_id).toEqual(mockItems[0].supplier_id);
        });
    })));

    it('should treat 404 as an error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.get('1234')
        .then(() => {
          fail('should not respond with item');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/);
          return Promise.resolve(null);
        });
    })));
  });

  describe('when create(item)', () => {
    let backend: MockBackend;
    let service: ItemService;
    let response: Response;

    beforeEach(inject([ItemService, XHRBackend], (se: ItemService, be: MockBackend) => {
      backend = be;
      service = se;
      let options = new ResponseOptions({status: 201, body: {data: mockItems[0]}});
      response = new Response(options);
    }));

    it('should respond with entity data on success', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/items`);
        expect(c.request.method).toBe(RequestMethod.Post);

        c.mockRespond(response);
      });

      let newItem = mockItems[0].clone();
      newItem._id = '';
      service.create(newItem)
        .then(item => {
          expect(item).toBeTruthy();
          expect(item._id).not.toEqual(newItem._id, 'should generate new _id on insert');
          expect(item.number).toEqual(newItem.number);
          expect(item.stock).toEqual(newItem.stock);
          expect(item.online).toEqual(newItem.online);
          expect(item.image).toEqual(newItem.image);
          expect(item.description).toEqual(newItem.description);
          expect(item.supplier_id).toEqual(newItem.supplier_id);
        });
    })));

    it('should treat 400 as an error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 400}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.create(mockItems[0])
        .then(() => {
          fail('should not respond with item');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/);
          return Promise.resolve(null);
        });
    })));
  });

  describe('when update(item)', () => {
    let backend: MockBackend;
    let service: ItemService;
    let response: Response;

    beforeEach(inject([ItemService, XHRBackend], (se: ItemService, be: MockBackend) => {
      backend = be;
      service = se;
      let options = new ResponseOptions({status: 201, body: {data: mockItems[0]}});
      response = new Response(options);
    }));

    it('should respond with entity data on success', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/items/${mockItems[0]._id}`);
        expect(c.request.method).toBe(RequestMethod.Put);

        c.mockRespond(response);
      });

      service.update(mockItems[0])
        .then(item => {
          expect(item).toBeTruthy();
          expect(item._id).toEqual(mockItems[0]._id);
          expect(item.number).toEqual(mockItems[0].number);
          expect(item.stock).toEqual(mockItems[0].stock);
          expect(item.online).toEqual(mockItems[0].online);
          expect(item.image).toEqual(mockItems[0].image);
          expect(item.description).toEqual(mockItems[0].description);
          expect(item.supplier_id).toEqual(mockItems[0].supplier_id);
        });
    })));

    it('should treat 404 as an error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.update(mockItems[0])
        .then(() => {
          fail('should not respond with item');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/);
          return Promise.resolve(null);
        });
    })));
  });

  describe('when createOrUpdate(item) recognize which method to use', () => {
    let backend: MockBackend;
    let service: ItemService;
    let response: Response;

    beforeEach(inject([ItemService, XHRBackend], (se: ItemService, be: MockBackend) => {
      backend = be;
      service = se;
      let options = new ResponseOptions({status: 200, body: {data: mockItems[0]}});
      response = new Response(options);
    }));

    it('should be created', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/items`);
        expect(c.request.method).toBe(RequestMethod.Post);

        c.mockRespond(response);
      });

      let newItem = mockItems[0].clone();
      newItem._id = '';
      service.createOrUpdate(newItem);
    })));

    it('should be updated', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/items/${mockItems[0]._id}`);
        expect(c.request.method).toBe(RequestMethod.Put);

        c.mockRespond(response);
      });

      service.createOrUpdate(mockItems[0]);
    })));
  });

  describe('when remove(item)', () => {
    let backend: MockBackend;
    let service: ItemService;
    let response: Response;

    beforeEach(inject([ItemService, XHRBackend], (se: ItemService, be: MockBackend) => {
      backend = be;
      service = se;
      let options = new ResponseOptions({status: 201, body: {data: mockItems[0]}});
      response = new Response(options);
    }));

    it('should respond with entity data on success', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => {
        const apiUrl = environment.apiUrl;
        expect(c.request.url).toBe(`${apiUrl}/items/${mockItems[0]._id}`);
        expect(c.request.method).toBe(RequestMethod.Delete);

        c.mockRespond(response);
      });

      service.remove(mockItems[0]);
    })));

    it('should treat 404 as an error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.remove(mockItems[0])
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
