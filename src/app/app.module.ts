import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SearchPipe } from './search.pipe';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';
import { TransactionStatementComponent } from './transaction-statement/transaction-statement.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { UserAccountInfoComponent } from './user-account-info/user-account-info.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    UserProfileComponent,
    PagenotfoundComponent,
    SearchPipe,
    TransferFundsComponent,
    TransactionStatementComponent,
    UserChangePasswordComponent,
    UserAccountInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
