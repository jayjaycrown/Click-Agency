import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Will be inserted when the Api is hosted
const url = "";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient,) { }
  // End Point to create user
  register(body: any) {
    return this._http.post(`${url}/auth/signup`, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
  // Endpoint to login user
  login(body: any) {
    return this._http.post(`${url}/auth/login`, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
  // Endpoint for forget password
  forget(body: any) {
    return this._http.post(`${url}/auth/forget`, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
}
