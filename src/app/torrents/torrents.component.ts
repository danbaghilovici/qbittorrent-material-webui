import {Component, OnInit} from '@angular/core';
import { Observable, tap} from "rxjs";
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import {MatTableDataSource} from "@angular/material/table";
import {TorrentsService} from "./torrents.service";
import {NGXLogger} from "ngx-logger";
import {TorrentData} from "../qbit/models/torrent-data.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {default as Annotation} from "chartjs-plugin-annotation";


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
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [ 28, 48, 40, 19, 86, 27, 90 ],
        label: 'Series B',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [ 180, 480, 770, 90, 1000, 270, 400 ],
        label: 'Series C',
        yAxisID: 'y-axis-1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true }
    }
  };

  public lineChartType: ChartType = 'line';

  constructor(private readonly torrentsService:TorrentsService,
              private readonly logger:NGXLogger) {
    this.expandedElements=new Set<string>();
    this.selection = new Set<string>();
    Chart.register(Annotation)
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
