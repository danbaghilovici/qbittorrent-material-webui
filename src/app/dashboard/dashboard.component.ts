import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription, switchMap, tap} from "rxjs";
import {DashboardService} from "./dashboard.service";
import {NGXLogger} from "ngx-logger";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HistoryArray} from "../qbit/models/history-array.model";
import {ServerState} from "../qbit/models/server-state.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit,OnDestroy {


  private poolingSub:Subscription=new Subscription();
  public serverState$:Observable<ServerState>;
  public serverHistory:Observable<HistoryArray>;



  constructor(private readonly dashboardService:DashboardService,
              private readonly logger:NGXLogger,
             ) {

  }


  ngOnInit(): void {
    this.logger.trace("dashboard loaded");
    this.serverState$=this.dashboardService.getServerState();
    this.serverHistory=this.dashboardService.getServerStateHistory();

  }

  ngOnDestroy(): void {
  }




}
