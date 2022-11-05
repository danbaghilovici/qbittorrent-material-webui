import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, switchMap, take, tap} from "rxjs";
import {QbitService} from "../qbit/services/qbit.service";
import {NGXLogger} from "ngx-logger";
import {TorrentData} from "../qbit/models/torrent-data.model";

@Injectable()
export class TorrentsService {

  private torrentsState$:Observable<Map<string,TorrentData>>;
  private torrents:BehaviorSubject<Map<string,TorrentData>> =
    new BehaviorSubject<Map<string, TorrentData>>(new Map());

  constructor(private readonly qbitService:QbitService,
              private readonly logger:NGXLogger) {

    this.torrentsState$=
      this.qbitService.fetchDataByInterval()
      .pipe(
        // tap((data)=>{this.logger.trace(data.torrents)}),
      switchMap((data)=>{
        return of(data.torrents);
      }),
      take(1)
      //   switchMap((data)=>{
      //   let m:Map<string,TorrentData>=this.torrents.getValue();
      //   for (let k of data.torrents.keys()){
      //     if (m.has(k)){
      //       // update torrent data + history
      //     }else{
      //       // add new key + torrent
      //     }
      //   }
      //   this.torrents.next(m);
      //   return of(m);
      // })
      );

}


  public getTorrentData():Observable<Map<string,TorrentData>>{
    return this.torrentsState$;
  }


}
