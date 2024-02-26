import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent {

    username!:string
    email!:string
    role!:string
    userId!: number
    user!:User

    constructor(
      private http: HttpClient,
      private userService: UsersService,
      private route: ActivatedRoute) {
    }

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
         this.userId = params['id']; // '+' to convert string to number
        this.getUserById(this.userId);
      });
    }
    editUser = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      isAdmin: new FormControl(''),
    })
    getUserById(userId: number): void {
      this.userService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    }

    updateUser(userId :any): void {

      var inputData={
        name:this.user.username,
        role: this.user.isAdmin,
        email: this.user.email,

      }
      console.log(inputData)
      try {
        this.userService.updateUser(userId, inputData).subscribe();
        alert('user updated successfully');
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
}
