import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private hc:HttpClient) { }


  getUsersData():Observable<any>{
//  return this.hc.get('/admin/getuserslist')
    return this.hc.get('http://localhost:3000/items')
  }


  getRegisteredUserData():Observable<any>{
    return this.hc.get('http://localhost:3000/items2')
  }


  updateUsers(modifiedUserObj):Observable<any>{
//  return this.hc.get('/admin/updateUsers/'+modifiedUserObj[0],modifiedUserObj)    
    return  this.hc.put("http://localhost:3000/items/"+modifiedUserObj[0],modifiedUserObj)
  }

  deleteUser(id):Observable<any>{
    console.log("id is ",id)
//  return this.hc.delete('/admin/deleteUser/'+id)   
    return this.hc.delete("http://localhost:3000/items/"+id)
  }


  createUser(newUserobj):Observable<any>{
  return  this.hc.post('/admin/createUser',newUserobj)
  }


  createRegisteredUser(newUserObj):Observable<any>{
    return this.hc.post('http://localhost:3000/admin/createaccount/usersrequest',newUserObj[5])

  }


  


}
