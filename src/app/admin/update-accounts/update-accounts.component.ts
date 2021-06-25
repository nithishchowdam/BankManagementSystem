import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-update-accounts',
  templateUrl: './update-accounts.component.html',
  styleUrls: ['./update-accounts.component.css']
})
export class UpdateAccountsComponent implements OnInit {

  usersList:any[]=[];

  editUserIndex;
  editUserObj;
  editUserStatus:boolean=false;
  
  constructor(private adminDsObj:AdminServiceService) { }

  ngOnInit(): void {
    this.getUsers();
  }

//get users function
  getUsers(){
    this.adminDsObj.getUsersData().subscribe(
      res=>{
        this.usersList=res.rows;
        console.log(this.usersList);
      },
      err=>{
        console.log(err);
        alert("error in getUsers data")
      }
    )
  }

  

  editUser(userobj,ind){
    this.editUserObj=userobj;
    this.editUserIndex=ind;
    this.editUserStatus=true;
    
  }

//update users  

  saveUserData(modifiedUserObj){
    this.editUserStatus=false;
    console.log(this.editUserIndex);

    modifiedUserObj[0]=this.editUserObj[0];
    modifiedUserObj[6]=this.editUserObj[6];
    modifiedUserObj[7]=this.editUserObj[7];
    modifiedUserObj[8]=this.editUserObj[8];
    modifiedUserObj[9]=this.editUserObj[9];
    modifiedUserObj[10]=this.editUserObj[10];

    this.adminDsObj.updateUsers(modifiedUserObj).subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log("err in update is",err)
      }
    )

    console.log(modifiedUserObj);
  }

//delete users
  deleteUserData(userobj){
    console.log("user to delete is",userobj[0]);

    this.adminDsObj.deleteUser(userobj[0]).subscribe(
      res=>{
        this.getUsers();
        alert("user deleted")
      },
      err=>{
        console.log("err in delete user is",err)
      }
    )


  }


}
