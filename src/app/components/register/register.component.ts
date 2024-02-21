import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  fb = inject(FormBuilder)
  http = inject(HttpClient)
  authService = inject(AuthService)
  router = inject(Router)
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    username: ['', Validators.required],
  })

  onSubmit(): void {
    this.http.post<{user: User
    }>('http://localhost:8088/auth/register',
      this.form.getRawValue()
    )
      .subscribe(response => {
        console.log('response', response)
        console.log('response', response.user)
        
        localStorage.setItem('isAdmin', response.user.isAdmin);

        alert("Registered Successfully")
        this.authService.currentUserSig.set(response.user)
        this.router.navigateByUrl('/')
      }, error => {
        if (error.status == 409) {
          alert(`Email ${this.form.value.email} is already in use`)
        } else {
          alert("Something went wrong")
        }
      });
  }
}
