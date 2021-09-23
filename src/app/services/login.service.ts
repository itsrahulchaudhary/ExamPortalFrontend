import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 public loginStausSubject = new Subject<Boolean>();

  constructor(private http:HttpClient) { }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)
  }

  // generate token
  public generateToken(loginData:any){
    console.log("lll");
    console.log(loginData);
   return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // login user set token in local storage
  public loginUser(token:any){
    localStorage.setItem("token", token);
    // this.loginStausSubject.next(true);
    return true;
  }

  //islogin : user is logged in or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null){
      return false;
    }else{
      return true;
    }
  }

  // logout : remove token from localstorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get Token
  public getToken(){
    return localStorage.getItem('token');
  }

  //set userDetails
  public setuser(user:any){
    localStorage.setItem("user", JSON.stringify(user));
  }

  //get userDetails
  public getUser(){
    let userStr=localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  // get user role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
