import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private dsObj: DataServiceService,private toastr:ToastrService) { }

  adminLoginStatus = false;

  ngOnInit(): void {
  }

  onRegister(){
    this.router.navigateByUrl('/register');
  }

  // onAdminLogin(){
  //   this.adminLoginStatus=true;
  // }


// Admin Login Functionality------

  onLogin(credentials){
    const inputLoginObject = credentials.value;


    if (inputLoginObject.type === 'admin'){
// admin/login,successful ,Invalid Id,unsuccessful
      
      this.dsObj.adminLogin(inputLoginObject).subscribe(
        res => {
          if (res.message == 'successful'){
            localStorage.setItem('AdminId', inputLoginObject.id);
            this.router.navigateByUrl('/admin');
          }
          else{
            this.toastr.error(" ",`${res.message}`)
            //alert(res.message);
          }
        },
        err => {
          console.log(err);
          alert('something went wrong in admin-module..try again');
        }
      );

    }

    // if(inputLoginObject.custId==123456 && inputLoginObject.password==123456){
    //   localStorage.setItem("AdminId",'123456')
    //   this.router.navigateByUrl('/admin')

    // }
    else{

      // if(inputLoginObject.custId==19071 && inputLoginObject.password==19071){
      //   localStorage.setItem("custId",'19071');
      //   this.router.navigateByUrl('/userProfile')
      // }
// user/login,
     
      this.dsObj.userLogin(inputLoginObject).subscribe(
        res => {
          if (res.message == 'successful'){
            localStorage.setItem('custId', inputLoginObject.id);
            this.router.navigateByUrl('/userProfile');
          }
          else{
            this.toastr.error(" ",`${res.message}`)
            //alert(res.message);
          }

        },
        err => {
          console.log(err);
          alert('something went wrong in user-login...try again');
        }
      );
    }

  }


}
