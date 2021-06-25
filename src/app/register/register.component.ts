import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  
  constructor(private router:Router,private dsobj:DataServiceService) { }

  ngOnInit(): void {
  }

  onRegister(){
    this.router.navigateByUrl('/login')

  }

  onSubmitRegister(registerObj){

    let userRegisterObj=registerObj.value;
    console.log(userRegisterObj);

    this.dsobj.registeredUser(userRegisterObj).subscribe(
      res=>{
        if(res.message=="successful"){
          this.router.navigateByUrl('/login')
        }
        else{
          alert(`res.message`)
        }
      },
      err=>{
        console.log(err);
        alert("something went wrong in registering acc")
      }
    )
  }

}


