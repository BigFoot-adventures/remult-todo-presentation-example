import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { profile } from 'console';
import { ListViewComponent } from './list-view/list-view.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
    children: [
      {
        path: 'lists',
        component: ListViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
