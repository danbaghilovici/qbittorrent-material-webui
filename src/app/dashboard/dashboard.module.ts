import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";

const routes: Routes = [
  {path:"", component: DashboardComponent}
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    LoggerModule.forRoot({level: NgxLoggerLevel.TRACE}),
    MatTableModule,
    MatCheckboxModule
  ]
})
export class DashboardModule { }
