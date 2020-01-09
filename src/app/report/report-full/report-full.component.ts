import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { NotificatorService } from 'src/app/core/services/notificator/notificator.service';
import { ReportService } from 'src/app/core/services/report/report.service';
import { IOutlet } from 'src/app/common/interfaces/outlet';
import { ICustomer } from 'src/app/common/interfaces/customer';
import { ActivatedRoute } from '@angular/router';
import { IRedemptionRecord } from 'src/app/common/interfaces/redemption-record';

@Component({
  selector: 'app-report-full',
  templateUrl: './report-full.component.html',
  styleUrls: ['./report-full.component.css']
})
export class ReportFullComponent implements OnInit {
  
  public outlets: IOutlet[];
  public customers: ICustomer[];
  public reportResults: IRedemptionRecord[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly reportService: ReportService,
    private readonly notificator: NotificatorService
  ) {}

  public ngOnInit() {
    this.route.data.subscribe((data) => {
      this.outlets = data.outlets;
      this.customers = data.customers;
    });
  }

  public async getReport(reportRequestData: any) {

    if (reportRequestData.userPropertyType === 'username') {
        await this.userService.getUserIdByUsername(reportRequestData.userPropertyValue).subscribe(
          (res: any) => {
            this.sendReportRequest(reportRequestData, res.userId);
          },
          (error) => this.notificator.error(error.error.message)
          );
      } else if (reportRequestData.userPropertyType === 'email') {
        await this.userService.getUserIdByEmail(reportRequestData.userPropertyValue).subscribe(
          (res: any) => {
            this.sendReportRequest(reportRequestData, res.userId);
          },
          (error) => this.notificator.error(error.error.message)
          );
      } else {
        this.sendReportRequest(reportRequestData, reportRequestData.userPropertyValue);
      }

  }

  public sendReportRequest(reportRequestData: any, userId: string) {
      if (!reportRequestData) {
        throw new Error('reportRequestData is undefined or null!');
      }
      const untilDateISO = reportRequestData.periodCheckbox ? new Date(new Date(reportRequestData.untilDate)
      // tslint:disable-next-line: no-magic-numbers
      .getTime() + 60 * 60 * 24 * 1000).toISOString() : undefined;
      const fromDateISO = reportRequestData.periodCheckbox ? reportRequestData.fromDate.toISOString() : undefined;
      this.reportService.getReportResults(
        fromDateISO,
        untilDateISO,
        userId,
        reportRequestData.customerId,
        reportRequestData.outletId
      ).subscribe((res) => {
        this.reportResults = (res as any).sort((a, b) => {
          return new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime();
        });

        this.reportService.notifyReportSubject();
      },
      (error) => this.notificator.error(error.error.message)
      );
  }

}
