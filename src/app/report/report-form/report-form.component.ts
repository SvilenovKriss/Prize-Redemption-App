import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ReportService } from 'src/app/core/services/report/report.service';
import { IOutlet } from 'src/app/common/interfaces/outlet';
import { ICustomer } from 'src/app/common/interfaces/customer';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/core/services/app/app.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit, OnDestroy {

  @Output()
  public reportRequest = new EventEmitter<{ formData: any }>();
  @Input()
  public outlets: IOutlet[];
  @Input()
  public customers: ICustomer[];
  private subscription: Subscription;
  public currentTheme = 'default';
  public userProperties = ['id', 'username', 'email'];

  constructor(
    public service: ReportService,
    private readonly appService: AppService
  ) {}

  public ngOnInit() {
    this.subscription = this.appService.theme$.subscribe(
      (res) => {
        this.currentTheme = res;
      });
  }

  public onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  public onSubmit() {
    this.service.form.valid ? this.reportRequest.emit(this.service.form.value) : undefined;
  }

  public getThemePrimaryClass() {
    if (this.currentTheme === 'default') {
      return { defaultPrimary: true, defaultAccent: false };
    } else {
      return { altPrimary: true, altAccent: false };
    }
  }

  public getThemeAccentClass() {
    if (this.currentTheme === 'default') {
      return { defaultPrimary: false, defaultAccent: true };
    } else {
      return { altPrimary: false, altAccent: true };
    }
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
    this.service.form.reset();
  }

}
