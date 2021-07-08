import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-update-accounts',
  templateUrl: './update-accounts.component.html',
  styleUrls: ['./update-accounts.component.css']
})
export class UpdateAccountsComponent implements OnInit {

  usersList: any;
  updatedId;
  searchTerm:string;

  modifiedUserData: any = {};
  editUserIndex;
  editUserObj;
  editUserStatus = false;

  constructor(private adminDsObj: AdminServiceService,private toastr:ToastrService) { }

  p = 1;
  ngOnInit(): void {
    this.getUsers();
  }

// get users function
  getUsers(){
    this.adminDsObj.getUsersData().subscribe(
      res => {
        this.usersList = res.message.rows;

      },
      err => {
        console.log(err);
        alert('error in getUsers data');
      }
    );
  }



  editUser(userobj, ind){
    this.editUserObj = userobj;
    this.editUserIndex = ind;

    this.updatedId = this.usersList[this.editUserIndex][0];
    this.editUserStatus = true;

  }

// update users

  saveUserData(modifiedUserObj){
    this.editUserStatus = false;


    // modifiedUserObj[0]=this.editUserObj[0];
    // modifiedUserObj[6]=this.editUserObj[6];
    // modifiedUserObj[7]=this.editUserObj[7];
    // modifiedUserObj[8]=this.editUserObj[8];
    // modifiedUserObj[9]=this.editUserObj[9];
    // modifiedUserObj[10]=this.editUserObj[10];


    // this.modifiedUserData.id=modifiedUserObj[0];
    // this.modifiedUserData.custname=modifiedUserObj[1];
    // this.modifiedUserData.custaddress=modifiedUserObj[2];
    // this.modifiedUserData.custmobileno=modifiedUserObj[3];
    // this.modifiedUserData.custdob=modifiedUserObj[4];
    // this.modifiedUserData.custemail=modifiedUserObj[5];
    // console.log(this.modifiedUserData)


    this.adminDsObj.updateUsers(modifiedUserObj, this.updatedId ).subscribe(
      res => {
        if (res.message == 'Updated Successfully'){
          this.toastr.success(" ",`${res.message}`)
          //alert('updated succesfully');
        }
      },
      err => {
        console.log('err in update is', err);
        alert('err in update');
      }
    );

  }

// delete users
  deleteUserData(userobj){
    console.log('user to delete is', userobj[0]);


    this.adminDsObj.deleteUser(userobj[0]).subscribe(
      res => {
        this.getUsers();
        if (res.message == 'User Account Deleted Successfully'){
         // alert('user deleted');
          this.toastr.success(" ","Deleted Successfully")
        }

      },
      err => {
        console.log('err in delete user is', err);
      }
    );


  }


}
