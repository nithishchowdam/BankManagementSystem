import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersbyAdminComponent } from './add-usersby-admin/add-usersby-admin.component';
import { AdminComponent } from './admin.component';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { ReviewNewUserComponent } from './review-new-user/review-new-user.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UpdateAccountsComponent } from './update-accounts/update-accounts.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { ViewUsersComponent } from './view-users/view-users.component';

const routes: Routes = [  {path:'updateAcc',component:UpdateAccountsComponent},
  {path:'accTransactions',component:TransactionsComponent},
  {path:'addUser',component:AddUsersbyAdminComponent,children:[
    {path:'createUser',component:CreateNewUserComponent},
    {path:'reviewUser',component:ReviewNewUserComponent},
    {path:'', redirectTo:'createUser',pathMatch:'full'},
  ]},
  {path:'getUsers',component:ViewUsersComponent},
  {path:'getTransactions',component:ViewTransactionsComponent},
  { path: '', component: AdminComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
