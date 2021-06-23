import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private dsObj:DataServiceService) { }

  adminLoginStatus=false;

  ngOnInit(): void {
  }

  onRegister(){
    this.router.navigateByUrl('/register')
  }

  onAdminLogin(){
    this.adminLoginStatus=true;
  }


//Admin Login Functionality------

  onLogin(credentials){
    let inputLoginObject=credentials.value;

    if(this.adminLoginStatus){
//admin/login,successful ,Invalid Id,unsuccessful
      console.log(inputLoginObject);
      this.dsObj.adminLogin(inputLoginObject).subscribe(
        res=>{
          if(res.message=="successful"){
            this.router.navigateByUrl('/admin');
          }
          else{
            alert(res.message)
          }
        },
        err=>{
          console.log(err);
          alert("something went wrong in admin-module..try again")
        }
      )

    }
    else{
//user/login,
      console.log(inputLoginObject);
      this.dsObj.userLogin(inputLoginObject).subscribe(
        res=>{
          if(res.message=="successful"){
            this.router.navigateByUrl(`/userprofile/${res.custId}`)
          }
          else{
            alert(res.message);
          }

        },
        err=>{
          console.log(err);
          alert("something went wrong in user-login...try again")
        }
      )
    }

  }


}
