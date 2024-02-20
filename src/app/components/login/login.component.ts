import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  username: string = "";
  email: string = "";
  password: string = "";
  role: string = "";

  isLogin:boolean=true;
  errorMsg: string ="";

  constructor(private fb: FormBuilder, private authService: AuthService,private router:Router,
              private http:HttpClient) {}


  login(){
    console.log(this.email)
    console.log(this.password)

    let bodyData={
      email:this.email,
      password:this.password
    }
    this.http.post("http://localhost:8088/auth/login",bodyData).subscribe((resultData:any)=>{
    console.log(resultData);
    if(resultData.status){
      this.router.navigateByUrl('/home')
    }else{
      alert("Invalid credentials")
    }
  });
  }

  save() {
    if (this.loginForm.valid) {
      const { Email, Password } = this.loginForm.value;
      this.authService.login(Email, Password);
      console.log('sahyt',Email,Password)
    } else {
      this.validateAllFormFields(this.loginForm);
      alert('Your form is invalid.');
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsDirty({ onlySelf: true });
      }
    });
  }
}
