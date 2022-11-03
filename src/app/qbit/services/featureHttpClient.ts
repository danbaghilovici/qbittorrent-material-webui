import {Inject, Injectable, InjectionToken} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpInterceptor} from "@angular/common/http";
import {InterceptingHandler} from "../models/interceptingHandler";

export const FEATURE_HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>(
  'An abstraction on feature HttpInterceptor[]'
);

@Injectable()
export class FeatureHttpClient extends HttpClient {
  constructor(
    backend: HttpBackend,
    @Inject(HTTP_INTERCEPTORS) interceptors: HttpInterceptor[],
    @Inject(FEATURE_HTTP_INTERCEPTORS) featureInterceptors: HttpInterceptor[],
  ) {
    super(new InterceptingHandler(
      backend,
      [interceptors, featureInterceptors].flat()
    ));
  }
}
