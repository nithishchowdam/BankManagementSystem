import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private hc: HttpClient) { }


  getUsersData(): Observable<any>{
//  return this.hc.get('/admin/getuserslist')
    return this.hc.get('/admin/getuserslist');
  }


  getRegisteredUserData(): Observable<any>{
    return this.hc.get('/admin/getregistereduserdata');
  }


  updateUsers(modifiedUserObj, id): Observable<any>{

    return  this.hc.put('/admin/updateuser/' + id, modifiedUserObj);
  }

  deleteUser(id): Observable<any>{
   return this.hc.delete('/admin/deleteaccount/' + id);

  }

// admin request for creating new user
  createUser(newUserobj): Observable<any>{
  return  this.hc.post('/admin/createaccount/adminrequest', newUserobj);
  }

// creation of user requested by admin
  createRegisteredUser(newUserObj): Observable<any>{
    return this.hc.post('/admin/createaccount/usersrequest', newUserObj);

  }

// feteching account balance
  getAccountBalance(accNO): Observable<any>{

  return this.hc.get('/admin/getbalance/' + accNO);

  }


  // withdraw amount

  getWithdrawDetails(withdrawObj): Observable<any>{
    return this.hc.put('/admin/withdrawl', withdrawObj);
  }


  // deposit

  getDepositDetails(depositObj): Observable<any>{
    return this.hc.put('/admin/deposit', depositObj);
  }



  // transaction from admin

  transactions(transactionOnj): Observable<any>{
    return this.hc.put('/admin/transfer', transactionOnj);
  }



  // get transaction data

  getTransactionData(): Observable<any>{
    return this.hc.get('/admin/transactionhistory');
  }


  // change password by admin

  changePassword(passwordDetails): Observable<any>{
    return this.hc.put('/admin/changepassword/' + localStorage.getItem('AdminId'), passwordDetails);
  }










}
