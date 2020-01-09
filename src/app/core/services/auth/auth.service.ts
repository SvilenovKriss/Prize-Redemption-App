import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userSubject$ = new BehaviorSubject<string | null>(this.username);

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService
  ) { }

  public get user$() {
    return this.userSubject$.asObservable();
  }

  private get username(): string | null {
    const token = this.storage.get('token');
    // tslint:disable-next-line: strict-boolean-expressions
    const username = this.storage.get('username') || '';
    // tslint:disable-next-line: strict-boolean-expressions
    if (token) {
      return username;
    }

    return null;
  }

  public login(email: string, password: string) {
    const user = {
      email,
      password
    };

    return this.http
      .post('https://prize-redemption-backend.herokuapp.com/login', user)
      .pipe(
        tap((res: any) => {
          this.storage.set('token', res.token);
          this.storage.set('username', res.username);
          this.storage.set('email', res.email);
          this.storage.set('role', res.role);
          this.storage.set('createdOn', res.createdOn);
          this.storage.set('id', res.id);
          this.userSubject$.next(res.username);
        })
      );
  }

  public logout(): void {
    this.storage.remove('token');
    this.storage.remove('username');
    this.storage.remove('email');
    this.storage.remove('role');
    this.storage.remove('createdOn');
    this.storage.remove('id');
    this.userSubject$.next(null);
  }
}
