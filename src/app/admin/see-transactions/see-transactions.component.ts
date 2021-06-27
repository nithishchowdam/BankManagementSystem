import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-see-transactions',
  templateUrl: './see-transactions.component.html',
  styleUrls: ['./see-transactions.component.css']
})
export class SeeTransactionsComponent implements OnInit {

  accountBalance:any;

  constructor(private adminDsObj:AdminServiceService) { }

  ngOnInit(): void {
  }

  onSubmitFetch(accNo){

    let accountDetails=accNo.value;
    let fromAccountNumber=accountDetails.fromAccNo;
    console.log(fromAccountNumber)

    this.adminDsObj.getAccountBalance(fromAccountNumber).subscribe(
      res=>{
        this.accountBalance=res.rows[0][0];
      },
      err=>{
        console.log("err in fetching account balance",err)
        alert("something went wrong in fetching...try again")
      }
    )


    let toAccountNumber=accountDetails.toAccNo;
    let amount=accountDetails.amount;
    console.log(toAccountNumber)
    console.log(amount)

    if(toAccountNumber!==undefined || null || ""){

      accountDetails.prevbal=this.accountBalance;

      this.adminDsObj.transactions(accountDetails).subscribe(
        res=>{
          if(res.message=="Transaction Successfull"){
            alert("transaction succesfull")
          }
          else{
            alert(res.message);
          }
        },
        err=>{
          console.log("err in transaction",err)
          alert("oops,error in transaaction...try again")
        }
      )


    }




  }

}
