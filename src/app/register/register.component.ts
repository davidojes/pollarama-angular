import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    name: '',
    email: '',
    password: ''
  });
  
  invalidRegistration = false;
  errorMessage = "";

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private userService: UserService) { }

  async ngOnInit() {
    if (await this.userService.getUserLoggedIn() == true) this.router.navigate(['home']);
  }

  

  async register() {
    const credentials = JSON.stringify(this.registerForm.value);
    var response = await this.userService.register(credentials);
    console.log(response.code + " " + response.messageObject.message); 
    if (response.code == 0) this.router.navigate(["home"]).then(() => { window.location.reload() });
    this.errorMessage = response.messageObject.message;


    // this.http.post("https://localhost:44399/api/auth/register", credentials, {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json"
    //   })
    // })
    // .subscribe(
    // //   response => {
    // //   const token = (<any>response).token;
    // //   localStorage.setItem("authToken", token);
    // //   this.invalidRegistration = false;
    // //   console.log(localStorage.getItem("authToken"));
    // //   // this.router.navigate(["/"]);
    // // },
    // response => {},
    // err => {
    //   this.invalidRegistration = true;
    //   this.errorMessage = err.error.message;
    //   // console.log(err.error.message);
    // });
  }
}
