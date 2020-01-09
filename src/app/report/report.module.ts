import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReportRoutingModule } from './report-routing.module';
import { ReportFormComponent } from './report-form/report-form.component';
import { ReportFullComponent } from './report-full/report-full.component';
import { ReportResultsComponent } from './report-results/report-results.component';
import { ReportDashboardsComponent } from './report-dashboards/report-dashboards.component';

@NgModule({
  declarations: [ReportFormComponent, ReportFullComponent, ReportResultsComponent, ReportDashboardsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReportRoutingModule
  ]
})

export class ReportModule { }
