import {Utils} from "./utils";

export interface IServerState {
  alltime_dl: number;
  alltime_ul: number;
  average_time_queue: number;
  connection_status: "connected";
  dht_nodes: number;
  dl_info_data: number;
  dl_info_speed: number;
  dl_rate_limit: number;
  free_space_on_disk: number;
  global_ratio: string;// string to number
  queued_io_jobs: number;
  queueing: boolean;
  read_cache_hits: string; // string to number
  read_cache_overload: string; // string to number,
  refresh_interval: number;
  total_buffers_size: number;
  total_peer_connections: number;
  total_queued_size: number;
  total_wasted_session: number;
  up_info_data: number;
  up_info_speed: number;
  up_rate_limit: number;
  use_alt_speed_limits: boolean;
  write_cache_overload: string; // string to number
}

export class ServerState {

  private readonly _allTimeDl: number;
  private readonly _allTimeUp: number;
  private readonly _averageTimeQueue: number;
  private readonly _connectionStatus: string;
  private readonly _dhtNodes: number;
  private readonly _dlInfoData: number;
  private readonly _dlInfoSpeed: number;
  private readonly _dlInfoLimit!: number;
  private readonly _freeSpaceOnDisk: number;
  private readonly _globalRatio: number;
  private readonly _queuedIOJobs: number;
  private readonly _queueing: boolean;
  private readonly _readCacheHits: number;
  private readonly _readCacheOverload: number;
  private readonly _refreshInterval: number;
  private readonly _totalBuffersSize: number;
  private readonly _totalPeerConnections: number;
  private readonly _totalQueuedSize: number;
  private readonly _totalWastedSession: number;
  private readonly _upInfoData: number;
  private readonly _upInfoSpeed: number;
  private readonly _upInfoLimit: number;
  private readonly _useAltSpeedLimits: boolean;
  private readonly _writeCacheOverload: number;

  constructor(json: IServerState) {
    this._allTimeDl = json.alltime_dl;
    this._allTimeUp = json.alltime_ul;
    this._averageTimeQueue = json.average_time_queue;
    this._connectionStatus = json.connection_status;
    this._dhtNodes = json.dht_nodes;
    this._dlInfoData = json.dl_info_data;
    this._dlInfoSpeed = json.dl_info_speed;
    this._dlInfoLimit = json.dl_rate_limit;
    this._freeSpaceOnDisk = json.free_space_on_disk;
    this._globalRatio = +json.global_ratio;
    this._queuedIOJobs = json.queued_io_jobs;
    this._queueing = json.queueing;
    this._readCacheHits = +json.read_cache_hits;
    this._readCacheOverload = +json.read_cache_overload;
    this._refreshInterval = json.refresh_interval;
    this._totalBuffersSize = json.total_buffers_size;
    this._totalPeerConnections = json.total_peer_connections;
    this._totalQueuedSize = json.total_queued_size;
    this._totalWastedSession = json.total_wasted_session;
    this._upInfoData = json.up_info_data;
    this._upInfoSpeed = json.up_info_speed;
    this._upInfoLimit = json.up_rate_limit;
    this._useAltSpeedLimits = json.use_alt_speed_limits;
    this._writeCacheOverload = +json.write_cache_overload;
  }


  get allTimeDl(): number {
    return this._allTimeDl;
  }

  get allTimeUp(): number {
    return this._allTimeUp;
  }

  get averageTimeQueue(): number {
    return this._averageTimeQueue;
  }

  get connectionStatus(): string {
    return this._connectionStatus;
  }

  get dhtNodes(): number {
    return this._dhtNodes;
  }

  get dlInfoData(): number {
    return this._dlInfoData;
  }

  get dlInfoSpeed(): number {
    return this._dlInfoSpeed;
  }

  public getFormattedDlInfoSpeed():string{
    return Utils.bytesToString(this._dlInfoSpeed);
  }

  get dlInfoLimit(): number {
    return this._dlInfoLimit;
  }

  get freeSpaceOnDisk(): number {
    return this._freeSpaceOnDisk;
  }

  public getFormattedFreeSpaceOnDisk():string{
    return Utils.bytesToString(this._freeSpaceOnDisk);
  }

  get globalRatio(): number {
    return this._globalRatio;
  }

  get queuedIOJobs(): number {
    return this._queuedIOJobs;
  }

  get queueing(): boolean {
    return this._queueing;
  }

  get readCacheHits(): number {
    return this._readCacheHits;
  }

  get readCacheOverload(): number {
    return this._readCacheOverload;
  }

  get refreshInterval(): number {
    return this._refreshInterval;
  }

  get totalBuffersSize(): number {
    return this._totalBuffersSize;
  }

  get totalPeerConnections(): number {
    return this._totalPeerConnections;
  }

  get totalQueuedSize(): number {
    return this._totalQueuedSize;
  }

  get totalWastedSession(): number {
    return this._totalWastedSession;
  }

  get upInfoData(): number {
    return this._upInfoData;
  }

  get upInfoSpeed(): number {
    return this._upInfoSpeed;
  }

  public getUpInfoSpeed(formated:boolean=false):number|string{
    return formated?Utils.bytesToString(this._upInfoSpeed):this._upInfoSpeed;
  }

  get upInfoLimit(): number {
    return this._upInfoLimit;
  }

  get useAltSpeedLimits(): boolean {
    return this._useAltSpeedLimits;
  }

  get writeCacheOverload(): number {
    return this._writeCacheOverload;
  }

  public toString(){
    return this._dlInfoSpeed.valueOf()+"";
  }
}

export interface ITorrentData {
  added_on: number;
  amount_left: number;
  auto_tmm: boolean;
  availability: number;
  category: string;
  completed: number;
  completion_on: number;
  content_path: string;
  dl_limit: number;
  dlspeed: number;
  download_path: string;
  downloaded: number;
  downloaded_session: number;
  eta: number;
  f_l_piece_prio: boolean;
  force_start: boolean;
  infohash_v1: string;
  infohash_v2: string;
  last_activity: number;
  magnet_uri: string;
  max_ratio: number;
  max_seeding_time: number;
  name: string;
  num_complete: number;
  num_incomplete: number;
  num_leechs: number;
  num_seeds: number;
  priority: number;
  progress: number;
  ratio: number;
  ratio_limit: number;
  save_path: string;
  seeding_time: number;
  seeding_time_limit: number;
  seen_complete: number;
  seq_dl: boolean;
  size: number;
  state: "stalledUP";
  super_seeding: boolean;
  tags: string;
  time_active: number;
  total_size: number;
  tracker: string;
  trackers_count: number;
  up_limit: number;
  uploaded: number;
  uploaded_session: number;
  upspeed: number
}

export interface IServerStats {
  categories: object;//?
  full_update: boolean;
  rid: number;
  server_state: IServerState;
  tags: string[]
  torrents: Map<string, ITorrentData>;
  trackers: Map<string, string[]>
}

export class ServerStats {

  private readonly _categories: object;
  private readonly _fullUpdate: boolean;
  private readonly _rid: number;
  private readonly _serverState: IServerState;
  private readonly _tags: string[];


  constructor(json: IServerStats) {
    this._categories = json.categories;
    this._fullUpdate = json.full_update;
    this._rid = json.rid;
    this._serverState = json.server_state;
    this._tags = json.tags;
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

  get serverState(): IServerState {
    return this._serverState;
  }

  get tags(): string[] {
    return this._tags;
  }

  get categoriess(): object {
    return this._categories;
  }
}
