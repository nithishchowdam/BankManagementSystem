import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private hc:HttpClient) { }

  adminLogin(adminObj):Observable<any>{
    return  this.hc.post("/admin/login",adminObj)
  }

  userLogin(userObj):Observable<any>{
   return this.hc.post('/user/login',userObj)
  }

  registeredUser(registeredobj):Observable<any>{
    return this.hc.post("/user/registeredUser/",registeredobj)
  }


  userLoginStatus():boolean{
  if(localStorage.getItem("custId")==null){
    return false;
  }
  else{
    return true;
  }
}

  onLogout(){
    localStorage.clear();
  }


}
