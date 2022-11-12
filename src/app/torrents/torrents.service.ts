import {Injectable} from '@angular/core';
import {BehaviorSubject, concatMap, Observable, of, tap} from "rxjs";
import {QbitService} from "../qbit/services/qbit.service";
import {NGXLogger} from "ngx-logger";
import {ITorrentData, TorrentData} from "../qbit/models/torrent-data.model";
import {IServerStats} from "../qbit/models/server-stats.model";

@Injectable()
export class TorrentsService {

  private torrentsState$: Observable<Map<string, TorrentData>>;
  private torrentsOverTime: BehaviorSubject<Map<string, TorrentData>> =
    new BehaviorSubject<Map<string, TorrentData>>(new Map());

  constructor(private readonly qbitService: QbitService,
              private readonly logger: NGXLogger) {

    this.torrentsState$ =
      this.qbitService.fetchDataByInterval()
        .pipe(
          tap((data) => {
            this.parseTorrentsObject(data.torrents)
          }),
          concatMap((data) => {
            return this.torrentsOverTime.asObservable();
          })
        );
    this.torrentsState$.subscribe((data) => {
      console.log("t " + JSON.stringify(this.torrentsOverTime.getValue()))
      this.logger.trace("ceva", this.torrentsOverTime.getValue());
    });

  }

  // private updateTorrentsOverTime(torrents:Map<string,TorrentData>):void{
  //   {
  //     if (this.torrentsOverTime.getValue().size===0){
  //       this.torrentsOverTime.next(torrents);
  //     }else{
  //       let m: Map<string, TorrentData> = this.torrentsOverTime.getValue();
  //       for (let k of torrents.keys()) {
  //         if (m.has(k)) {
  //           const t=new TorrentData(k,null,m.get(k));
  //           m.set(k,t)
  //           // console.log("old was "+JSON.stringify(m.get(k))+" new is "+JSON.stringify(torrents.get(k))+" merged is "+JSON.stringify(t));
  //         } else {
  //           if(m.size>torrents.size){
  //             m.delete(k);
  //           }
  //           if(m.size<torrents.size){
  //             m.set(k,new TorrentData(k,null,torrents.get(k)));
  //           }
  //         }
  //       }
  //       this.torrentsOverTime.next(m);
  //       this.logger.trace("new torrents history",this.torrentsOverTime.getValue().get("2374ac16a1fdf3d9bd3e80c4712974ae6b9d7069"));
  //     }
  //   }
  // }


  public getTorrentData(): Observable<Map<string, TorrentData>> {
    return this.torrentsState$;
  }

  private parseTorrentsObject(torrents: Record<string, ITorrentData>): void {
    console.log("overtime", this.torrentsOverTime.getValue());
    const tempTorrents = new Map<string, TorrentData>();
    const storedTorrents = this.torrentsOverTime.getValue();
    const iter = Object.entries(torrents).entries();
    while (true) {
      const res = iter.next();
      if (res.done) break;
      console.log(res);
      const key = res.value[1][0]
      const value = res.value[1][1]
      console.log(key, value);
      if (storedTorrents.has(key)) {
        console.log("updated");
        const x = storedTorrents.get(key).updateFrom(key, torrents[key]);
        tempTorrents.set(key, x);
      } else {
        console.log("created");
        tempTorrents.set(key, new TorrentData(key, value));
      }
    }
    // for (let i=0;entries.length;i++){
    //   const key=entries.values();
    //   const val=torrents[key];
    //   console.log(key,val);
    //   if (storedTorrents.has(key)){
    //     console.log("updated");
    //     // storedTorrents.get(k).updateFrom(k,torrents[k]);
    //     // tempTorrents.set(k,new TorrentData(k,null,storedTorrents.get(k)));
    //   }else{
    //     console.log("created");
    //     tempTorrents.set(key,new TorrentData(key,val));
    //   }
    //   console.log("done iter");
    // }
    // // console.log("tempTorr "+tempTorrents.size);
    this.torrentsOverTime.next(tempTorrents);
    // console.log(this.torrentsOverTime.getValue())
  }


}
