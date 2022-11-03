import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FEATURE_HTTP_INTERCEPTORS, FeatureHttpClient} from "./services/featureHttpClient";
import {FeatureApiPathInterceptor} from "./feature-api.interceptor";
import {QbitService} from "./services/qbit.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  providers:[
    FeatureApiPathInterceptor,
    {
      provide: FEATURE_HTTP_INTERCEPTORS,
      useClass: FeatureApiPathInterceptor,
      multi: true
    },
    FeatureHttpClient,
    QbitService
  ],
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[HttpClientModule]
})
export class QbitModule { }
