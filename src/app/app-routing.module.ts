import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { profile } from 'console';
import { ListViewComponent } from './list-view/list-view.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile/',
    component: ProfileComponent,
    canActivate:[AuthService]
  },
  {
    path: 'lists',
    component: ListViewComponent,
    canActivate:[AuthService]
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
