import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  accountBalance:any;
  constructor(private adminDsObj:AdminServiceService) { }

  ngOnInit(): void {
  }

  onSubmitFetch(accObj){
    let accountdetails=accObj.value;

    let accountNumber=accountdetails.accNo;
    let withdrawAmount=accountdetails.withdraw;

    console.log(accountNumber);
    console.log(withdrawAmount);

//fetch account Balance
    if(accountNumber!=undefined || null || ""){
      
      this.adminDsObj.getAccountBalance(accountNumber).subscribe(
       res=>{
         this.accountBalance=res.rows[0][0];
       },
       err=>{
         console.log(err);
         alert("something went wrong in fetching balance")
       }
     )
      }


//withdraw money
      if(withdrawAmount!=("" || undefined)){
        accountdetails.prevbal=this.accountBalance;
        console.log(accountdetails);
    
      this.adminDsObj.getDepositDetails(accountdetails).subscribe(
    
        res=>{
          if(res.message=="Successfully Deposited"){
            alert("deposit completed")
          }

        },
    
        err=>{
          
          console.log("err in deposit is",err)
          alert("something wrong in deposit")
        }
      )
      }




  }

  

}
