import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Supplier } from './supplier';
import { environment } from '../../environments/environment';

@Injectable()
export class SupplierService {
  private apiUrl = environment.apiUrl;
  private suppliersUrl = `${this.apiUrl}/suppliers`;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getAll(): Promise<Supplier[]> {
    return this.http
      .get(this.suppliersUrl)
      .toPromise()
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Bad response status: ' + response.status);
        }
        return response.json().data as Supplier[] || [];
      })
      .catch(this.handleError);
  }

  get(id: string): Promise<Supplier> {
    return this.http
      .get(`${this.suppliersUrl}/${id}`)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  create(supplier: Supplier): Promise<Supplier> {
    return this.http
      .post(this.suppliersUrl, JSON.stringify(supplier), {headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  update(supplier: Supplier): Promise<Supplier> {
    return this.http
      .put(`${this.suppliersUrl}/${supplier._id}`, JSON.stringify(supplier), {headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  createOrUpdate(supplier: Supplier): Promise<Supplier> {
    if (supplier._id) {
      return this.update(supplier);
    } else {
      return this.create(supplier);
    }
  }

  remove(supplier: Supplier): Promise<boolean> {
    return this.http
      .delete(`${this.suppliersUrl}/${supplier._id}`, {headers: this.headers})
      .toPromise()
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Bad response status: ' + response.status);
        }
        return true;
      })
      .catch(this.handleError);
  }

  private extractData(response): Supplier {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Bad response status: ' + response.status);
    }
    return response.json().data as Supplier;
  }

  private handleError(error): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
