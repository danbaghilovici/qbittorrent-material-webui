import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {TorrentsComponent} from "./torrents.component";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {QbitModule} from "../qbit/qbit.module";
import {TorrentsService} from "./torrents.service";
import {MatChipsModule} from "@angular/material/chips";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {ShortDomainPipe} from "./short-domain.pipe";
import {MatRippleModule} from "@angular/material/core";
import {TorrentChartModule} from "./torrent-chart/torrent-chart.module";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormatBytesPipe} from "./format-bytes.pipe";




@NgModule({
  declarations: [
    TorrentsComponent,ShortDomainPipe,FormatBytesPipe
  ],
  providers:[TorrentsService],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    QbitModule,
    MatChipsModule,
    MatGridListModule,
    MatListModule,
    MatRippleModule,
    TorrentChartModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.TRACE}),
    MatCardModule,
    MatTooltipModule,
  ],
  exports:[TorrentsComponent]
})
export class TorrentsModule { }
