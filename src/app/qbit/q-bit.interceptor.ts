import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {environment} from "../../environments/environment";
@Injectable({providedIn:"root"})
export class QBitPathInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.body)
    return next.handle(request.clone({url:this.getRelativeUrl(request.url),withCredentials:true,responseType:"text"}));
  }

  private getRelativeUrl(forUri:string):string{
    return !environment.production?`http://localhost:8080/${forUri}`:forUri;

  }
}
