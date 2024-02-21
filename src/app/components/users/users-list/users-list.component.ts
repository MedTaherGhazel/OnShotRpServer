import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  user: User[] = [];
  pSubscription: Subscription | undefined;

  constructor(private userService: UsersService,
              private http: HttpClient,
              private router: Router) {
    this.pSubscription = this.userService.getUsers().subscribe({
      next: (user) => {
        this.user = user;
        console.log(user)
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  deleteuser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('user deleted successfully');
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  gotToEdit(id: any) {
    this.router.navigate(['/edituser', id]);
  }
}
