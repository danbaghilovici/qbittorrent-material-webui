import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, of, switchMap} from "rxjs";
import {DashboardService} from "./dashboard.service";
import {TorrentModel} from "../models/torrent.model";
import {NGXLogger} from "ngx-logger";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public torrents:BehaviorSubject<TorrentModel[]>=new BehaviorSubject<TorrentModel[]>([])


  constructor(private dashboardService:DashboardService,
              private logger:NGXLogger) { }

  ngOnInit(): void {
    console.log("dashboard loaded")
    this.dashboardService.pooling$
      .pipe(switchMap((data)=>{
        return this.setAvailableTorrents(data);
      }),
      ).subscribe(()=>{
        this.logger.trace("done parsing data");
    })
  }

  private setAvailableTorrents(data:object):Observable<void>{
    this.logger.trace("received",data);
    // this.logger.trace(typeof );
    const arr:TorrentModel[]=[];
    Object.entries(Object.values(data)[5]).forEach((k,v)=>{
      this.logger.trace("values ",k,v);

      // @ts-ignore
      arr.push(new TorrentModel(k[0],k[1]));
    })
    this.torrents.next(arr);
    return of();
  }


}
