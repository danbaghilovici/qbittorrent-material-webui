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
import {NgChartsConfiguration, NgChartsModule} from "ng2-charts";
import {MatRippleModule} from "@angular/material/core";




@NgModule({
  declarations: [
    TorrentsComponent,ShortDomainPipe
  ],
  providers:[TorrentsService,{provide:NgChartsConfiguration,useValue:{}}],
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
    NgChartsModule,
    MatRippleModule
  ],
  exports:[TorrentsComponent]
})
export class TorrentsModule { }
