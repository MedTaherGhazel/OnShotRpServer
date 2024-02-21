// app.component.ts

import { Component, Inject, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  http= inject(HttpClient)
  ngOnInit(): void {
    this.http.get('http:')
  }
  title = 'product';

}
