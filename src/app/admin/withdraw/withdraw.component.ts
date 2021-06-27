import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

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

// feteching account balance 
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

// withdraw amount 

//  accObj.prevBalance=this.accountBalance;
    if(withdrawAmount!=( "" || undefined || null)){
    accountdetails.prevbal=this.accountBalance;
    console.log(accountdetails);

  this.adminDsObj.getWithdrawDetails(accountdetails).subscribe(

    res=>{
      if(res.message=="Withdrawl Successfull"){
        alert("withdraw completed");
      }
      
    },

    err=>{
      
      console.log("err in withdraw is",err)
      alert("error in withdraw")
    }
  )
  }

 


  



  }




  
}
