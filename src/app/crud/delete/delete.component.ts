import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IOutlet } from 'src/app/common/interfaces/outlet';
import { ICustomer } from 'src/app/common/interfaces/customer';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  @Output()
  public delete = new EventEmitter();
  @Input()
  public outlets: IOutlet;
  @Input()
  public customers: ICustomer;

  public deleteCustomerOrOutlet(outlet: string, customer: string): void {
    const store = {};

    if (outlet !== '') {
      // tslint:disable-next-line: no-string-literal
      store['outletID'] = outlet;
    }
    if (customer !== '') {
      // tslint:disable-next-line: no-string-literal
      store['customerID'] = customer;
    }
    this.delete.emit(store);
  }
}
