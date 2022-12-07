import { Injectable, Output, EventEmitter } from '@angular/core';
import { UserInfo } from 'remult';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  @Output() currentUser = new EventEmitter<UserInfo>();
  constructor() { }
}
