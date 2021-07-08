import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-change-pass-word',
  templateUrl: './change-pass-word.component.html',
  styleUrls: ['./change-pass-word.component.css']
})
export class ChangePassWordComponent implements OnInit {

  newPasswordObj: any = {};

  constructor(private adminDsObj: AdminServiceService, private router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }


  onSubmitPassword(passwordDetails): void {

    const password = passwordDetails.value;
    const enteredPass = password.password;
    const confirmPass = password.ConfirmPassword;
    if (enteredPass === confirmPass){

      this.newPasswordObj.newPassword = confirmPass;
      this.adminDsObj.changePassword(this.newPasswordObj).subscribe(
        res => {
          if (res.message == 'Password Updated Successfully'){
            alert('Password successfully changed');
            localStorage.clear();
            this.router.navigateByUrl('/login');

          }
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
