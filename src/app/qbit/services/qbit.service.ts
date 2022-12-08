import { Injectable } from '@angular/core';
import {
  BehaviorSubject, catchError,
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
import {QBitHttpClient} from "./q-bit-http-client.service";
import {NGXLogger} from "ngx-logger";
import {HttpResponse} from "@angular/common/http";
import {IPreferences, IServerStats, ServerStats} from "../models/server-stats.model";
import {CredentialsModel} from "../../auth/credentials.model";
import {QbitModule} from "../qbit.module";

@Injectable({providedIn:"root"})
export class QbitService {

  // todo
  //  fix RID querying for better perf

  private static readonly QBIT_LOGIN_ENDPOINT:string="api/v2/auth/login";
  private static readonly QBIT_LOGOUT_ENDPOINT:string="api/v2/auth/logout";
  private static readonly QBIT_VERSION_ENDPOINT:string="api/v2/app/version";
  private static readonly QBIT_MAIN_DATA_ENDPOINT:string="api/v2/sync/maindata";
  private static readonly QBIT_PREFERENCES_ENDPOINT:string="api/v2/app/preferences";
  private static readonly QBIT_ADD_ENDPOINT:string="api/v2/torrents/add"; //post


  private static RID:number=null;

  private preferences:BehaviorSubject<IPreferences> = new BehaviorSubject<IPreferences>(null)

  private stopPolling = new Subject();

  constructor(private readonly http:QBitHttpClient,
              private readonly logger:NGXLogger) {
    this.logger.trace("starting")

    // this.fetchPreferences().subscribe(data=>{
    //   this.logger.debug("constru",data);
    //   this.preferences.next(data);
    // });

    // combineLatest([
    //   this.fetchPreferences(),
    //   this.fetchVersion(),
    // ]).


  }

  ngOnDestroy() {
    this.logger.trace("on destroy")
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
      .pipe(switchMap(()=>this.fetchServerData()),
        // tap(value => this.logger.trace(value)),
        retry(3),
        share(),
        takeUntil(this.stopPolling),
        // take(5)
      )
  }

  public stopPollingData(){
    this.stopPolling.next(true);
  }

  public fetchLoginOp(cred:CredentialsModel):Observable<boolean>{
    const queryString = "username=" + cred.username + "&password=" + cred.password;

    return this.http.post<string>(QbitService.QBIT_LOGIN_ENDPOINT,queryString,{
      headers:{
        "Content-type":"application/x-www-form-urlencoded; charset=UTF-8",
        // "enctype":"multipart/form-data",
        "Accept":"*/*"
      },observe:"response"})
      .pipe(switchMap((response)=>{
          this.logger.debug(response);
        if (this.isResponseValid(response) && response.body!=="Fails."){
          return of(true);
        }

        return throwError(new Error("Request failed"));
      }),
        catchError(err => {return throwError(new Error(err))})
      );
  }

  public fetchLogoutOp():Observable<boolean>{
    return this.http.post<string>(QbitService.QBIT_LOGOUT_ENDPOINT,{},{
      headers:{
        "Content-type":"application/x-www-form-urlencoded; charset=UTF-8",
        // "enctype":"multipart/form-data",
        // "Accept":"*/*",
      },observe:"response"})
      .pipe(switchMap((response)=>{
        if (this.isResponseValid(response) && response.body!=="Fails."){
          return of(true);
        }
        this.logger.debug(response)
        return throwError(new Error("Request failed"));
      }));
  }




  private isResponseValid(response:HttpResponse<any>):boolean{
    // this.logger.trace("response is",response);
    return response.ok && response.status/100===2;
  }


}
