import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-user-account-info',
  templateUrl: './user-account-info.component.html',
  styleUrls: ['./user-account-info.component.css']
})
export class UserAccountInfoComponent implements OnInit {
  myData: any;
  constructor(private userObj: DataServiceService) { }

  ngOnInit(): void {


    this.userObj.getUserDataById(localStorage.getItem('custId')).subscribe(
      res => {

        this.myData = res.message.rows[0];
        console.log(this.myData);
      },
      err => {
        console.log('error is ', err);
        alert('something went wrong in user profile');
      }

    );

  }

}
