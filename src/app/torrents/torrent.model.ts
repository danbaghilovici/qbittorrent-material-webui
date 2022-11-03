export interface TorrentHistory{
  date:number;
  upSpeed:number;
  dlSpeed:number;
}

export class TorrentModel{
  set name(value: string) {
    this._name = value;
  }

  private _id:string;
  private _name!: string;
  private _timeActive!:number;
  private _progress!:number;
  private history:TorrentHistory[]=[]

  constructor(id:string,json:object) {
    this._id=id;
    this.updateTorrentData(json);

  }

  public updateHistory(json:object){
    // @ts-ignore
    this.history.push({date:Date.now(),upSpeed:json["upspeed"],dlSpeed:json["dlspeed"]})
  }

  private updateTorrentData(json:object):void{
    //@ts-ignore
    this._name=json["name"];
    // @ts-ignore
    this._timeActive=json["time_active"];
    // @ts-ignore
    this._progress=json["progress"]

  }


  get progress(): number {
    return this._progress*100;
  }

  get timeActive(): number {
    return this._timeActive;
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }


}
