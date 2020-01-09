import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public localhost: string = 'https://prize-redemption-backend.herokuapp.com/';
  constructor(private readonly http: HttpClient) { }

  public getCustomers() {
    return this.http.get(`${this.localhost}customer`);
  }

  public createCustomer(customer) {
    return this.http.post(`${this.localhost}customer`, customer);
  }

  public deleteCustomer(customerID) {
    return this.http.delete(`${this.localhost}customer/${customerID}`);
  }
}
