export class TorrentModel{

  private _id:string;
  private _name:string;
  private _timeActive:number;

  constructor(id:string,json:object) {
    this._id=id;

    //@ts-ignore
    this._name=json["name"];
    // @ts-ignore
    this._timeActive=json["timeActive"];
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
