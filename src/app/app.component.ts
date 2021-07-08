import { Component } from '@angular/core';
import { DataServiceService } from './data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BankManagementSystem';

  constructor(public dsObj: DataServiceService){}

  loginStatus: boolean;
  dashStatus = false;
  userLoginStatus(){
    if (( localStorage.getItem('AdminId') != null) || (localStorage.getItem('custId') != null)){
      if (localStorage.getItem('AdminId') != null){
        this.dashStatus = true;
      }
      return true;
    }
    else{
      return false;
    }
  }


    onLogout(){
      this.dashStatus = false;
      localStorage.clear();

    }

}
