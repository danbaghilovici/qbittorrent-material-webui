import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {QbitModule} from "../qbit/qbit.module";
import {DashboardService} from "./dashboard.service";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TorrentsModule} from "../torrents/torrents.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";

const routes: Routes = [
  {path:"", component: DashboardComponent}
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  providers:[DashboardService],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    LoggerModule.forRoot({level: NgxLoggerLevel.TRACE}),
    QbitModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TorrentsModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule
  ]
})
export class DashboardModule { }
