import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription, switchMap, tap} from "rxjs";
import {DashboardService} from "./dashboard.service";
import {NGXLogger} from "ngx-logger";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HistoryArray} from "../qbit/models/history-array.model";
import {ServerState} from "../qbit/models/server-state.model";
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit,OnDestroy {

  public mobileQuery: MediaQueryList;
  private poolingSub:Subscription=new Subscription();
  public serverState$:Observable<ServerState>;
  public serverHistory:Observable<HistoryArray>;
  private _mobileQueryListener: () => void;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    {length: 50},
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );



  constructor(private readonly dashboardService:DashboardService,
              private readonly logger:NGXLogger,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly media: MediaMatcher
             ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }


  ngOnInit(): void {
    // this.logger.trace("dashboard loaded");
    this.serverState$=this.dashboardService.getServerState();
    this.serverHistory=this.dashboardService.getServerStateHistory();

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }




}
