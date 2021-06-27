import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-change-pass-word',
  templateUrl: './change-pass-word.component.html',
  styleUrls: ['./change-pass-word.component.css']
})
export class ChangePassWordComponent implements OnInit {

  newPasswordObj:any={};

  constructor(private adminDsObj:AdminServiceService) { }

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


      this.adminDsObj.changePassword(this.newPasswordObj).subscribe(
        res=>{
          if(res.message=="Password Updated Successfully"){
            alert("password successfully changed");
          }
        },
        err=>{
          console.log("something went wrong in changing password",err);
          alert("something went wrong in changing password...try again")
        }
      )
    }
    else{
      alert("password doesnt match...please enter again")
    }


  }

}
