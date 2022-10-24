import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, retry, share, Subject, switchMap, takeUntil, tap, timer} from "rxjs";
import {environment} from "../../environments/environment";
import {NGXLogger} from "ngx-logger";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private interval:BehaviorSubject<number>=new BehaviorSubject<number>(10000);
  private stopPolling = new Subject();
  private _pooling$:Observable<object>=new Observable();

  constructor(private readonly http:HttpClient,private readonly logger:NGXLogger ) {
    this._pooling$=this.get();
    this.logger.trace(`${DashboardService.name } started`);
  }

  ngOnDestroy() {
    this.stopPolling.next(null);
    this._pooling$=new Observable<JSON>();
  }

  public getVersion():Observable<string>{
    return this.http.get(this.getRelativeUrl("api/v2/app/version"),{responseType:"text"});
  }


  get pooling$(): Observable<object> {
    return this._pooling$;
  }

  public setInterval(newInterval:number):void{
    this.interval.next(newInterval);
  }

  private get():Observable<object>{
    return timer(0,this.interval.getValue())
      .pipe(switchMap(
        ()=>this.fetchTorrentsMainData()),
        tap(value => this.logger.trace("data from dashboard service",value)),
        retry(2),
        share(),
        takeUntil(this.stopPolling)
        )
  }

  private fetchTorrentsMainData():Observable<JSON>{
    return this.http.get<JSON>(this.getRelativeUrl("api/v2/sync/maindata"),{responseType:"json",withCredentials:true});
  }

  private getRelativeUrl(forUri:string):string{
    return !environment.production?("http://localhost:8080/"+forUri):forUri;

  }





}
