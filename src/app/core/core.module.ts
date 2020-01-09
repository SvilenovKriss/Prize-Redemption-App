import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
import { StorageService } from './services/storage/storage.service';
import { NotificatorService } from './services/notificator/notificator.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { ScanCodeService } from './services/scan-code/scan-code.service';
import { OutletService } from './services/outlet/outlet.service';
import { CustomerService } from './services/customer/customer.service';
import { ReportService } from './services/report/report.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      closeButton: true,
      newestOnTop: true,
      timeOut: 2000,
      preventDuplicates: true,
      positionClass: 'toast-bottom-center'
    }),
    HttpClientModule

  ],
  providers: [
    AuthService,
    StorageService,
    NotificatorService,
    UserService,
    ScanCodeService,
    OutletService,
    CustomerService,
    ReportService
  ]
})
export class CoreModule { }
