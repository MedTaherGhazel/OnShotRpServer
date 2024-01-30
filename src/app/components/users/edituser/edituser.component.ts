import { Component } from '@angular/core';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent {

    username!:string
    email!:string
    role!:string



    saveuser(){
      var inputData={
    username:this.username,
    email:this.username,
   role:this.role

      }
    }
}
