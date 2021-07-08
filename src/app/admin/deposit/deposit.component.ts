import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  accountBalance: any;
  constructor(private adminDsObj: AdminServiceService) { }

  ngOnInit(): void {
  }

  onSubmitFetch(accObj){
    const accountdetails = accObj.value;


    const accountNumber = accountdetails.accno;
    const withdrawAmount = accountdetails.amount;



// fetch account Balance
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


// withdraw money
    if (withdrawAmount != ('')){
        if (withdrawAmount < 100){
          alert('Please enter amount greater than 100');
        }
        else{
      accountdetails.prevbal = this.accountBalance;
      this.adminDsObj.getDepositDetails(accountdetails).subscribe(

        res => {
          if (res.message == 'Successfully Deposited'){
            // for updating the balance
            this.adminDsObj.getAccountBalance(accountNumber).subscribe(
              res => {
                this.accountBalance = res.message.rows[0][0];
                alert('Successfully Deposited to  \n Account number-' + accountNumber + '\n Available balance -' + this.accountBalance);
                location.reload();
                 },

              err => {
                console.log(err);
                alert('something went wrong in fetching balance');
              }
            );

          }
          else{
            alert(res.message);
          }

        },

        err => {

          console.log('err in deposit is', err);
          alert('something wrong in deposit');
        }
      );
      }

    }


  }



}
