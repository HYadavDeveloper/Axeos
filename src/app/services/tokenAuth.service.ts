import { Injectable } from '@angular/core';
import { AuthResponse } from '../model/model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  readonly domain = environment.apiUrl;
  readonly tokenStorageKey = 'accessToken';
  readonly refreshTokenStorageKey = 'refreshToken';
  constructor(private http: HttpClient, private router: Router) {}

  readonly options = {
    headers: new HttpHeaders().set(
      'Content-type',
      'application/x-www-form-urlencoded'
    ),
  };

  get token() {
    const token = localStorage.getItem(this.tokenStorageKey);
    if (!token) {
      this.logout;
    }
    return token;
  }

  login(username: string, password: string): Observable<AuthResponse> {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);

    return this.http
      .post<AuthResponse>(`${this.domain}oauth2/token`, body, this.options)
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(this.refreshTokenStorageKey);
    if (!refreshToken) {
      this.logout();
      throw new Error('No refresh token');
    }

    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', refreshToken);

    return this.http
      .post<AuthResponse>(`${this.domain}oauth2/token`, body, this.options)
      .pipe(
        catchError((error) => {
          this.logout();
          return throwError(() => {
            throw error;
          });
        })
      )
      .pipe(
        map((res) => {
          localStorage.setItem(this.tokenStorageKey, res.access_token);
          localStorage.setItem(this.refreshTokenStorageKey, res.refresh_token);
          return res;
        })
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
