import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  signupForm!: FormGroup;
  username: string = "";
  email: string = "";
  password: string = "";


  constructor(private fb: FormBuilder, private http: HttpClient, private authService :AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  register() {
    let bodyData={
      "username":this.username ,
      "email":this.email,
      "password":this.password
    }
    this.http.post("http://localhost:8088/auth/register",bodyData).subscribe((resultData:any)=>{
      console.log(resultData);
      alert('User Registred Successfully')
    })
  }

  save() {
    this.register()
  }

  private validateAllFormFileds(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFileds(control)
      }
    })
  }
}
