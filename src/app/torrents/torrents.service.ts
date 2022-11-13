import {Injectable} from '@angular/core';
import {BehaviorSubject, concatMap, Observable, of, tap} from "rxjs";
import {QbitService} from "../qbit/services/qbit.service";
import {NGXLogger} from "ngx-logger";
import {ITorrentData, TorrentData} from "../qbit/models/torrent-data.model";

@Injectable()
export class TorrentsService {

  private torrentsState$: Observable<Map<string, TorrentData>>;
  private torrentsOverTime: BehaviorSubject<Map<string, TorrentData>> =
    new BehaviorSubject<Map<string, TorrentData>>(new Map());

  constructor(private readonly qbitService: QbitService,
              private readonly logger: NGXLogger) {

    // this.torrentsState$ =
    //   this.qbitService.fetchDataByInterval()
    //     .pipe(
    //       tap((data) => this.parseTorrentsObject(data.torrents)),
    //       concatMap((data) => this.torrentsOverTime.asObservable())
    //     );
  }

  public getTorrentsData(): Observable<Map<string, TorrentData>> {
    return this.qbitService.fetchDataByInterval()
      .pipe(
        tap((data) => this.parseTorrentsObject(data.torrents)),
        concatMap((data) => this.torrentsOverTime.asObservable())
      );
  }

  private parseTorrentsObject(torrents: Record<string, ITorrentData>): void {
    const tempTorrents = new Map<string, TorrentData>();
    const storedTorrents = this.torrentsOverTime.getValue();
    const iter = Object.entries(torrents).entries();
    while (true) {
      const res = iter.next();
      if (res.done) break;
      const key:string = res.value[1][0]
      const value:ITorrentData = res.value[1][1]
      if (storedTorrents.has(key)) {
        const x = storedTorrents.get(key).updateFrom(key, torrents[key]);
        tempTorrents.set(key, x);
        this.logger.trace("updated torrent ",key,value)
      } else {
        tempTorrents.set(key, new TorrentData(key, value));
        this.logger.trace("created torrent ",key,value)
      }
    }
    this.torrentsOverTime.next(tempTorrents);
    this.logger.trace("new torrent data",this.torrentsOverTime.getValue());
  }


}
