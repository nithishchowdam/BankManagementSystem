import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-transaction-statement',
  templateUrl: './transaction-statement.component.html',
  styleUrls: ['./transaction-statement.component.css']
})
export class TransactionStatementComponent implements OnInit {
 
  getTransactions:any[]=[];

  constructor(private dsObj:DataServiceService) { }

  ngOnInit(): void {

    this.dsObj.getUserTransactionHistory().subscribe(
      res=>{
        this.getTransactions=res.rows;
      },
      err=>{
        console.log("err in getting transaction data",err);
        alert("oops! something went wrong in grtting transactions")

      }
    )

  }



}
