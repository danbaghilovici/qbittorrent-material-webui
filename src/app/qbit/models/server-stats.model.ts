import {IServerState, ServerState} from "./server-state.model";
import {ITorrentData, TorrentData} from "./torrent-data.model";

export interface IServerStats {
  categories: object;//?
  full_update: boolean;
  rid: number;
  server_state: IServerState;
  tags: string[]
  torrents: Record<string, ITorrentData>;
  trackers: object;
}

export class ServerStats {

  private readonly _categories: object;
  private readonly _fullUpdate: boolean;
  private readonly _rid: number;
  private readonly _serverState: ServerState;
  private readonly _tags: string[];
  private readonly _torrents:Map<string,TorrentData>;


  constructor(json: IServerStats) {
    this._categories = json.categories;
    this._fullUpdate = json.full_update;
    this._rid = json.rid;
    this._serverState = this.parseServerState(json.server_state);
    this._tags = json.tags;
    this._torrents=this.parseTorrentsObject(json.torrents);
  }


  get torrents(): Map<string, TorrentData> {
    return this._torrents;
  }

  get categories(): object {
    return this._categories;
  }

  get fullUpdate(): boolean {
    return this._fullUpdate;
  }

  get rid(): number {
    return this._rid;
  }

  get serverState(): ServerState {
    return this._serverState;
  }

  get tags(): string[] {
    return this._tags;
  }

  get categoriess(): object {
    return this._categories;
  }

  private parseTorrentsObject(torrents:object): Map<string,TorrentData> {
    console.log(torrents);
    const m=new Map<string,TorrentData>();
    for (const k in torrents){
      // @ts-ignore
      m.set(k,new TorrentData(k,torrents[k],null));
    }
    return m;
  }

  private parseServerState(state:IServerState):ServerState{
    return new ServerState(state);
  }
}
