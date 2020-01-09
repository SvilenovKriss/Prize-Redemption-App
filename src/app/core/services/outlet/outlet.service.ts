import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OutletService {
  public localhost: string = 'https://prize-redemption-backend.herokuapp.com/';

  constructor(private readonly http: HttpClient) { }

  public getAllOutlets() {
    return this.http.get(`${this.localhost}outlet`);
  }

  public createOutlet(outlet) {
    return this.http.post(`${this.localhost}outlet`, outlet);
  }

  public deleteOutlet(outletID) {
    return this.http.delete(`${this.localhost}outlet/${outletID}`);
  }
}
