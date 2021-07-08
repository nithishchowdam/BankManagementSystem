import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private dsobj: DataServiceService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onRegister(){
    this.router.navigateByUrl('/login');

  }

  onSubmitRegister(registerObj){

    const userRegisterObj = registerObj.value;
    console.log(userRegisterObj);

    this.dsobj.registeredUser(userRegisterObj).subscribe(
      res => {
        if (res.message == 'Registered Successfully'){
          this.toastr.success('Registration', 'Sucessfull!');
          this.router.navigateByUrl('/login');
        }
        else{
          alert(res.message);
        }
      },
      err => {
        console.log(err);
        alert('something went wrong in registering acc');
      }
    );
  }

}


