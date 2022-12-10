import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'remult';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: UserInfo | undefined;

  constructor(private http: HttpClient, private infoSvc: InfoService) {
    
  }

  ngOnInit(): void {
    this.infoSvc.loggedIn.subscribe((data)=>{
      if(data){
        this.currentUser = this.infoSvc.currentUser;
      }else{
        this.currentUser = undefined;
      }
      console.log(this.currentUser);

    });
  }

  signOut() {
    this.http.post('/api/signOut', {}).subscribe(() => this.infoSvc.loggedIn.emit());
  }

}
