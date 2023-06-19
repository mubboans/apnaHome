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

    return next.handle(request).pipe(
      finalize(()=>{
         
        this.sto.showLoader=false;
      }),
      catchError((err)=>{
        if(err instanceof HttpErrorResponse && err.status == 401 && (!request.url.includes('login'))|| !request.url.includes('register')  ){
          //  this.mess.add({severity:'error', summary:'Error Occured in Api', detail:'Error in api yu will be logout',life:2000});    
           console.log(err,'jwt err',request.url);
           if(err.error && err.error.success == false){
            if(err.error.status === 'invalid token'){
              this.mess.add({severity:'error', summary:'Authentication Failed', detail:'Your Token Has Expired',life:2000});    
              setTimeout(()=>{
                this.sto.logoutUser() 
               },2000)  
            }
            else{
              if(!request.url.includes('/login')){
                this.mess.add({severity:'error', summary:err.error.message, detail:err.error.status,life:2000});    
              }
            } 
           }
            
           return throwError(err);      
        }
      })
    );
  }
}
