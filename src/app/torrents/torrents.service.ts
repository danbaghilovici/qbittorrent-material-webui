import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, switchMap, take, tap} from "rxjs";
import {QbitService} from "../qbit/services/qbit.service";
import {NGXLogger} from "ngx-logger";
import {TorrentData} from "../qbit/models/torrent-data.model";

@Injectable()
export class TorrentsService {

  private torrentsState$: Observable<Map<string, TorrentData>>;
  private torrentsOverTime: BehaviorSubject<Map<string, TorrentData>> =
    new BehaviorSubject<Map<string, TorrentData>>(new Map());

  constructor(private readonly qbitService: QbitService,
              private readonly logger: NGXLogger) {

    this.torrentsState$ =
      this.qbitService.fetchTorrentsMainData()
        .pipe(
          switchMap((data)=>{return of(data.torrents)}),
          // tap((data)=>{this.logger.trace(data.torrentsOverTime)}),
          // tap((torrents) => this.updateTorrentsOverTime(torrents)),
          take(1)
        );

  }

  private updateTorrentsOverTime(torrents:Map<string,TorrentData>):void{
    {
      if (this.torrentsOverTime.getValue().size===0){
        this.torrentsOverTime.next(torrents);
      }else{
        let m: Map<string, TorrentData> = this.torrentsOverTime.getValue();
        for (let k of torrents.keys()) {
          if (m.has(k)) {
            const t=new TorrentData(k,null,m.get(k));
            m.set(k,t)
            // console.log("old was "+JSON.stringify(m.get(k))+" new is "+JSON.stringify(torrents.get(k))+" merged is "+JSON.stringify(t));
          } else {
            if(m.size>torrents.size){
              m.delete(k);
            }
            if(m.size<torrents.size){
              m.set(k,new TorrentData(k,null,torrents.get(k)));
            }
          }
        }
        this.torrentsOverTime.next(m);
        this.logger.trace("new torrents history",this.torrentsOverTime.getValue().get("2374ac16a1fdf3d9bd3e80c4712974ae6b9d7069"));
      }
    }
  }


  public getTorrentData(): Observable<Map<string, TorrentData>> {
    return this.torrentsState$;
  }


}
