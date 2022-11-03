import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {QbitModule} from "../qbit/qbit.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {DashboardService} from "./dashboard.service";

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
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class DashboardModule { }
