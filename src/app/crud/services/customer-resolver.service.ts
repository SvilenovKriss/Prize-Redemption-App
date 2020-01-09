import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificatorService } from 'src/app/core/services/notificator/notificator.service';
import { CustomerService } from 'src/app/core/services/customer/customer.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerResolverService implements Resolve<any> {

  constructor(
    private readonly customerService: CustomerService,
    private readonly notificator: NotificatorService
  ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.customerService.getCustomers()
      .pipe(catchError(
        (res) => {
          this.notificator.error(res.error.error);
          return of({ customers: [] });
        }
      ));
  }
}
