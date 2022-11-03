import { Component, OnInit } from '@angular/core';
import {TorrentModel} from "./torrent.model";
import {BehaviorSubject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-torrents',
  templateUrl: './torrents.component.html',
  styleUrls: ['./torrents.component.scss']
})
export class TorrentsComponent implements OnInit {
  public torrents:BehaviorSubject<TorrentModel[]>=new BehaviorSubject<TorrentModel[]>([])
  public tableTorrents:{id:string,name:string,time:number}[]=[];

  columnsToDisplay = ['select','id','name', 'timeActive'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  // @ts-ignore
  expandedElements: Set<string>;
  selection = new SelectionModel<TorrentModel>(true, []);
  dataSource = new MatTableDataSource<TorrentModel>([]);

  constructor() {
    this.expandedElements=new Set<string>();
  }

  ngOnInit(): void {
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
