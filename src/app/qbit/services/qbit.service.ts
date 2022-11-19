import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  concatMap,
  Observable,
  of,
  retry,
  share,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  throwError,
  timer
} from "rxjs";
import {FeatureHttpClient} from "./featureHttpClient";
import {NGXLogger} from "ngx-logger";
import {HttpResponse} from "@angular/common/http";
import {IPreferences, IServerStats, ServerStats} from "../models/server-stats.model";

@Injectable()
export class QbitService {

  // todo
  //  fix RID querying for better perf

  private static readonly QBIT_VERSION_ENDPOINT:string="api/v2/app/version";
  private static readonly QBIT_MAIN_DATA_ENDPOINT:string="api/v2/sync/maindata";
  private static readonly QBIT_PREFERENCES_ENDPOINT:string="api/v2/app/preferences";
  private static readonly QBIT_ADD_ENDPOINT:string="api/v2/torrents/add"; //post
  private static RID:number=null;

  private preferences:BehaviorSubject<IPreferences> = new BehaviorSubject<IPreferences>(null)

  private stopPolling = new Subject();

  constructor(private readonly http:FeatureHttpClient,
              private readonly logger:NGXLogger) {

    this.fetchPreferences().subscribe(data=>{
      this.logger.debug("constru",data);
      this.preferences.next(data);
    });

    // combineLatest([
    //   this.fetchPreferences(),
    //   this.fetchVersion(),
    // ]).


  }

  ngOnDestroy() {
    this.stopPollingData();
  }

  public fetchVersion():Observable<string>{
    return this.http.get<string>(QbitService.QBIT_VERSION_ENDPOINT,{observe:"response"})
      .pipe(switchMap((response)=>{
        if (this.isResponseValid(response) && response.body?.startsWith("v")){
          return of(response.body?.replace("v",""));
        }
        return throwError(new Error("Request failed"));
      }));
  }

  private fetchPreferences():Observable<IPreferences>{
    return this.http.get<string>(QbitService.QBIT_PREFERENCES_ENDPOINT,{observe:"response"})
      .pipe(
        concatMap((response=>{
          if (this.isResponseValid(response)){
            const json:IPreferences=JSON.parse(<string>response?.body);
            return of(json);
          }
          return throwError(new Error("Request failed"));
        })));
  }

  public fetchServerData():Observable<IServerStats>{
      return this.http.get<string>(QbitService.QBIT_MAIN_DATA_ENDPOINT,{observe:"response",params:QbitService.setRidParam()})
      .pipe(
        concatMap((response=>{
        if (this.isResponseValid(response)){
          const json:IServerStats=JSON.parse(<string>response?.body);
          QbitService.RID=json.rid;
          return of(json);
        }
        return throwError(new Error("Request failed"));
      })));
  }

  private static setRidParam(){
    return {};
  }

  public fetchDataByInterval(interval:number=3333):Observable<IServerStats>{
    return timer(0,interval)
      .pipe(switchMap(
          ()=>this.fetchServerData()),
        tap(value => this.logger.trace(value)),
        retry(0),
        share(),
        takeUntil(this.stopPolling),
        // take(5)
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
