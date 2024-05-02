import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, mergeMap, throwError } from 'rxjs';
import { UserAuthService } from './tokenAuth.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class httpService {
  private readonly domain = environment.apiUrl;

  constructor(private http: HttpClient, private auth: UserAuthService) {}

  get<t>(url: string, params?: HttpParams): Observable<t> {
    return this.http
      .get<t>(`${this.domain}${url}`, {
        headers: {
          Authorization: `Bearer ${this.auth.token}`,
        },
        params: params,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.auth.refreshToken().pipe(
              mergeMap(() => {
                return this.get<t>(url, params);
              })
            );
          }
          return throwError(() => error);
        })
      ) as Observable<t>;
  }

  post<t>(url: string, data: any, params?: HttpParams): Observable<t> {
    return this.http
      .post<t>(`${this.domain}${url}`, data, {
        headers: {
          Authorization: `Bearer ${this.auth.token}`,
        },
        params: params,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.auth.refreshToken().pipe(
              mergeMap(() => {
                return this.post<t>(url, data);
              })
            );
          }
          return throwError(() => error);
        })
      ) as Observable<t>;
  }
}
