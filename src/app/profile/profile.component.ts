import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { remult, UserInfo } from 'remult';
import { TasksController } from 'src/shared/TasksController';
import { User } from 'src/shared/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userRepo = remult.repo(User);

  constructor(private client: HttpClient, private auth:AuthService) { }
  userNameOld = '';
  userNameNew = '';
  firstName = '';
  lastName = '';
  passwordNew = '';
  passwordNewAgain = '';
  passwordOld = '';

  ngOnInit(): void {
  }

  async saveChanges(){
    let found = await this.userRepo.find({where: {userName: this.userNameNew}});

    if(found.length == 0){
      this.client.post<UserInfo>('/api/Signin', {
        username: this.userNameOld,
        password: this.passwordOld
      }).subscribe({

        next: async (data) => {
          let newUsername = false;
          let obj = data as User;
          let user = await this.userRepo.findFirst({id: obj.id});
          let obj2 = await this.userRepo.findFirst({id: remult.user?.id});
          if(remult.authenticated()){
            console.log('true');
            
          }else{console.log('false');
          }
          if(obj2.userName == user.userName && obj2.password == user.password){
            let updateUser = user;
            //newUser.id = obj.id
            if(this.userNameNew != ""){
              updateUser.userName =  this.userNameNew;
              newUsername = true
            }
            if(this.firstName != "")
              updateUser.firstName = this.firstName;
            if(this.lastName != "")
              updateUser.lastName = this.lastName;
            if(this.passwordNew != "" || this.passwordNewAgain != ""){
              if(this.passwordNew == this.passwordNewAgain){
                updateUser.password = this.passwordNew;
              }else{
                alert('Passwords must match');
              }
            }

            const newuser = await this.userRepo.save(updateUser); 
            if(newUsername){
              await TasksController.updatedUsername(this.userNameOld, this.userNameNew);
              this.client.post<UserInfo>('/api/Signin', newuser).subscribe(
                user =>{
                  remult.user = user;        
                  this.auth.loggedIn.emit(true);
              });
            }

            alert('Changes saved!');     
            this.userNameOld = '';
            this.userNameNew = '';
            this.firstName = '';
            this.lastName = '';
            this.passwordNew = '';
            this.passwordNewAgain = '';
            this.passwordOld = '';
            
          }else{
            alert({obj})
          }

        },

        error: () => {
          alert('Invalid credentials')
        }

      });

    }else{
      alert("Username in use");
    }

  }
}
/*
[
  {
    "id": "62b74d9e-5a5b-4f17-bc5c-8c2a880469eb",
    "userName": "Ukudood",
    "firstName": "Brendon",
    "lastName": "",
    "password": "music"
  },
  {
    "id": "68902429-d3ce-4e38-85d9-01f1dad0ffd8",
    "userName": "creature",
    "firstName": "Big",
    "lastName": "Foot",
    "password": "jerky"
  },
  {
    "id": "9fbca97f-378c-443e-8f0a-578f4242d3ef",
    "userName": "redVine",
    "firstName": "Mikayla",
    "lastName": "White",
    "password": "viola"
  }
]
*/
