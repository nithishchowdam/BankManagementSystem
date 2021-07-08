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
import { ReviewNewUserComponent } from './review-new-user/review-new-user.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositComponent } from './deposit/deposit.component';
import { SeeTransactionsComponent } from './see-transactions/see-transactions.component';
import { ChangePassWordComponent } from './change-pass-word/change-pass-word.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { SearchAccnoPipe } from './search-accno.pipe';
import { SearchTranAccnoPipe } from './search-tran-accno.pipe';
import { SearchTranIdPipe } from './search-tran-id.pipe';


@NgModule({
  declarations: [
    AdminComponent,
    UpdateAccountsComponent,
    TransactionsComponent,
    ViewUsersComponent,
    ViewTransactionsComponent,
    AddUsersbyAdminComponent,
    CreateNewUserComponent,
    ReviewNewUserComponent,
    WithdrawComponent,
    DepositComponent,
    SeeTransactionsComponent,
    ChangePassWordComponent,
    SearchAccnoPipe,
    SearchTranAccnoPipe,
    SearchTranIdPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
