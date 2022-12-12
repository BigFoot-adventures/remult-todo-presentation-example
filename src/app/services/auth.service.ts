import { EventEmitter, Injectable, Output } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { remult } from 'remult';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  @Output() loggedIn = new EventEmitter<boolean>();

  constructor(private router: Router) { }
  canActivate() {
    if(remult.user){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
