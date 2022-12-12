import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remult, UserInfo } from 'remult';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private svc: AuthService) { }

  userName = '';
  password='';

  signIn() {
    this.http.post<UserInfo>('/api/signIn',
      {
        username: this.userName,
        password: this.password
      }).subscribe({
        next: user => {
          this.userName = '';
          remult.user = user;         
          this.svc.loggedIn.emit(true);
          this.router.navigate([`/lists`])
        },
        error: error => alert(error.error)
      });
  }

  ngOnInit() {
    this.http.get<UserInfo>('/api/currentUser').subscribe(
      user =>{ 
        remult.user = user;       
        this.svc.loggedIn.emit(true);
        this.router.navigate([`/lists`])
      });
  }

}
