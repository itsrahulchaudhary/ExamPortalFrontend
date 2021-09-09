import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService :UserService, private snackBar:MatSnackBar) { }

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
     // alert("username is required !!!");
      this.snackBar.open('username is required !!!', '', {duration:3000})
      return;
    }

    // addUser : userservice
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
      //success
      console.log(data);
      //alert('success');
      Swal.fire('Successfully done !!','User id is '+data.userId,'success');
    },
    (error)=>{
      //error
      console.log(error);
    //  alert('something went wrong');
      this.snackBar.open('something went wrong', '', {duration:3000})
    }
    )
  }

}
