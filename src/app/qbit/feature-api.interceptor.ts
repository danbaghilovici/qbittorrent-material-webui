import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {environment} from "../../environments/environment";
@Injectable()
export class FeatureApiPathInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request.clone({url:this.getRelativeUrl(request.url),withCredentials:true,responseType:"text"}));
  }

  private getRelativeUrl(forUri:string):string{
    return !environment.production?`http://localhost:8080/${forUri}`:forUri;

  }
}
