import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails:any;
  constructor(private DsObj:DataServiceService) { }

  ngOnInit(): void {
    this.DsObj.getUserProfile(localStorage.getItem("custId")).subscribe(
      res=>{
        this.userDetails=res.rows[0][10];
        localStorage.setItem("accountNumber",this.userDetails);
      },
      err=>{
        console.log("err in userprofile",err);
        alert("somrthing went wrong in userprofile")

      }
    )

  }



}
