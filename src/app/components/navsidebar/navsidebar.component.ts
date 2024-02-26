import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navsidebar',
  templateUrl: './navsidebar.component.html',
  styleUrls: ['./navsidebar.component.scss']
})
export class NavsidebarComponent {
  cookieService = inject(CookieService)
  router = inject(Router)
  constructor(public authService:AuthService){}

logout() {
// Clear local storage
localStorage.removeItem('isAdmin');
localStorage.removeItem('email');
localStorage.removeItem('username');
localStorage.removeItem('password');
localStorage.removeItem('sessionToken');

// Clear cookie
this.cookieService.delete('med');

// Additional cleanup or redirection if needed
alert('Logged out successfully');
// For example, you might want to navigate the user to the login page after logout
this.router.navigateByUrl('/login');}

  sidebarActive=false;
}
