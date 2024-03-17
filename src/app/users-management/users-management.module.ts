import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UserTableComponent } from './user-table/user-table.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersManagementRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsersManagementModule { }
