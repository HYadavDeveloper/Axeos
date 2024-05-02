import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonModule,
  GridModule,
  HeaderModule,
  InputModule,
} from 'carbon-components-angular';
import { UserAuthService } from '../services/tokenAuth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  standalone: true,
  styleUrls: ['./user-login.component.css'],
  imports: [
    CommonModule,
    GridModule,
    InputModule,
    ReactiveFormsModule,
    ButtonModule,
    HeaderModule,
  ],
})
export class UserLoginComponent {
  constructor(private auth: UserAuthService, private router: Router) {
    if (localStorage.getItem('accessToken')) {
      this.router.navigate(['/switch']);
    }
  }
  error = false;
  readonly tokenStorageKey = 'accessToken';
  readonly refreshTokenStorageKey = 'refreshToken';

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    this.error = false;
    try {
      this.auth
        .login(
          this.loginForm.get('username')?.value!,
          this.loginForm.get('password')?.value!
        )
        .subscribe(
          (res) => {
            localStorage.setItem(this.tokenStorageKey, res.access_token);
            localStorage.setItem(
              this.refreshTokenStorageKey,
              res.refresh_token
            );

            if (res.access_token) {
              this.router.navigate(['/switch']);
            } else {
              this.router.navigate(['/']);
            }
          },
          (error) => {
            this.error = true;
            console.log(error, 'error');
          }
        );
    } catch (errr) {
      console.log(errr, ' errr');
    }
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  get usernameError() {
    if (this.username.hasError('required')) {
      return 'Username is required';
    }
    // Add more error checks if needed
    return '';
  }

  get PasswordError() {
    if (this.password.hasError('required')) {
      return 'Password is required';
    }
    // Add more error checks if needed
    return '';
  }
}
