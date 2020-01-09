import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/common/interfaces/customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-outlet',
  templateUrl: './create-outlet.component.html',
  styleUrls: ['./create-outlet.component.css']
})
export class CreateOutletComponent implements OnInit {

  @Output()
  public outlet = new EventEmitter<any>();
  @Input()
  public customers: ICustomer[];
  public editGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit() {
    const outletMinLength = 6;
    this.editGroup = this.formBuilder.group({
      outlet: [
        '', [Validators.minLength(outletMinLength)]
      ]
    });
  }

  public createOutlet(name: string, customer): void {
    const customerID = this.customers.find((customerInfo) => customerInfo.name === customer);
    const outlet = { name, customerId: customerID.id };
    this.outlet.emit(outlet);
  }
}
