import { Component } from '@angular/core';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent {
  Fullname!:string
  email!:string
  role!:string
 


  saveuser(){
    var inputData={
  Fullname:this.Fullname,
  email:this.Fullname,
 role:this.role

    }
  }
}
