import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.saveData();
  }

  user: BehaviorSubject<any> = new BehaviorSubject(null);
  role: BehaviorSubject<any> = new BehaviorSubject(null);

  signup(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.apiUrl}auth/register`, data);
  }

  login(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.apiUrl}auth/login`, data);
  }

  saveData(): void {
    const encode: any = JSON.parse(localStorage.getItem('tokenKeep')!);
    console.log(encode);

    if (encode) {
      const decode: any = jwtDecode(encode[0]);
      this.user.next(decode);
      this.role.next(encode[1]);
      console.log(decode);
    }
  }

  logOut(): void {
    localStorage.removeItem('tokenKeep');
    this.user.next(null);
    this.role.next(null);
    this._Router.navigate(['auth']);
  }
}
