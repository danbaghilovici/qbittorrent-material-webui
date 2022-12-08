import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FEATURE_HTTP_INTERCEPTORS, QBitHttpClient} from "./services/q-bit-http-client.service";
import {QBitPathInterceptor} from "./q-bit.interceptor";
import {QbitService} from "./services/qbit.service";
import {HttpClientModule} from "@angular/common/http";
import {Utils} from "./models/utils";


@NgModule({
  providers:[
    QBitPathInterceptor,
    {
      provide: FEATURE_HTTP_INTERCEPTORS,
      useClass: QBitPathInterceptor,
      multi: true
    },
    QBitHttpClient,
    QbitService
  ],
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[]
})
export class QbitModule { }
