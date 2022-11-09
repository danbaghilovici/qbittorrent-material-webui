import {HistoryArray} from "./history-array.model";


export interface ITorrentHistory {
  date: number;
  upSpeed: number;
  dlSpeed: number;
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
  private readonly _id: string;
  private readonly _addedOn: Date;
  private readonly _amountLeft: number;
  private readonly _autoTmm: boolean;
  private readonly _availability: number;
  private readonly _category: string;
  private readonly _completed: number;
  private readonly _completionOn: number;
  private readonly _contentPath: string;
  private readonly _dlLimit: number;
  private readonly _dlSpeed: number;
  private readonly _downloadPath: string;
  private readonly _downloaded: number;
  private readonly _downloadedSession: number;
  private readonly _eta: number;
  private readonly _f_l_piecePrio: boolean;
  private readonly _forceStart: boolean;
  private readonly _infoHashV1: string;
  private readonly _infoHashV2: string;
  private readonly _lastActivity: number;
  private readonly _magnetUri: string;
  private readonly _maxRatio: number;
  private readonly _maxSeedingTime: number;
  private readonly _name: string;
  private readonly _numComplete: number;
  private readonly _numIncomplete: number;
  private readonly _numLeeches: number;
  private readonly _numSeeds: number;
  private readonly _priority: number;
  private readonly _progress: number;
  private readonly _ratio: number;
  private readonly _ratioLimit: number;
  private readonly _savePath: string;
  private readonly _seedingTime: number;
  private readonly _seedingTimeLimit: number;
  private readonly _seenComplete: number;
  private readonly _seqDl: boolean;
  private readonly _size: number;
  private readonly _state: "stalledUP";
  private readonly _superSeeding: boolean;
  private readonly _tags: string[];
  private readonly _timeActive: number;
  private readonly _totalSize: number;
  private readonly _tracker: string;
  private readonly _trackersCount: number;
  private readonly _upLimit: number;
  private readonly _uploaded: number;
  private readonly _uploadedSession: number;
  private readonly _upSpeed: number

  private readonly _history: ITorrentHistory[];

  constructor(id: string, json: ITorrentData, from: TorrentData = null) {
    this._id = from != null ? from._id : id;
    // @ts-ignore
    this._addedOn = new Date((from != null ? from._addedOn : json.added_on) * 1000);
    this._amountLeft = from != null ? from._amountLeft : json.amount_left;
    this._autoTmm = from != null ? from._autoTmm : json.auto_tmm;
    this._availability = from != null ? from._availability : json.availability;
    this._name = from != null ? from._name : json.name;
    this._progress = from != null ? from._progress : json.progress;
    this._timeActive = from != null ? from._timeActive : json.time_active;
    this._tracker = from != null ? from._tracker : json.tracker;
    this._infoHashV1 = from != null ? from._infoHashV1 : json.infohash_v1;
    this._infoHashV2 = from != null ? from._infoHashV2 : json.infohash_v2;
    this._magnetUri = from != null ? from._magnetUri : json.magnet_uri;
    this._upSpeed = from != null ? from._upSpeed : json.upspeed;
    this._dlSpeed = from != null ? from._dlSpeed : json.dlspeed;
    this._tags = this.generateTags((from != null ? from._tags : json.tags) + "");
    const k: ITorrentHistory = {date: Date.now(), upSpeed: this._upSpeed, dlSpeed: this._dlSpeed};
    if (from != null) {
      this._history = from._history;
    } else {
      this._history = [];
    }
    this.insertIntoHistory(k,from);

  }

  private insertIntoHistory(data: ITorrentHistory,from:any): void {
    if (this._history.length >= 10) {
      this._history.shift();
    }
    this._history.push(data);
    console.log("last data pushed "+JSON.stringify(data)+";; "+JSON.stringify(this._history)+";; "+from);
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

  get history(): ITorrentHistory[] {
    return this._history;
  }
}
