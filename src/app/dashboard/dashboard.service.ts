import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";
import {BehaviorSubject, Observable, of, switchMap, take, tap} from "rxjs";
import {QbitService} from "../qbit/services/qbit.service";
import {ServerState} from "../qbit/models/server-state.model";

@Injectable()
export class DashboardService {

  private serverState$:Observable<ServerState>;


  constructor(private readonly logger:NGXLogger,
              private readonly qbit:QbitService) {
    this.logger.trace(`${DashboardService.name } started`);
    this.serverState$=this.qbit.fetchDataByInterval()
      .pipe(switchMap((value)=>{
          return of(new ServerState(value.server_state));
        }),
      );
  }

  public getServerState():Observable<ServerState>{
    return this.serverState$;
  }








}
