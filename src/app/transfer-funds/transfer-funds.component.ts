import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.css']
})
export class TransferFundsComponent implements OnInit {

   prevBalance:any;

  constructor(private dsObj:DataServiceService) { }

  ngOnInit(): void {
    this.prevBalance=this.updatedBalance();
  }


  updatedBalance(){
    let newBalance;
    this.dsObj.getAccountBalance().subscribe(
      res=>{
        newBalance=res.rows[0][0];
      },

      err=>{
        console.log("err in updatedBalance",err);
        alert("err in fetching new balance");
      }
    )

    return newBalance;
  }

  onSubmitTranser(ref){

   let transcDetails=ref.value;


   transcDetails.prevbal=this.prevBalance;

   this.dsObj.usertransferMoney(transcDetails).subscribe(
     res=>{
       if(res.message=="Transaction Succesfull"){
         this.prevBalance= this.updatedBalance();
         alert("transfer done");
       }
     },
     err=>{
       console.log("err in transfer is",err);
       alert("something wrong in transfer money")
     }
   )



   





    
  }




}
