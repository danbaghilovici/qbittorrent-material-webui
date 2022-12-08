import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, Subscription, switchMap, tap} from "rxjs";
import {DashboardService} from "./dashboard.service";
import {NGXLogger} from "ngx-logger";
import {ServerState} from "../qbit/models/server-state.model";
import {MediaMatcher} from "@angular/cdk/layout";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit,OnDestroy {


  public mobileQuery: MediaQueryList;
  private poolingSub:Subscription=new Subscription();
  public serverState$:Observable<ServerState>;
  private _mobileQueryListener: () => void;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  // fillerNav = Array.from([]);

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
              private readonly media: MediaMatcher,
              private readonly authService:AuthService,
              private readonly router:Router
             ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  onLogOutClicked(){
    this.authService.logOut()
      .pipe(catchError(err => of(true)))
      .subscribe(
        (data)=>{this.logger.debug("data is ",data)},
        (err)=>{this.logger.error("err is ",err)},()=>{
        this.logger.trace("completed logout")
        this.router.navigate(["/login"]);
      });
  }


  ngOnInit(): void {
    // this.logger.trace("dashboard loaded");
    this.serverState$=this.dashboardService.getServerState();

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }




}
