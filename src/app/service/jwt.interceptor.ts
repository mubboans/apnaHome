import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public sto:StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const data = JSON.parse(this.sto.getUserData())
    if(data){
      
      const token =data.accessToken
      request=request.clone({     
          setHeaders: { Authorization: `Bearer ${token}` }
         });
    }
    // else{
    //   request=request.clone({
    //     setHeaders:{
    //       'Content-Type':'application/json'
    //     }
    //    });
    // }

  
    return next.handle(request).pipe(
      finalize(()=>{
         
        this.sto.showLoader=false;
      }),
      catchError((err)=>{
        if(err instanceof HttpErrorResponse && err.status == 401 && (!request.url.includes('login'))|| !request.url.includes('register')  ){
           this.sto.logoutUser()      
           return Observable.throw(err.message);      
        }
      })
    );
  }
}
