import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CredentialsModel} from "./credentials.model";
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {Observable, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly  COOKIE_NAME:string="SID";

  constructor(private http: HttpClient, private cookieService:CookieService) {
  }

  public logIn(credentials:CredentialsModel): void {
    if (!this.areCredentialsValid(credentials)){
      return ;
    }
    // console.log("v3")
    const url=this.getRelativeUrl("api/v2/auth/login");
      // +this.createCredentialsQuery(credentials);
    const b={username:credentials.username,password:credentials.password};
    this.http.post(url,
      b,
      {
        headers:{
          "Content-type":"application/x-www-form-urlencoded"
          // "content-length":JSON.stringify(b).length+""
        },
        withCredentials:true,
        observe: "response",
        responseType:"text"
    })
      .subscribe(res=>{
        console.log("rasp");
        console.log(res);
        console.log(res.headers.keys())
      },(err)=>{
        console.error("eroare ");
        console.info(err)
      });

  }

  public logOut(){
    const url=this.getRelativeUrl("api/v2/auth/logout");
    // +this.createCredentialsQuery(credentials);
    this.http.post(url,
      {},
      {
        headers:{
          "Content-type":"application/x-www-form-urlencoded"
        },
        withCredentials:true,
        observe: "response",
        responseType:"text"
      })
      .subscribe(res=>{
        console.log("rasp");
        console.log(res);
        console.log(res.headers.keys())
      },(err)=>{
        console.error("eroare ");
        console.info(err)
      });
  }

  public isAuthenticated(): Observable<boolean> {
    // console.log(this.cookieService.get(this.COOKIE_NAME));
    // console.log(this.cookieService.getAll())
    // console.log(localStorage.getItem("SID"))
    return this.getVersion().pipe(switchMap((version)=>{
      return of(version.length!==0)
    }));
  }

  public getVersion():Observable<string>{
    return this.http.get(this.getRelativeUrl("api/v2/app/version"),
      {
        headers:{
          "Content-type":"application/x-www-form-urlencoded"
        },
        withCredentials:true,
        observe: "response",
        responseType:"text"
      }).pipe(switchMap((response)=>{
        var result="";
        if (response.ok && !!response.body){
          result=response.body?.replace("v","");
        }
        return of(result);
    }));
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
