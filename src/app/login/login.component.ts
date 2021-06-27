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

//     if(this.adminLoginStatus){
// //admin/login,successful ,Invalid Id,unsuccessful
//       console.log(inputLoginObject);
//       this.dsObj.adminLogin(inputLoginObject).subscribe(
//         res=>{
//           if(res.message=="successful"){
//             this.router.navigateByUrl('/admin');
//           }
//           else{
//             alert(res.message)
//           }
//         },
//         err=>{
//           console.log(err);
//           alert("something went wrong in admin-module..try again")
//         }
//       )

//     }

    if(inputLoginObject.custId==123456 && inputLoginObject.password==123456){
      localStorage.setItem("AdminId",'123456')
      this.router.navigateByUrl('/admin');

    }
    else{

      if(inputLoginObject.custId==19071 && inputLoginObject.password==19071){
        localStorage.setItem("custId",'19071');
        this.router.navigateByUrl('/userProfile')
      }
//user/login,
      // console.log(inputLoginObject);
      // this.dsObj.userLogin(inputLoginObject).subscribe(
      //   res=>{
      //     if(res.message=="successful"){
               
      //       this.router.navigateByUrl(`/userprofile/${res.custId}`)
      //     }
      //     else{
      //       alert(res.message);
      //     }

      //   },
      //   err=>{
      //     console.log(err);
      //     alert("something went wrong in user-login...try again")
      //   }
      // )
    }

  }


}
