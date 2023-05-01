import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  addFreelancer(data: any): Observable<any>{
    return this._http.post('https://freelance-collective-api.vercel.app/api/v1/user', data);
  }

  getFreelancers(): Observable<any>{
    return this._http.get('https://freelance-collective-api.vercel.app/api/v1/users');
  }

  getFreelancer(id: string): Observable<any> {
    return this._http.get(`https://freelance-collective-api.vercel.app/api/v1/user/${id}`);
  }

  updateFreelancer(id: string, data: any): Observable<any> {
    return this._http.put(`https://freelance-collective-api.vercel.app/api/v1/user/${id}`, data);
  }

  deleteFreelancer(id: string): Observable<any> {
    return this._http.delete(`https://freelance-collective-api.vercel.app/api/v1/user/${id}`);
  }
}
