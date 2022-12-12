import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { remult } from 'remult';
import { User } from 'src/shared/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User | undefined;

  constructor(private http: HttpClient, private auth: AuthService) {
    
  }

  ngOnInit(): void {
    this.auth.loggedIn.subscribe((data)=>{
      if(data){
        this.currentUser = remult.user as User;

      }else{
        this.currentUser = undefined;
      }
    });
  }

  signOut() {
    this.http.post('/api/signOut', {}).subscribe(() => {
      remult.user = undefined;
      this.auth.loggedIn.emit();
    });
  }

}
