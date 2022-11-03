// https://indepth.dev/posts/1455/how-to-split-http-interceptors-between-multiple-backends
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export class InterceptorHandler implements HttpHandler {
  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    // console.log("handle interceptor there")
    return this.interceptor.intercept(req, this.next);
  }
}
