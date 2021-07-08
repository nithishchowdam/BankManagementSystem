import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  newPasswordObj: any = {};


  constructor(private dsobj: DataServiceService, private router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmitPassword(passwordDetails){

    const password = passwordDetails.value;
    const enteredPass = password.password;
    const confirmPass = password.ConfirmPassword;




    if (enteredPass === confirmPass){

      this.newPasswordObj.newPassword = confirmPass;

      this.dsobj.changePassword(this.newPasswordObj).subscribe(
        res => {
          if (res.message == 'Password Successfully Updated') {
          alert('password successfully changed');
          }
          localStorage.clear();
          this.router.navigateByUrl('/login');

        },
        err => {
          console.log('something went wrong in changing password', err);
          alert('something went wrong in changing password...try again');
        }
      );
    }
    else{
      this.toastr.error("Please enter again","Password doesnt match... ")
      //alert('password doesnt match...please enter again');
    }


  }

}
