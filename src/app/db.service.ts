import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }
  getPostsVolga(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/volga');
  }

  updatePostVolga(user: any): Observable<any> {
    return this.http.put<any>('http://localhost:3000/volga/1', user);
  }

  getPostskc(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/korporativni_centr');
  }

  updatePostkc(user: any): Observable<any> {
    return this.http.put<any>('http://localhost:3000/korporativni_centr/1', user);
  }
  getPostssibir(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/sibir');
  }

  updatePostsibir(user: any): Observable<any> {
    return this.http.put<any>('http://localhost:3000/sibir/1', user);
  }


}
