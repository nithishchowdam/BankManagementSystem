import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UpdateAccountsComponent } from './update-accounts/update-accounts.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AddUsersbyAdminComponent } from './add-usersby-admin/add-usersby-admin.component';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { ReviewNewUserComponent } from './review-new-user/review-new-user.component'


@NgModule({
  declarations: [
    AdminComponent,
    UpdateAccountsComponent,
    TransactionsComponent,
    ViewUsersComponent,
    ViewTransactionsComponent,
    AddUsersbyAdminComponent,
    CreateNewUserComponent,
    ReviewNewUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class AdminModule { }
