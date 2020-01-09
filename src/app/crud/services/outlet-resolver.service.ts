import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificatorService } from 'src/app/core/services/notificator/notificator.service';
import { OutletService } from 'src/app/core/services/outlet/outlet.service';

@Injectable({
  providedIn: 'root'
})
export class OutletResolverService implements Resolve<any> {

  constructor(
    private readonly outletService: OutletService,
    private readonly notificator: NotificatorService
  ) { }

  public resolve() {
    return this.outletService.getAllOutlets()
      .pipe(catchError(
        (res) => {
          this.notificator.error(res.error.error);
          return of({ outlets: [] });
        }
      ));
  }
}
