import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private hc: HttpClient) { }

  adminLogin(adminObj): Observable<any>{
    return  this.hc.post('/admin/login', adminObj);
  }

  userLogin(userObj): Observable<any>{
   return this.hc.post('/user/login', userObj);
  }

  getUserProfile(id): Observable<any>{
    return this.hc.get('/users/viewprofile/' + id);
  }

  registeredUser(registeredobj): Observable<any>{
    return this.hc.post('/user/register/', registeredobj);
  }
  getUserDataById(id): Observable<any>{
    return this.hc.get('/user/viewprofile/' + id);

  }


  getAccountNo(id): Observable<any>{
    return this.hc.get('/user/accountno/' + id);
  }


  usertransferMoney(transferDetails): Observable<any>{

   return this.hc.put('/user/transfer', transferDetails);

  }


  getAccountBalance(): Observable<any>{

    return this.hc.get('/user/getbalance/' + localStorage.getItem('custId'));

    }


    getUserTransactionHistory(): Observable<any>{
     return this.hc.get('/user/transactionhistory/' + localStorage.getItem('accountNumber'));
    }


    changePassword(passwordDetails): Observable<any>{
      return this.hc.put('/user/changepassword/' + localStorage.getItem('custId'), passwordDetails);
    }






}
