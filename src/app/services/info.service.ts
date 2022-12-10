import { Injectable, Output, EventEmitter } from '@angular/core';
import { UserInfo } from 'remult';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  @Output() loggedIn = new EventEmitter<boolean>();

  currentUser: UserInfo | undefined;
  constructor() {
    this.loggedIn.subscribe((data) => {
      if(!data){
        this.currentUser = undefined;
      }
    })
  }
}
