


export interface ITorrentHistory {
  date: number;
  upSpeed: number;
  dlSpeed: number;
}

export class TorrentHistory{
  private _date:Date;
  private _dlSpeed:number;
  private _upSpeed:number;

  constructor(dlSpeed:number,upSpeed:number) {
    this._date=new Date();
    this._dlSpeed=dlSpeed;
    this._upSpeed=upSpeed;
  }

  get date(): Date {
    return this._date;
  }

  get dlSpeed(): number {
    return this._dlSpeed;
  }

  get upSpeed(): number {
    return this._upSpeed;
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


export class TorrentData {
  private  _id: string;
  private  _addedOn: Date;
  private  _amountLeft: number;
  private  _autoTmm: boolean;
  private  _availability: number;
  private  _category: string;
  private  _completed: number;
  private  _completionOn: number;
  private  _contentPath: string;
  private  _dlLimit: number;
  private _dlSpeed: number;
  private  _downloadPath: string;
  private  _downloaded: number;
  private  _downloadedSession: number;
  private  _eta: number;
  private  _f_l_piecePrio: boolean;
  private  _forceStart: boolean;
  private  _infoHashV1: string;
  private  _infoHashV2: string;
  private  _lastActivity: number;
  private  _magnetUri: string;
  private  _maxRatio: number;
  private  _maxSeedingTime: number;
  private  _name: string;
  private  _numComplete: number;
  private  _numIncomplete: number;
  private  _numLeeches: number;
  private  _numSeeds: number;
  private  _priority: number;
  private  _progress: number;
  private  _ratio: number;
  private  _ratioLimit: number;
  private  _savePath: string;
  private  _seedingTime: number;
  private  _seedingTimeLimit: number;
  private  _seenComplete: number;
  private  _seqDl: boolean;
  private  _size: number;
  private  _state: "stalledUP";
  private  _superSeeding: boolean;
  private  _tags: string[];
  private  _timeActive: number;
  private  _totalSize: number;
  private  _tracker: string;
  private  _trackersCount: number;
  private  _upLimit: number;
  private  _uploaded: number;
  private  _uploadedSession: number;
  private  _upSpeed: number

  private readonly _history: TorrentHistory[];

  constructor(id: string, json: ITorrentData) {
    this._id = id;
    // @ts-ignore
    this._addedOn = new Date((json.added_on) * 1000);
    this._amountLeft = json.amount_left;
    this._autoTmm =  json.auto_tmm;
    this._availability =  json.availability;
    this._name =  json.name;
    this._progress =  json.progress;
    this._timeActive =  json.time_active;
    this._tracker =  json.tracker;
    this._infoHashV1 =  json.infohash_v1;
    this._infoHashV2 =  json.infohash_v2;
    this._magnetUri = json.magnet_uri;
    this._upSpeed =  json.upspeed;
    this._dlSpeed =  json.dlspeed;
    this._tags = this.generateTags((json.tags) + "");
    const k: TorrentHistory = new TorrentHistory(this._dlSpeed,this._upSpeed);
    this._history = this.generateNewHistoryArray();

  }

  public updateFrom(id:string,json:ITorrentData): TorrentData{
    console.log("updating data");
    if (id !== this._id){
      throw Error("Missmatch ids");
    }
    this._upSpeed =  json.upspeed;
    this._dlSpeed =  json.dlspeed;
    this.insertIntoHistory(new TorrentHistory(this._dlSpeed,this._upSpeed),null);
    return this;

  }

  private insertIntoHistory(data: TorrentHistory,from:any): void {
    if (this._history.length >= 10) {
      this._history.shift();
    }
    this._history.push(data);
    // this._history.forEach(value => {
    //   console.log(value.dlSpeed);
    // });
    // console.log("last data pushed "+" id "+this._id+" ;;"+JSON.stringify(data)+";; "+JSON.stringify(this._history)+";; "+from);
  }

  private generateNewHistoryArray():TorrentHistory[]{
    const h=[];
    for (let i=0;i<10;i++){
      h.push(new TorrentHistory(0,0));
    }
    return h;
  }

  private generateTags(value: string): string[] {
    if (value.length === 0) {
      return [];
    }
    return value.split(",");
  }

  public equals(obj: TorrentData): boolean {
    return this._id === obj._id;
  }


  get id(): string {
    return this._id;
  }

  get addedOn(): Date {
    // this._addedOn.toLocaleString()
    return this._addedOn;
  }

  get amountLeft(): number {
    return this._amountLeft;
  }

  get autoTmm(): boolean {
    return this._autoTmm;
  }

  get availability(): number {
    return this._availability;
  }

  get category(): string {
    return this._category;
  }

  get completed(): number {
    return this._completed;
  }

  get completionOn(): number {
    return this._completionOn;
  }

  get contentPath(): string {
    return this._contentPath;
  }

  get dlLimit(): number {
    return this._dlLimit;
  }

  get dlSpeed(): number {
    return this._dlSpeed;
  }

  get downloadPath(): string {
    return this._downloadPath;
  }

  get downloaded(): number {
    return this._downloaded;
  }

  get downloadedSession(): number {
    return this._downloadedSession;
  }

  get eta(): number {
    return this._eta;
  }

  get f_l_piecePrio(): boolean {
    return this._f_l_piecePrio;
  }

  get forceStart(): boolean {
    return this._forceStart;
  }

  get infoHashV1(): string {
    return this._infoHashV1.length === 0 ? null : this._infoHashV1;
  }

  get infoHashV2(): string {
    return this._infoHashV2.length === 0 ? null : this._infoHashV2;
  }

  get lastActivity(): number {
    return this._lastActivity;
  }

  get magnetUri(): string {
    return this._magnetUri;
  }

  get maxRatio(): number {
    return this._maxRatio;
  }

  get maxSeedingTime(): number {
    return this._maxSeedingTime;
  }

  get name(): string {
    return this._name;
  }

  get numComplete(): number {
    return this._numComplete;
  }

  get numIncomplete(): number {
    return this._numIncomplete;
  }

  get numLeeches(): number {
    return this._numLeeches;
  }

  get numSeeds(): number {
    return this._numSeeds;
  }

  get priority(): number {
    return this._priority;
  }

  get progress(): number {
    return (+this._progress.toPrecision(2)) * 100;
  }

  get ratio(): number {
    return this._ratio;
  }

  get ratioLimit(): number {
    return this._ratioLimit;
  }

  get savePath(): string {
    return this._savePath;
  }

  get seedingTime(): number {
    return this._seedingTime;
  }

  get seedingTimeLimit(): number {
    return this._seedingTimeLimit;
  }

  get seenComplete(): number {
    return this._seenComplete;
  }

  get seqDl(): boolean {
    return this._seqDl;
  }

  get size(): number {
    return this._size;
  }

  get state(): "stalledUP" {
    return this._state;
  }

  get superSeeding(): boolean {
    return this._superSeeding;
  }

  get tags(): string[] {
    return this._tags;
  }

  get timeActive(): number {
    return this._timeActive;
  }

  get totalSize(): number {
    return this._totalSize;
  }

  get tracker(): string {
    return this._tracker.length === 0 ? null : this._tracker;
  }

  get trackersCount(): number {
    return this._trackersCount;
  }

  get upLimit(): number {
    return this._upLimit;
  }

  get uploaded(): number {
    return this._uploaded;
  }

  get uploadedSession(): number {
    return this._uploadedSession;
  }

  get upSpeed(): number {
    return this._upSpeed;
  }

  get history(): TorrentHistory[] {
    return this._history;
  }
}
