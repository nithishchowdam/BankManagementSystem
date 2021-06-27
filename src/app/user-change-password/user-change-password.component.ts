import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  newPasswordObj:any={};


  constructor(private dsobj:DataServiceService) { }

  ngOnInit(): void {
  }

  onSubmitPassword(passwordDetails){

    let password=passwordDetails.value;
    let enteredPass=password.password;
    let confirmPass=password.ConfirmPassword;

    console.log(enteredPass);
    console.log(confirmPass);


    if(enteredPass===confirmPass){

      this.newPasswordObj.newpassword=confirmPass;

      this.dsobj.changePassword(this.newPasswordObj).subscribe(
        res=>{
          if(res.message=="Password Successfully Updated")
          alert("password successfully changed");
        },
        err=>{
          console.log("something went wrong in changing password",err);
          alert("something went wrong in changing password...try again")
        }
      )
    }
    else{
      alert("password doesnt match...please enter again");
    }


  }

}
