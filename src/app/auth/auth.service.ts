import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CredentialsModel} from "./credentials.model";
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {Observable, of, switchMap} from "rxjs";
import {QbitService} from "../qbit/services/qbit.service";
import {QbitModule} from "../qbit/qbit.module";

@Injectable()
export class AuthService {


  constructor(
    private readonly qbitService:QbitService
  ) {
  }

  public logIn(credentials:CredentialsModel): Observable<boolean> {
    return this.qbitService.fetchLoginOp(credentials);
  }

  public logOut():Observable<boolean>{
    return this.qbitService.fetchLogoutOp();
  }

  public isAuthenticated(): Observable<boolean> {

    return this.qbitService.fetchVersion()
      .pipe(switchMap((x)=>of(x.length>0)));

  }

  public test1(){
    this.qbitService.fetchVersion().subscribe(data=>{
      console.log(data);
    },error=>{
      console.error(error);
    });
  }



  private areCredentialsValid(credentials:CredentialsModel):boolean{
    return !!credentials.username && !!credentials.password;
  }

  private createCredentialsQuery(credentials:CredentialsModel):string{
    return "?username="+encodeURI(credentials.username)+"&password="+encodeURI(credentials.password);
  }

  private getRelativeUrl(forUri:string):string{
    return !environment.production?("http://localhost:8080/"+forUri):forUri;

  }


}
