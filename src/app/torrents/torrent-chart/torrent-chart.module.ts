import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TorrentChartComponent } from './torrent-chart.component';
import {NgChartsConfiguration, NgChartsModule} from "ng2-charts";



@NgModule({
  declarations: [
    TorrentChartComponent
  ],
  providers:[{provide:NgChartsConfiguration,useValue:{}}],
  imports: [
    CommonModule,
    NgChartsModule
  ],
  exports:[TorrentChartComponent]
})
export class TorrentChartModule { }
