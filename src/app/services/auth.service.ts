import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username: string = "";
  email: string = "";
  password: string = "";

  private isAuthenticatedValue: boolean = false;
  constructor(private http: HttpClient){}
  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    this.isAuthenticatedValue=true
    return this.http.post('http://localhost:8088/auth/login', loginData);
  }

  register(bodyData : any) {

    console.log(bodyData)
    this.http.post("http://localhost:8088/auth/login",bodyData)
  }

  logout(): void {
    // Perform any cleanup or additional steps during logout
    this.isAuthenticatedValue = false;
  }
}
