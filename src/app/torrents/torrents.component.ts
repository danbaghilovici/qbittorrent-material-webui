import {Component, OnInit} from '@angular/core';
import { Observable, tap} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {TorrentsService} from "./torrents.service";
import {NGXLogger} from "ngx-logger";
import {TorrentData} from "../qbit/models/torrent-data.model";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-torrents',
  templateUrl: './torrents.component.html',
  styleUrls: ['./torrents.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TorrentsComponent implements OnInit {
  // public torrents:BehaviorSubject<TorrentData[]>=new BehaviorSubject<TorrentData[]>([])
  public tableTorrents:{id:string,name:string,time:number}[]=[];
  public torrents$:Observable<Map<string,TorrentData>>;
  public view: any = [700, 300];
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  columnsToDisplay = [
    'select',
    'id',
    'name',
    'addedOn',
    'timeActive',
    'tags',
    'progress',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  // @ts-ignore
  expandedElements: Set<string>;
  private selection:Set<string>;
  dataSource = new MatTableDataSource<TorrentData>([]);
  public multi:any=[
    {
      "name": "Germany",
      "series": [
        {
          "name": "1990",
          "value": 62000000
        },
        {
          "name": "2010",
          "value": 73000000
        },
        {
          "name": "2011",
          "value": 89400000
        }
      ]
    },

    {
      "name": "USA",
      "series": [
        {
          "name": "1990",
          "value": 250000000
        },
        {
          "name": "2010",
          "value": 309000000
        },
        {
          "name": "2011",
          "value": 311000000
        }
      ]
    },

    {
      "name": "France",
      "series": [
        {
          "name": "1990",
          "value": 58000000
        },
        {
          "name": "2010",
          "value": 50000020
        },
        {
          "name": "2011",
          "value": 58000000
        }
      ]
    },
    {
      "name": "UK",
      "series": [
        {
          "name": "1990",
          "value": 57000000
        },
        {
          "name": "2010",
          "value": 62000000
        }
      ]
    }
  ];


  constructor(private readonly torrentsService:TorrentsService,
              private readonly logger:NGXLogger) {
    this.expandedElements=new Set<string>();
    this.selection = new Set<string>();
  }

  ngOnInit(): void {
    this.torrents$=this.torrentsService.getTorrentData();
    this.torrents$.pipe(
      tap((data)=>{
        const arr=[];
        for (let c of data.values()){
          arr.push(c);
        }
        // this.logger.trace("arr is",arr);
      })
    ).subscribe((data)=>{
      // console.log("asdwa");
      this.dataSource.connect().next(Array.from(data.values()));

    });

  }

  onExpandClick($event:Event,element:TorrentData){
    if (this.expandedElements.has(element.id)){
      this.expandedElements.delete(element.id)
    }else{
      this.expandedElements.add(element.id)
    }
    $event.stopPropagation()
  }

  isAllSelected():boolean {
    const numSelected = this.selection.size;
    const numRows = this.dataSource.connect().getValue().length; // check data len
    return this.selection.size!=0 && numSelected === numRows;
  }

  areAllExpanded():boolean{
    return this.expandedElements.size!==0 && this.expandedElements.size===this.dataSource.connect().getValue().length;
  }

  expandAllElements():void{
    if (this.areAllExpanded()){
      this.expandedElements.clear();
      return;
    }
    this.dataSource.connect().getValue().forEach(t=>{
      this.expandedElements.add(t.id);
    });
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    // this.selection.select(Array.from(this.dataSource.data.values()));
    // this.selection.
    this.dataSource.connect().getValue().forEach(t=>{
      this.selection.add(t.id);
    })
    // this.logger.trace("selection",this.selection.selected);
  }


  checkboxLabel(row?: TorrentData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.isRowSelected(row) ? 'deselect' : 'select'} row `;
  }

  isRowSelected(row:TorrentData):boolean{
    return this.selection.size!=0 && this.selection.has(row.id);
  }

  toggleSelectionRow(row:TorrentData):void{
    if (this.selection.has(row.id)){
      this.selection.delete(row.id);
      return;
    }
    this.selection.add(row.id);
  }

  selectionHasValue():boolean{
    return this.selection.size!=0;
  }

}
