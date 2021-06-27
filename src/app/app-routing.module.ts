import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { UpdateAccountsComponent } from './admin/update-accounts/update-accounts.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { TransactionStatementComponent } from './transaction-statement/transaction-statement.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';
import { UserAccountInfoComponent } from './user-account-info/user-account-info.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'userProfile',component:UserProfileComponent},
  {path:'userProfile/transferfunds',component:TransferFundsComponent},
  {path:'userProfile/transactionstatements',component:TransactionStatementComponent},
  {path:'userProfile/accountinfo',component:UserAccountInfoComponent},
  {path:'userProfile/changepassword-user',component:UserChangePasswordComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[AdminGuard] },
 
  {path:'', redirectTo:'/home',pathMatch:'full'},
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
