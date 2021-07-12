import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private dsObj:DataServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(ref){
    console.log(ref.value);
    let detailsObj=ref.value;
    let id=detailsObj.id;
    let type=detailsObj.type;
    if(type=="admin"){
      this.dsObj.adminForgotPassword(detailsObj).subscribe(
        res=>{
          console.log(res)
          if(res.message=="Invalid Id"){
            alert("Invalid Id")
          }
          else{
            alert("New password sent to mail");
            this.router.navigateByUrl("/login");
          }
        },
        err=>{
          console.log(err);
          alert("Something went wrong please try again");
        }
      );
    }
    else{
      this.dsObj.userForgotPassword(detailsObj).subscribe(
        res=>{
          if(res.message=="Invalid Id"){
            alert("Invalid Id")
          }
          else{
            alert("New password sent to mail");
            this.router.navigateByUrl("/login");
          }
        },
        err=>{
          console.log(err);
          alert("Something went wrong please try again");
        }
      )
    }
  }

}
