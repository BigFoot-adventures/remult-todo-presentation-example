import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { remult } from 'remult';
import { List } from 'src/shared/List';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  listRepo = remult.repo(List);
  lists?: List[];
  user?: string;
  constructor(private route: ActivatedRoute) {
    console.log('list-view');
    
    this.route.parent?.parent?.paramMap.subscribe(param => {
      if(param.get('username') != null){
        this.user = param.get('username')!;
        console.log(this.user);
      }
    });
   }

  ngOnInit(): void {
    this.getLists();
  }

  async getLists(){
    this.lists = await this.listRepo.find({
      where: {name: this.user!}
    });
  }

}
