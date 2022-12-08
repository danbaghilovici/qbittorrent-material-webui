import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {NGXLogger} from "ngx-logger";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, catchError, of} from "rxjs";
import {Router} from "@angular/router";
// TODO handle error cases
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loading$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  public loginForm=new FormGroup({
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(5)])
  });


  constructor(private authService:AuthService,
              private readonly logger:NGXLogger,
              private readonly router:Router
  ) { }

  ngOnInit(): void {
    this.logger.debug("inited");
  }

  public onLoginButtonClicked(){
    // this.authService.logIn({username:"admin",password:"adminadmin"})

  }

  public onLogoutButtonClicked(){
    this.authService.logOut();
  }

  public onInfoClicked(){
    this.authService.test1();
  }

  public onFormSubmit(){
    if (this.loginForm.invalid){
      this.logger.error("Form is not valid")
      return ;
    }
    this.loading$.next(true);
    this.logger.trace("onFormSubmit enter")
    this.logger.debug("credentials ",this.loginForm.get('username').getRawValue())
    this.logger.debug("credentials ",this.loginForm.get('password').getRawValue())
    this.authService.logIn({
      username:this.loginForm.get('username').getRawValue(),
      password:this.loginForm.get('password').getRawValue()
    }).pipe(
      // catchError(err => {
      //   this.logger.error("algo ha falladao", err);
      //   return of('')
      // })
    ).subscribe(data=>{
      this.logger.debug("data is ",data);
      if (data){
        this.router.navigate(["/dashboard"])
      }

    },error => {
      this.logger.error("error was",error);
      this.handleRequestTermination();


    },()=>{
      this.logger.trace("peticion acabada");
      this.handleRequestTermination()
    });

  }

  private handleRequestTermination(){
    this.loading$.next(false);
    this.loginForm.reset()
  }

  public isFormFieldInvalid(controlName:string){
    return this.loginForm.get(controlName).invalid
      && this.loginForm.get(controlName).errors
      && (this.loginForm.get(controlName).dirty || this.loginForm.get(controlName).touched)
  }

  public hasFormFieldError(controlName:string,errorName:string){
    return this.loginForm.get(controlName).hasError(errorName)
  }

  public showError(controlName:string){
    return JSON.stringify(this.loginForm.get(controlName).errors);
  }

  onLogOutClicked(){
    this.authService.logOut()
  }

}
