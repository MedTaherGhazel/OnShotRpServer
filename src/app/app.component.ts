// app.component.ts

import { Component, Inject, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  http= inject(HttpClient)
  authService = inject(AuthService)
  cookieService = inject(CookieService)
  form ={
    email: localStorage.getItem('email') || '',
    password:localStorage.getItem('password') || '',
  }

  ngOnInit(): void {
      this.http
      .post<{user: User}>('http://localhost:8088/auth/login',
        this.form
      )
        .subscribe(response => {
          console.log('response', response)
          console.log('user', response.user)
          localStorage.setItem('isAdmin', response.user.isAdmin);
          localStorage.setItem('email', response.user.email);
          localStorage.setItem('username', response.user.email);
          this.cookieService.set('med',response.user.authentication.sessionToken)
          localStorage.setItem('sessionToken', response.user.authentication.sessionToken);
          // alert("Login Successfully")
          this.authService.currentUserSig.set(response.user)

        }, error => {
          if (error.status) {
            alert("Something went wrong")
          }
        });

  }
  title = 'product';

}
