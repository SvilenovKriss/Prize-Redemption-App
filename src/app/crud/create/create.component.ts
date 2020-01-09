import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOutlet } from 'src/app/common/interfaces/outlet';
import { UserService } from 'src/app/core/services/user/user.service';
import { NotificatorService } from 'src/app/core/services/notificator/notificator.service';
import { ICustomer } from 'src/app/common/interfaces/customer';
import { OutletService } from 'src/app/core/services/outlet/outlet.service';
import { CustomerService } from 'src/app/core/services/customer/customer.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public outlets: IOutlet[];
  public customers: ICustomer[];
  public allEmails;
  public allUsernames;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly notificator: NotificatorService,
    private readonly outletService: OutletService,
    private readonly customerService: CustomerService
  ) { }

  public ngOnInit() {
    this.route.data.subscribe((data) => {
      this.outlets = data.outlets;
      this.customers = data.customers;
      this.allEmails = data.emails;
      this.allUsernames = data.usernames;
    });
  }

  public createUser(event) {
    this.userService.createUser(event).subscribe(
      () => this.notificator.success('User was created'),
      () => this.notificator.error('Unable to create user')
    );
  }

  public createOutlet(event) {
    this.outletService.createOutlet(event).subscribe(
      () => {
        this.outletService.getAllOutlets().subscribe((data: IOutlet[]) => {
          this.outlets = data;
          this.notificator.success('Outlet was created');
        });
      },
      () => this.notificator.error('Unable to create outlet')
    );
  }

  public createCustomer(event) {
    this.customerService.createCustomer(event).subscribe(
      () => {
        this.customerService.getCustomers().subscribe((data: ICustomer[]) => {
          this.customers = data;
          this.notificator.success('Customer was created');
        });
      },
      () => this.notificator.error('Unable to create customer')
    );
  }

  public deleteStore(event) {
    if (event.customerID) {
      this.customerService.deleteCustomer(event.customerID).subscribe(
        () => this.notificator.success('Customer is successfully deleted'),
        () => this.notificator.error('There was a problem with deleting customer')
      );
    }
    if (event.outletID) {
      this.outletService.deleteOutlet(event.outletID).subscribe(
        () => this.notificator.success('Outlet is successfully deleted'),
        () => this.notificator.error('There was a problem with deleting outlet')
      );
    }
  }
}
