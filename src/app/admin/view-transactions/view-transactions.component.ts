import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit {

  transactionData:any[]=[];


  constructor(private adminDsObj:AdminServiceService) { }

  ngOnInit(): void {
    this.adminDsObj.getTransactionData().subscribe(
      res=>{
        this.transactionData=res.rows;
        console.log(this.transactionData)
      }
    )

  }



}
