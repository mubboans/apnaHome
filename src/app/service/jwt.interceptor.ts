import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { catchError, finalize } from 'rxjs/operators';
import { MessageService } from 'primeng-lts/api';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public sto:StorageService,public mess:MessageService) {}

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
          //  this.mess.add({severity:'error', summary:'Error Occured in Api', detail:'Error in api yu will be logout',life:2000});    
           console.log(err,'jwt err',request.url);
           if(err.error.status === 'Failed To Authenticate' || err.error.mesagge || err.error.success == false){
            if(!request.url.includes('/login')){
              this.mess.add({severity:'error', summary:'Authentication Failed', detail:'Token Expired',life:2000});    
            }
            setTimeout(()=>{
              this.sto.logoutUser() 
             },2000)  
           }
            
           return throwError(err);      
        }
      })
    );
  }
}
