import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username:'',
    password:''
  }

  constructor(private snackBar:MatSnackBar, private login:LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  loginForm(){
    console.log("login clicked");
    if(this.loginData.username.trim()=='' || this.loginData.username==null){
      this.snackBar.open("Username is required !! ", '', {duration:3000})
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snackBar.open("Password is required !! ", '', {duration:3000})
      return;
    }
    console.log(this.loginData);
    // request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);
        // login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setuser(user);
            console.log(user);
            // redirect ADMIN - admin dashboard
            // redirect NORMAL - admin dashboard
           if(this.login.getUserRole() == 'ADMIN'){
            // admin dashboard
           // window.location.href='/admin';
            this.router.navigate(['admin']);
            this.login.loginStausSubject.next(true);
           }else if(this.login.getUserRole() == 'NORMAL'){
            // normal user dashboard
           // window.location.href='/user-dashboard';
            this.router.navigate(['user-dashboard/0']);
            this.login.loginStausSubject.next(true);
           }else{
             this.login.logout();
           }
          }
        );
      },
      (error)=>{
        console.log("error");
        console.log(error);
      }
    );

  }
}
