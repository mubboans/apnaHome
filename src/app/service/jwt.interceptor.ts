import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public sto:StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const data = JSON.parse(this.sto.getToken())
    if(data){
      request=request.clone({
     
          setHeaders: { Authorization: `Bearer ${data}` }
        
       });
    }
    else{
      request=request.clone({
        setHeaders:{
          'Content-Type':'application/json'
        }
       });
    }

  
    return next.handle(request);
  }
}
