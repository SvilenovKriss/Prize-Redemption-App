import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  @Output()
  public customer = new EventEmitter();
  public editGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit() {
    const customerMinLength = 6;
    this.editGroup = this.formBuilder.group({
      customer: [
        '', [Validators.minLength(customerMinLength)]
      ]
    });
  }

  public createCustomer(name: string) {
    this.customer.emit({ name });
  }
}
  