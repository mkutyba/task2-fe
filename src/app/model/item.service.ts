import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Item } from './item';
import { environment } from '../../environments/environment';

@Injectable()
export class ItemService {
  private apiUrl = environment.apiUrl;
  private itemsUrl = `${this.apiUrl}/items`;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getAll(): Promise<Item[]> {
    return this.http
      .get(this.itemsUrl)
      .toPromise()
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Bad response status: ' + response.status);
        }
        return response.json().data as Item[] || [];
      })
      .catch(this.handleError);
  }

  get(id: string): Promise<Item> {
    return this.http
      .get(`${this.itemsUrl}/${id}`)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  create(item: Item): Promise<Item> {
    return this.http
      .post(this.itemsUrl, JSON.stringify(item), {headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  update(item: Item): Promise<Item> {
    return this.http
      .put(`${this.itemsUrl}/${item._id}`, JSON.stringify(item), {headers: this.headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  createOrUpdate(item: Item): Promise<Item> {
    if (item._id) {
      return this.update(item);
    } else {
      return this.create(item);
    }
  }

  remove(item: Item): Promise<boolean> {
    return this.http
      .delete(`${this.itemsUrl}/${item._id}`, {headers: this.headers})
      .toPromise()
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Bad response status: ' + response.status);
        }
        return true;
      })
      .catch(this.handleError);
  }

  private extractData(response): Item {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Bad response status: ' + response.status);
    }
    return response.json().data as Item;
  }

  private handleError(error): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
