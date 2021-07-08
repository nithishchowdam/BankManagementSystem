import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  searchTerm:string;
  p = 1;
  usersList: any[] = [];
  constructor(private adminDsObj: AdminServiceService) { }

  ngOnInit(): void {
    this.adminDsObj.getUsersData().subscribe(
      res => {
        this.usersList = res.message.rows;
      },
      err => {
        console.log('err in getusers data is', err);
      }
    );


  }




}
