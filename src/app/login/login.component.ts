import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    console.log("login loaded");
  }

  public onLoginButtonClicked(){
    this.authService.logIn({username:"admin",password:"adminadmin"})
  }

  public onLogoutButtonClicked(){
    this.authService.logOut();
  }

  public testGetVersion(){
    this.authService.getVersion()
  }

}
