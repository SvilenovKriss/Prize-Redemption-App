import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { NotificatorService } from './core/services/notificator/notificator.service';
import { AuthService } from './core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppService } from './core/services/app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  public username = '';
  public isLogged = false;
  private subscription: Subscription;
  public otherTheme = false;
  @HostBinding('class') public componentCssClass;

  constructor(
    private readonly notificator: NotificatorService,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly appService: AppService,
    public overlayContainer: OverlayContainer
  ) {
  }

  public changeTheme() {
    this.otherTheme = !this.otherTheme;
    this.otherTheme ? this.overlayContainer.getContainerElement().classList.add(
      'alternative'
      ) :
    this.overlayContainer.getContainerElement().classList.add('default');
    this.componentCssClass = this.otherTheme ? 'alternative' : 'default';
    this.appService.changeThemeSubject();
  }

  public ngOnInit() {
    this.subscription = this.auth.user$.subscribe(
      (username) => {
        if (username) {
          this.username = username;
          this.isLogged = true;
        } else {
          this.username = '';
          this.isLogged = false;
        }
      }
    );
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public logout() {
    this.auth.logout();
    this.notificator.success('You have logged out.');
    this.router.navigate(['home']);
  }
}
