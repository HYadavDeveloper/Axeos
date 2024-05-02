import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check if the access token is present in localStorage
    const authToken = localStorage.getItem('accessToken');

    if (authToken) {
      // If token is present, allow access
      return true;
    } else {
      // If token is not present, redirect to the login page and deny access
      return this.router.createUrlTree(['']);
    }
  }
}
