import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

interface DecodedToken {
  exp: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3001/admin';

  constructor(private http: HttpClient) { }

  checkLogin(login: any): Observable<any> {
    return this.http.post(this.apiUrl + `/login`, login);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt_decode(token) as DecodedToken;
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (err) {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }
}
