import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-review-new-user',
  templateUrl: './review-new-user.component.html',
  styleUrls: ['./review-new-user.component.css']
})
export class ReviewNewUserComponent implements OnInit {

  registeresUsersList:any[]=[];

  newUserAadharid:any={};

  newAadharObj:any={};

  constructor(private adminDsObj:AdminServiceService) { }

  ngOnInit(): void {
    this.getRegisteredData();
  }

  getRegisteredData(){
    this.adminDsObj.getRegisteredUserData().subscribe(
      res=>{
        this.registeresUsersList=res.rows;
        console.log(this.registeresUsersList);
      },
      err=>{
        console.log("err in reviewing users is",err);
        alert("something went wrong in reviewing reg users")
      }
    )
  }


  onCreateRegisteredUser(registerUserObj){
    
    let newUserData=registerUserObj;

    this.newUserAadharid.aadharno=newUserData[5];

//    this.newAadharObj.aadharno=newUserData[5];

    // console.log(newUserData);

    this.adminDsObj.createRegisteredUser(this.newUserAadharid).subscribe(
      res=>{
        if(res.message=="Account Created"){
          alert("New Acc Created");
          this.getRegisteredData();

        }
        else{
          alert(`res.message`)
        }
      },
      err=>{
        console.log("err in creating ");
        alert(" oops!,error in creating new user")

      }
    )
  }

}
