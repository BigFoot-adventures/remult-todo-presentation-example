import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remult } from 'remult';
import { User } from 'src/shared/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) { }

  userRepo = remult.repo(User);
  userName = '';
  firstName = '';
  lastName = '';
  password = '';

  ngOnInit(): void {
  }

  async signUp(){
    let newUser = new User(
      this.userName,
      this.firstName,
      this.lastName,
      this.password
    );
    let found = await this.userRepo.find({where: {userName: this.userName}});
    
    if(found.length == 0){
      try{
        await this.userRepo.insert(newUser);
        this.router.navigate(['/lists']);
      }catch(err:any){
        console.log(err.message);
      }
    }else{
      alert("Username in use");
    }
  }

}
