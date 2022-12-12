import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remult, UserInfo } from 'remult';
import { List } from 'src/shared/List';
import { User } from 'src/shared/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  listRepo = remult.repo(List);
  lists: List[] = [];
  user?: UserInfo;
  constructor(private svc: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = remult.user;
    this.getLists();
    this.svc.loggedIn.subscribe((data) => {
      if(data){
        this.user = remult.user;
        this.getLists();
      }else{
        this.router.navigate(['/login']);
      }
    })
  }

  async getLists(){
    let obj = this.user as User;
    if(obj?.userName){
      this.lists = await this.listRepo.find({      
        where: {user: obj.userName}
      });      
    }    
  }

  async addList() {
    if(this.user?.id){
      try{
        let obj = this.user as User;
        let newList = new List(obj.userName);
        await this.listRepo.save(newList);
        this.getLists();
      }catch(err: any){
        console.log(err.message);
      }
    }
  }
  
}
