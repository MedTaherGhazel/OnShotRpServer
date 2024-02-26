import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  fb = inject(FormBuilder)
  http = inject(HttpClient)
  authService = inject(AuthService)
  cookieService = inject(CookieService)
  router = inject(Router)

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit(): void {
    this.http
    .post<{user: User}>('http://localhost:8088/auth/login',
      this.form.getRawValue()
    )
      .subscribe(response => {
        console.log('response', response)
        console.log('user', response.user)
        // Store password in local storage (not recommended for production)
        const passwordControl = this.form.get('password');
        if (passwordControl) {
          localStorage.setItem('password', passwordControl.value);
        }        localStorage.setItem('isAdmin', response.user.isAdmin);
        localStorage.setItem('email', response.user.email);
        localStorage.setItem('username', response.user.email);
        this.cookieService.set('med',response.user.authentication.sessionToken)
        localStorage.setItem('sessionToken', response.user.authentication.sessionToken);
        // alert("Login Successfully")
        this.authService.currentUserSig.set(response.user)
        this.router.navigateByUrl('/')
      }, error => {
        if (error.status) {
          alert("Something went wrong")
        }
      });
  }
}
