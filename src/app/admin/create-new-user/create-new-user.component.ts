import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {

  constructor(private adminDsObj: AdminServiceService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onCreateUser(newUser){
    const newUserObj = newUser.value;
    console.log(newUserObj);

    this.adminDsObj.createUser(newUserObj).subscribe(
      res => {
        console.log(res);
        if (res.message == 'Account Created'){
          this.toastr.success('Created','New Account');
          setTimeout(()=>location.reload(),4000)
        }
        else{
          alert(res.message);
        }
      },
      err => {
        console.log('err in creating new user by admin is', err);
        alert('oops something went wrong in creating new user');
      }
    );



  }

}
