import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription, switchMap, tap} from "rxjs";
import {DashboardService} from "./dashboard.service";
import {NGXLogger} from "ngx-logger";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {QbitService} from "../qbit/services/qbit.service";
import {IServerState, ServerState} from "../qbit/models/server-stats.model";
import {HistoryArray} from "../qbit/models/history-array.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
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
