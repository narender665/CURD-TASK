import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    UsersComponent,
    CreateUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,FormsModule,
    UserRoutingModule,BrowserModule,ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()

  ]
})
export class UserModule { }
