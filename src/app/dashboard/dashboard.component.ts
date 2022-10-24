import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, of, switchMap} from "rxjs";
import {DashboardService} from "./dashboard.service";
import {TorrentModel} from "../models/torrent.model";
import {NGXLogger} from "ngx-logger";
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {

  public torrents:BehaviorSubject<TorrentModel[]>=new BehaviorSubject<TorrentModel[]>([])
  public tableTorrents:{id:string,name:string,time:number}[]=[];

  columnsToDisplay = ['select','id','name', 'timeActive'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  // @ts-ignore
  expandedElements: Set<string>;
  selection = new SelectionModel<TorrentModel>(true, []);
  dataSource = new MatTableDataSource<TorrentModel>([]);


  constructor(private dashboardService:DashboardService,
              private logger:NGXLogger) {
    this.expandedElements=new Set<string>();
  }

  ngOnInit(): void {
    console.log("dashboard loaded")
    this.dashboardService.pooling$
      .pipe(switchMap((data)=>{
        return this.setAvailableTorrents(data);
      }),
      ).subscribe(()=>{
        this.logger.trace("done parsing data");
    })

    // this.torrents.asObservable()
    //   .subscribe(torrents=>{
    //     const arr:{id:string,name:string,time:number}[]=[];
    //   torrents.forEach((t)=>{
    //     arr.push({id:t.id,name:t.name,time:t.timeActive});
    //   });
    //   this.tableTorrents=arr;
    // })
  }

  private setAvailableTorrents(data:object):Observable<void>{
    this.logger.trace("received",data);
    // this.logger.trace(typeof );
    const arr:TorrentModel[]=[];
    Object.entries(Object.values(data)[5]).forEach((k,v)=>{
      this.logger.trace("values ",k,v);

      // @ts-ignore
      arr.push(new TorrentModel(k[0],k[1]));
    })
    this.torrents.next(arr);
    // this.dataSource.data=
    this.dataSource.connect().next(this.torrents.getValue())
    return of();
  }

  onExpandClick($event:Event,element:TorrentModel){
    if (this.expandedElements.has(element.id)){
      this.expandedElements.delete(element.id)
    }else{
      this.expandedElements.add(element.id)
    }
    $event.stopPropagation()
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  checkboxLabel(row?: TorrentModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }


}
