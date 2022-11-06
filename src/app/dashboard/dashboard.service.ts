import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";
import {BehaviorSubject, Observable, of, switchMap, take, tap} from "rxjs";
import {QbitService} from "../qbit/services/qbit.service";
import {HistoryArray} from "../qbit/models/history-array.model";
import {ServerState} from "../qbit/models/server-state.model";

@Injectable()
export class DashboardService {

  private serverState$:Observable<ServerState>;
  private serverStateHistory:BehaviorSubject<HistoryArray>=new BehaviorSubject<HistoryArray>(new HistoryArray());


  constructor(private readonly http:HttpClient,
              private readonly logger:NGXLogger,
              private readonly qbit:QbitService) {
    this.logger.trace(`${DashboardService.name } started`);
    this.serverState$=this.qbit.fetchDataByInterval()
      .pipe(switchMap((value)=>{
          return of(value.serverState);
        }),
        tap(value => {
          const x=this.serverStateHistory.getValue();
          x.push(value);
          this.serverStateHistory.next(x);
        }),
        take(1)
      );
  }

  public getServerState():Observable<ServerState>{
    return this.serverState$;
  }

  public getServerStateHistory():Observable<HistoryArray>{
    return this.serverStateHistory.asObservable();
  }






}
