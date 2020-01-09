import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IRedemptionRecord } from 'src/app/common/interfaces/redemption-record';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { ReportService } from 'src/app/core/services/report/report.service';

@Component({
  selector: 'app-report-dashboards',
  templateUrl: './report-dashboards.component.html',
  styleUrls: ['./report-dashboards.component.css']
})
export class ReportDashboardsComponent implements OnInit, OnDestroy {

  @Input()
  public records: IRedemptionRecord[];
  public white = 'white';
  public columnsToDisplay = ['timeStamp', 'redemptionCode', 'status', 'user', 'outlet'];
  public dataSource: MatTableDataSource<IRedemptionRecord>;
  private subscription: Subscription;
  public showTable = false;
  public type = 'line';
  public data1 = null;
  public data2 = null;
  public data3 = null;
  public data4 = null;
  public options = {
    chartArea: {
      backgroundColor: this.white
    },
    legends: {
      label: {
        fontColor: this.white
      }
    },
    title: {
      fontColor: this.white
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          ticks: { fontColor: this.white }
        }],
      yAxes: [
        {
          ticks: { fontColor: this.white }
        }]
    }
  };

  constructor(
    private readonly reportService: ReportService
  ) {}

  public ngOnInit() {
    this.subscription = this.reportService.report$.subscribe((res) => {

      if (this.records.length === 0) {

        this.data1 = null;
        this.data2 = null;
        this.data3 = null;
        this.data4 = null;

      } else {

        this.records = this.records.sort((a, b) => {
          return new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime();
        });

        const days = this.getArrayDaysBetweenFirstAndLastDates(this.records);

        const allRecordsPerDay = this.getRecordNumbersByDates(this.records, days);
        const declinedRecordsPerDay = this.getRecordNumbersByDates(this.records, days, 'Declined');
        const redeemedRecordsPerDay = this.getRecordNumbersByDates(this.records, days, 'Redeemed');
        const cancelledRecordsPerDay = this.getRecordNumbersByDates(this.records, days, 'Cancelled');

        this.data1 = {
          labels: days,
          datasets: [
            {
              label: 'All Records',
              data: allRecordsPerDay,
              borderColor: this.white,
              pointRadius: 5,
              pointBackgroundColor: this.white,
              lineTension: 0,
              fill: false
            },
            {
              label: 'Declined Records',
              data: declinedRecordsPerDay,
              borderColor: 'red',
              pointRadius: 5,
              pointBackgroundColor: 'red',
              lineTension: 0,
              fill: false
            },
            {
              label: 'Redeemed Records',
              data: redeemedRecordsPerDay,
              borderColor: 'green',
              pointRadius: 5,
              pointBackgroundColor: 'green',
              lineTension: 0,
              fill: false
            },
            {
              label: 'Cancelled Records',
              data: cancelledRecordsPerDay,
              borderColor: 'yellow',
              pointRadius: 5,
              pointBackgroundColor: 'yellow',
              lineTension: 0,
              fill: false
            }
          ]
        };

        this.data2 = {
          labels: days,
          datasets: [
            {
              label: 'Redeemed Records',
              data: redeemedRecordsPerDay,
              borderColor: this.white,
              pointRadius: 5,
              pointBackgroundColor: this.white,
              lineTension: 0,
              fill: false
            }
          ]
        };

        this.data3 = {
          labels: days,
          datasets: [
            {
              label: 'Declined Records',
              data: declinedRecordsPerDay,
              borderColor: this.white,
              pointRadius: 5,
              pointBackgroundColor: this.white,
              lineTension: 0,
              fill: false
            }
          ]
        };

        this.data4 = {
          labels: days,
          datasets: [
            {
              label: 'Cancelled Records',
              data: cancelledRecordsPerDay,
              borderColor: this.white,
              pointRadius: 5,
              pointBackgroundColor: this.white,
              lineTension: 0,
              fill: false
            }
          ]
        };
      }
    });
  }

  public changeDateFormat(dateObj: Date): string {
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  public getArrayDaysBetweenFirstAndLastDates(recordsArray: IRedemptionRecord[]): string[] {
    if (!recordsArray || recordsArray.length === 0) {
      return null;
    }
    // tslint:disable-next-line: no-magic-numbers
    const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
    const startDateMilliseconds = new Date(recordsArray[0].timeStamp).valueOf();
    const endDateMilliseconds = new Date(recordsArray[(recordsArray.length - 1)].timeStamp).valueOf();
    const PeriodSeconds = endDateMilliseconds - startDateMilliseconds;
    let diffDays = Math.ceil(PeriodSeconds / MS_PER_DAY);
    // tslint:disable-next-line: no-magic-numbers
    const firstDateTimeOfDay = new Date(recordsArray[(recordsArray.length - 1)].timeStamp).getHours() * 60 * 60 * 1000 +
      // tslint:disable-next-line: no-magic-numbers
      new Date(recordsArray[(recordsArray.length - 1)].timeStamp).getMinutes() * 60 * 1000 +
      // tslint:disable-next-line: no-magic-numbers
      new Date(recordsArray[(recordsArray.length - 1)].timeStamp).getSeconds() * 1000 +
      new Date(recordsArray[(recordsArray.length - 1)].timeStamp).getMilliseconds();
    // tslint:disable-next-line: no-magic-numbers
    const lastDateTimeOfDay = new Date(recordsArray[0].timeStamp).getHours() * 60 * 60 * 1000 +
      // tslint:disable-next-line: no-magic-numbers
      new Date(recordsArray[0].timeStamp).getMinutes() * 60 * 1000 +
      // tslint:disable-next-line: no-magic-numbers
      new Date(recordsArray[0].timeStamp).getSeconds() * 1000 +
      new Date(recordsArray[0].timeStamp).getMilliseconds();
    if (firstDateTimeOfDay - lastDateTimeOfDay < 0) {
      diffDays = diffDays + 1;
    }

    const days: string[] = Array.from(new Array(diffDays),
      (v, i) => this.changeDateFormat(new Date(startDateMilliseconds + (i * MS_PER_DAY))));

    return days;
  }

  public getRecordNumbersByDates(reportResults: IRedemptionRecord[], days: string[], status: string = null): number[] {
    if (!reportResults || reportResults.length === 0) {
      return null;
    }

    if (status) {
      reportResults = reportResults.filter((record) => record.status === status);
    }

    const allRecordsPerDayAboveZero = reportResults.reduce((result, order) => {
      const day = this.changeDateFormat(new Date(order.timeStamp));
      if (!result[day]) {
        result[day] = 0;
      }
      result[day]++;
      return result;
    }, {});

    const allRecordsPerDay = days.map((day) => {
      for (const index in allRecordsPerDayAboveZero) {
        const strValue = allRecordsPerDayAboveZero[index];
        if (index === day) { return strValue; }
      }
      return 0;
    });
    return allRecordsPerDay;
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
