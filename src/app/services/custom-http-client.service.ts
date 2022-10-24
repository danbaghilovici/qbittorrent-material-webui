import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient, HttpHandler} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomHttpClientService extends HttpClient{

  constructor(
    backend: HttpBackend,
    @Inject(HTTP_INTERCEPTORS) interceptors: HttpInterceptor[],
  ) {
    super(new InterceptingHandler(
      backend,
      [interceptors, featureInterceptors].flat()
    ));
  }
}
