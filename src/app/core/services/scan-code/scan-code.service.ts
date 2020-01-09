import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanCodeService {
  public localhost: string = 'https://prize-redemption-backend.herokuapp.com/';

  constructor(private readonly http: HttpClient) { }

  public checkCode(redemptionCode: string): Observable<{redemptionCode}> {
    return this.http.post<{redemptionCode}>(`${this.localhost}user/check-code`, {
      redemptionCode
    });
  }

  public markCode(redemptionCode: string, status: string): Observable<{}> {
    return this.http.post<{redemptionCode: string, status: string}>(`${this.localhost}user/mark-code`, {
      redemptionCode, status
    });
  }

  public addPrizeItemToCode(redemptionCode: string, itemPrizeCode: string): Observable<{}> {
    return this.http.post<{redemptionCode: string, itemPrizeCode: string}>(`${this.localhost}user/add-prize-to-code`, {
      redemptionCode, itemPrizeCode
    });
  }

  public reportCode(redemptionCode: string): Observable<{}> {
    return this.http.post<{redemptionCode: string}>(`${this.localhost}user/report-code`, {
      redemptionCode
    });
  }
}
