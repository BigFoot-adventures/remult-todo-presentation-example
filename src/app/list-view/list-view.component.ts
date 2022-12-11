import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remult, UserInfo } from 'remult';
import { List } from 'src/shared/List';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  listRepo = remult.repo(List);
  lists: List[] = [];
  user?: UserInfo;
  constructor(private svc: InfoService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.svc.currentUser;
    this.getLists();
    this.svc.loggedIn.subscribe((data) => {
      if(data){
        this.getLists();
      }else{
        this.router.navigate(['/login']);
      }
    })
  }

  async getLists(){
    this.lists = await this.listRepo.find({      
      where: {user: this.user?.id}
    });
  }

  async addList() {
    if(this.user?.id){
      try{
        let newList = new List(this.user.id);
        await this.listRepo.save(newList);
        this.getLists();
      }catch(err: any){
        console.log(err.message);
      }
    }
  }
  
}
