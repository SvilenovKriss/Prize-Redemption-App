import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ProfileModule } from './profile/profile.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConfirmDialogComponent } from './modules/scan-code/confirm-dialog/confirm-dialog.component';
import { RedemptionHistoryDialogComponent } from './modules/scan-code/redemption-history-dialog/redemption-history-dialog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './auth/interceptors/spinner-interceptor.service';
import { TokenInterceptorService } from './auth/interceptors/token-interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HelpDeskComponent } from './components/help-desk/help-desk.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    NavbarComponent,
    NotFoundComponent,
    ConfirmDialogComponent,
    RedemptionHistoryDialogComponent,
    HelpDeskComponent
  ],
  imports: [
    ProfileModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule,
    NgxSpinnerModule,
    OverlayModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent, RedemptionHistoryDialogComponent]
})
export class AppModule {}
