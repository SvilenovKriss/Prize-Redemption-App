import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { StorageService } from '../../core/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private readonly storageService: StorageService
  ) { }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    // tslint:disable-next-line: strict-boolean-expressions
    const token = this.storageService.get('token') || '';
    const updatedRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(updatedRequest);
  }
}
