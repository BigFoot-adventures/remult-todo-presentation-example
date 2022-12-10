import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'remult';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private svc: InfoService) { }

  userName = '';
  password=''

  signIn() {
    this.http.post<UserInfo>('/api/signIn',
      {
        username: this.userName,
        password: this.password
      }).subscribe({
        next: user => {
          this.userName = '';
          this.svc.currentUser = user;          
          this.svc.loggedIn.emit(true);
          this.router.navigate([`/lists`])
        },
        error: error => alert(error.error)
      });
  }

  ngOnInit() {
    this.http.get<UserInfo>('/api/currentUser').subscribe(user => this.svc.loggedIn.emit(true))
  }

}
