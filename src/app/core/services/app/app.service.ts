import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly themeSubject$ = new BehaviorSubject<string>('default');

  public get theme$() {
    return this.themeSubject$.asObservable();
  }

  public changeThemeSubject() {
      if (this.themeSubject$.value === 'default') {
        this.themeSubject$.next('alternate');
      } else {
        this.themeSubject$.next('default');
      }
  }

}
