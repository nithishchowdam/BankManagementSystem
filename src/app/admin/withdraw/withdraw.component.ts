import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  accountBalance: any;

  constructor(private adminDsObj: AdminServiceService) { }

  ngOnInit(): void {
  }

  onSubmitFetch(accObj){

    const accountdetails = accObj.value;
    const accountNumber = accountdetails.accno;
    const withdrawAmount = accountdetails.amount;

// feteching account balance
    if (accountNumber != undefined || null || ''){

    this.adminDsObj.getAccountBalance(accountNumber).subscribe(
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
       console.log(err);
       alert('something went wrong in fetching balance');
     }
   );
    }

// withdraw amount

//  accObj.prevBalance=this.accountBalance;
    if (withdrawAmount != ''){
      if (withdrawAmount < 100){
        alert('Please enter amount greater than 100');

      }
      else{
        if (withdrawAmount > this.accountBalance){
          alert('Insufficient Balance');
        }
        else{
    accountdetails.prevbal = this.accountBalance;

    this.adminDsObj.getWithdrawDetails(accountdetails).subscribe(

    res => {

      if (res.message == 'Withdrawl Successfull'){
        // for updating the balance
        this.adminDsObj.getAccountBalance(accountNumber).subscribe(
          res => {
            this.accountBalance = res.message.rows[0][0];
            alert('Withdrawl Completed from \n Account number-' + accountNumber + '\n Available balance : ' + this.accountBalance);
            location.reload();
          },
          err => {
            console.log(err);
            alert('something went wrong in fetching balance');
          }

        );

        //


      }
      else{
        alert(res.message);
      }


    },

    err => {

      console.log('err in withdraw is', err);
      alert('error in withdraw');
    }
  );
  }




}



  }

  }



}
