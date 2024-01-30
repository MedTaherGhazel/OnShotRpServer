import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';//créer et valider des formulaires réactifs dans Angular.
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
  

  Onsignup(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value)
    }
    else{
    
        this.validateAllFormFileds(this.signupForm);
        alert("your form is invalid ")
    }
  }
  private  validateAllFormFileds(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control=formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control  instanceof FormGroup){
        this.validateAllFormFileds(control)
      }
    })
  }
}
