import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './user/users/users.component';

const routes: Routes = [
  // { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: '', component: UsersComponent },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
