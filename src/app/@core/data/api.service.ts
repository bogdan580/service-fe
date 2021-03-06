import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class Page {
  content: any[];
  number: number;
  size: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(protected http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get(url);
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(url, body);
  }
}
