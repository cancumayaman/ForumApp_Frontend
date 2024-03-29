import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/localStorage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorageService:LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token=this.localStorageService.getItem("token");
    let newRequest:HttpRequest<any>;
    newRequest=request.clone({
      headers:request.headers.set("Authorization","Bearer " + token)
    })
    return next.handle(newRequest);
  }
}
