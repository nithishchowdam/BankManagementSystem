import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.css']
})
export class TransferFundsComponent implements OnInit {

   prevBalance: any;

  constructor(private dsObj: DataServiceService) { }

  ngOnInit(): void {
    this.updatedBalance();

  }


  updatedBalance(){

    this.dsObj.getAccountBalance().subscribe(
      res => {

        this.prevBalance = res.message.rows[0][0];
      },

      err => {
        console.log('err in updatedBalance', err);
        alert('err in fetching new balance');
      }
    );
    }

  onSubmitTranser(ref){


   const transcDetails = ref.value;


   transcDetails.prevbal = this.prevBalance;
   transcDetails.fromAccNo = localStorage.getItem('accountNumber');


   if (transcDetails.amount < 100){
     alert('Please enter amount greater than 100');
   }
   else{
     if (transcDetails.amount > transcDetails.prevbal){
       alert('Insufficient Balance');
     }
     else{

   this.dsObj.usertransferMoney(transcDetails).subscribe(
     res => {

       if (res.message == 'Transaction Successfull'){
          this.updatedBalance();
          alert(' Amount Rs.' + transcDetails.amount + ' Successfully Transfered \n To Account Number :  ' + transcDetails.toAccNo);
          ref.reset();
       }
       else{
         alert(res.message);

       }
     },
     err => {
       console.log('err in transfer is', err);
       alert('something wrong in transfer money');
     }
   );



    }


    }




  }




}
