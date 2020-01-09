import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificatorService } from 'src/app/core/services/notificator/notificator.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OutletActivityResolverService implements Resolve<any> {
  constructor(
    private readonly userService: UserService,
    private readonly notificator: NotificatorService
  ) { }

  public resolve(route: ActivatedRouteSnapshot) {
    const id = route.params.id;
    return this.userService.getOutletActivity(id).pipe(
      catchError((res) => {
        this.notificator.error(res.error.error);
        return of({ user: [] });
      })
    );
  }
}
