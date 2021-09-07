import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService :UserService) { }

  ngOnInit(): void {
  }

  public user:any ={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:''
  }
  formSubmit(){
    console.log(this.user);
    if(this.user.username=='' || this.user.username==null){
      alert("username is required !!!");
      return;
    }

    // addUser : userservice
    this.userService.addUser(this.user).subscribe(
      (data)=>{
      //success
      console.log(data);
      alert('success');
    },
    (error)=>{
      //error
      console.log(error);
      alert('something went wrong');

    }
    )
  }

}
