import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersbyAdminComponent } from './add-usersby-admin/add-usersby-admin.component';
import { AdminComponent } from './admin.component';
import { ChangePassWordComponent } from './change-pass-word/change-pass-word.component';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { DepositComponent } from './deposit/deposit.component';
import { ReviewNewUserComponent } from './review-new-user/review-new-user.component';
import { SeeTransactionsComponent } from './see-transactions/see-transactions.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UpdateAccountsComponent } from './update-accounts/update-accounts.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

const routes: Routes = [  {path:'updateAcc',component:UpdateAccountsComponent},
  {path:'accTransactions',component:TransactionsComponent,children:[
    {path:'withdraw',component:WithdrawComponent},
    {path:'deposit',component:DepositComponent},
    {path:'makeTransactions',component:SeeTransactionsComponent},
    {path:'',redirectTo:'withdraw',pathMatch:'full'}
  ]},
  {path:'addUser',component:AddUsersbyAdminComponent,children:[
    {path:'createUser',component:CreateNewUserComponent},
    {path:'reviewUser',component:ReviewNewUserComponent},
    {path:'', redirectTo:'createUser',pathMatch:'full'},
  ]},
  {path:'getUsers',component:ViewUsersComponent},
  {path:'getTransactions',component:ViewTransactionsComponent},
  {path:'changePass',component:ChangePassWordComponent},
  { path: '', component: AdminComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
