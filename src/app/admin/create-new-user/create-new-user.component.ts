import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {

  constructor(private adminDsObj:AdminServiceService) { }

  ngOnInit(): void {
  }

  onCreateUser(newUser){
    let newUserObj=newUser.value;
    console.log(newUserObj);

    this.adminDsObj.createUser(newUserObj).subscribe(
      res=>{
        if(res.message=="Account Created"){
          alert("new user created")
        }
        else{
          alert(`res.messsage`)
        }
      },
      err=>{
        console.log("err in creating new user by admin is",err);
        alert("oops something went wrong in creating new user")
      }
    )



  }

}
