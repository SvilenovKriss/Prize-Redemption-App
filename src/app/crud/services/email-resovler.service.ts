import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificatorService } from 'src/app/core/services/notificator/notificator.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<any> {

  constructor(
    private readonly userService: UserService,
    private readonly notificator: NotificatorService
  ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.userService.getAllEmails()
      .pipe(catchError(
        (res) => {
          this.notificator.error(res.error.error);
          return of({ emails: [] });
        }
      ));
  }
}
