import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-see-transactions',
  templateUrl: './see-transactions.component.html',
  styleUrls: ['./see-transactions.component.css']
})
export class SeeTransactionsComponent implements OnInit {

  accountBalance: any;

  constructor(private adminDsObj: AdminServiceService) { }

  ngOnInit(): void {
  }

  onSubmitFetch(accNo){

    const accountDetails = accNo.value;

    const fromAccountNumber = accountDetails.fromAccNo;


    this.adminDsObj.getAccountBalance(fromAccountNumber).subscribe(
      res => {
        if (res.message == 'Please enter a valid account number'){
          alert(res.message);
          location.reload();
        }
        else{

        this.accountBalance = res.message.rows[0][0];
        }
      },
      err => {
        console.log('err in fetching account balance', err);
        alert('something went wrong in fetching...try again');
      }
    );


    const toAccountNumber = accountDetails.toAccNo;
    const amount = accountDetails.amount;

    if ((toAccountNumber != '') && (amount != '')){
      if (accountDetails.amount < 100){
        alert('Please enter amount greater than 100');

      }
      else{
        if (amount > this.accountBalance){
          alert('Insufficient Balance');
        }
        else{

      accountDetails.prevbal = this.accountBalance;

      this.adminDsObj.transactions(accountDetails).subscribe(
        res => {
          if (res.message == 'Transaction Successfull'){
            // for fetching updated balance
            this.adminDsObj.getAccountBalance(fromAccountNumber).subscribe(
              res => {
                this.accountBalance = res.message.rows[0][0];
                alert('Amount Rs.' + amount + '  Successfully Transfered  \n to  Account number-' + toAccountNumber + '\n from Account -' + fromAccountNumber + '\n Available balance -' + this.accountBalance);
                location.reload();

              },
              err => {
                console.log('err in fetching account balance', err);
                alert('something went wrong in fetching...try again');
              }
            );

          }
          else{
            alert(res.message);
          }
        },
        err => {
          console.log('err in transaction', err);
          alert('oops,error in transaaction...try again');
        }
      );


    }


  }
  }

  }

}
