import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
        localStorage.setItem('isAdmin', response.user.isAdmin);
        alert("Login Successfully")
        this.authService.currentUserSig.set(response.user)
        this.router.navigateByUrl('/')
      }, error => {
        if (error.status) {
          alert("Something went wrong")
        }
      });
  }
}
