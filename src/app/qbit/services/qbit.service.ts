import { Injectable } from '@angular/core';
import {Observable, of, retry, share, Subject, switchMap, takeUntil, tap, throwError, timer} from "rxjs";
import {FeatureHttpClient} from "./featureHttpClient";
import {NGXLogger} from "ngx-logger";
import {HttpResponse} from "@angular/common/http";
import {IServerStats, ServerStats} from "../models/server-stats.model";

@Injectable()
export class QbitService {

  private readonly QBIT_VERSION_ENDPOINT:string="api/v2/app/version";
  private readonly QBIT_MAIN_DATA_ENDPOINT:string="api/v2/sync/maindata";
  private stopPolling = new Subject();

  constructor(private readonly http:FeatureHttpClient,
              private readonly logger:NGXLogger) { }

  ngOnDestroy() {
    this.stopPollingData();
  }

  public fetchVersion():Observable<string>{
    return this.http.get<string>(this.QBIT_VERSION_ENDPOINT,{observe:"response"})
      .pipe(switchMap((response)=>{
        if (this.isResponseValid(response) && response.body?.startsWith("v")){
          return of(response.body?.replace("v",""));
        }
        return throwError(new Error("Request failed"));
      }));
  }

  public fetchTorrentsMainData():Observable<ServerStats>{
    return this.http.get<string>(this.QBIT_MAIN_DATA_ENDPOINT,{observe:"response"})
      .pipe(switchMap((response=>{
        if (this.isResponseValid(response)){
          // console.time();
          const json:IServerStats=JSON.parse(<string>response?.body);
          // const x:ServerStats=new ServerStats(json)
          // console.timeEnd();
          return of(json);
        }
        return throwError(new Error("Request failed"));
      })),
        tap(data=>{this.logger.trace(data)}),
        switchMap((data:IServerStats)=>{
        return of(new ServerStats(data))
      }));
  }

  public fetchDataByInterval(interval:number=1000):Observable<ServerStats>{
    return timer(0,interval)
      .pipe(switchMap(
          ()=>this.fetchTorrentsMainData()),
        // tap(value => this.logger.trace("data from dashboard service",value)),
        retry(2),
        share(),
        takeUntil(this.stopPolling)
      )
  }

  public stopPollingData(){
    this.stopPolling.next(true);
  }




  private isResponseValid(response:HttpResponse<any>):boolean{
    // this.logger.trace("response is",response);
    return response.ok && response.status/100===2;
  }


}
