import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { IRedemptionRecord } from 'src/app/common/interfaces/redemption-record';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { ReportService } from 'src/app/core/services/report/report.service';

@Component({
  selector: 'app-report-results',
  templateUrl: './report-results.component.html',
  styleUrls: ['./report-results.component.css']
})
export class ReportResultsComponent implements OnInit, OnDestroy {
  public columnsToDisplay = ['timeStamp', 'redemptionCode', 'status', 'user', 'outlet'];

  public dataSource: MatTableDataSource<IRedemptionRecord>;

  @Input()
  public records: IRedemptionRecord[];
  private subscription: Subscription;
  public showTable = false;

  @ViewChild(MatSort, {static: false}) public sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) public paginator: MatPaginator;

  constructor(private readonly reportService: ReportService) {
      this.dataSource = new MatTableDataSource<IRedemptionRecord>(this.records);
      setTimeout(() => this.dataSource.sort = this.sort);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }

  public ngOnInit() {

    this.subscription = this.reportService.report$.subscribe((res) => {
      if (this.records.length === 0) {
        this.showTable = false;
      } else {
        this.showTable = true;
        this.records = this.records.sort((a, b) => {
          return new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime();
        });
        this.dataSource = new MatTableDataSource<IRedemptionRecord>(this.records);
        this.dataSource.paginator = this.paginator;
        setTimeout(() => this.dataSource.sort = this.sort);
      }
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
