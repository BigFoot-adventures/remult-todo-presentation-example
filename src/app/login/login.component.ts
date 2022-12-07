import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
          this.svc.currentUser.emit(user);
          this.userName = '';
          alert('it worked... sorta')
          this.router.navigate([`/profile/${this.userName}/lists`])
        },
        error: error => alert(error.error)
      });
  }

  signOut() {
    this.http.post('/api/signOut', {}).subscribe(() => this.svc.currentUser.emit());
  }

  ngOnInit() {
    this.http.get<UserInfo>('/api/currentUser').subscribe(user => this.svc.currentUser.emit(user))
  }

}
