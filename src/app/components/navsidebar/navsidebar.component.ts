import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navsidebar',
  templateUrl: './navsidebar.component.html',
  styleUrls: ['./navsidebar.component.scss']
})
export class NavsidebarComponent {

  constructor(public authService:AuthService){}

logout() {
  this.authService.logout();
}
  sidebarActive=false;
}
