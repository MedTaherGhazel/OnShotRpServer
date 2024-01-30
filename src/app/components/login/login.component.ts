import { Component, OnInit } from '@angular/core';//définir un composant
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';//créer et valider des formulaires réactifs dans Angular.
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}// module qui permet de créer une formulaire dynamique 

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
    });
  }
  

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
    }
    else{
    
        this.validateAllFormFileds(this.loginForm);
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
