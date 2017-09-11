import { Injectable } from '@angular/core';
import { Supplier } from './supplier';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class SupplierService {
  private apiUrl = environment.apiUrl;
  private suppliersUrl = `${this.apiUrl}/suppliers`;

  constructor(private http: Http) {}

  getSuppliers(): Promise<Supplier[]> {
    return this.http
      .get(this.suppliersUrl)
      .toPromise()
      .then(response => this.extractData(response))
      .catch(this.handleError);
  }

  private extractData(response): Supplier[] {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Bad response status: ' + response.status);
    }
    let body = response.json();
    return body.data as Supplier[] || [];
  }

  private handleError(error): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
