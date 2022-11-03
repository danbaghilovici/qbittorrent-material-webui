// the worst implementation of a shifting array
// I have ever probably seen
// but it works (kinda) for now.
export class HistoryArray {
  private _arr: any[]=[];
  private index:number;
  private limit:number;

  constructor(len: number = 10) {
    this.limit=len;
    this.index=0;
  }


  get arr(): any[] {
    return this._arr;
  }

  public push(value:any){
    if (this.notMax()){
      this._arr.push(value);
      this.index++;
    }else{
      this._arr.shift()
      this._arr[this.index]=value;
    }
  }

  private notMax():boolean{
    return this.index.valueOf()<this.limit.valueOf()
  }


}
