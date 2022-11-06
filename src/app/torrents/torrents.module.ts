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
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {NgxLineChartZeroMarginDirective} from "./chart.directive";




@NgModule({
  declarations: [
    TorrentsComponent,ShortDomainPipe,NgxLineChartZeroMarginDirective
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
    NgxChartsModule
  ],
  exports:[TorrentsComponent]
})
export class TorrentsModule { }
