import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators'; 
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { Expo } from '../home/home.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthlogService {
  //  headers = new HttpHeaders({'Content-Type': 'application/json'},{'Access-Control-Allow-Origin': '*'});
  // .set('Content-Type', 'application/json')
 url = "https://admin.eniola.app/api/v1/login";
  constructor(public http:HttpClient) { }
  fnRegisterWithGoogle(){
    return this.http.get(`${environment.authRoute}auth/google/callback`).pipe(map(x=>{
      return x
    }),catchError(this.handleError))
  }
  fnLogUser(data:any):Observable<any>{
    return this.http.post<any>(`${environment.authRoute}login`, data).pipe(map(x=>{
      return x;
    }),catchError(this.handleError))
  }
  fnRegisterUser(data:any):Observable<any>{
    return this.http.post<any>(`${environment.authRoute}register`,data).pipe(map(x=>{
      return x;
    }),catchError(this.handleError))
  }
 
  getProducts():Observable<any>{
    return this.http.get<any>('./assets/expense.json')
   .pipe(
    map(x=>{
      return x;
    })
   )

}

getUsers():Observable<any>{
  return this.http.get<any>('./assets/customer.json')
 .pipe(
  map(x=>{
    return x;
  })
 )

}
handleError(error?:HttpErrorResponse){
  return throwError(error || "Server Errors")
}
}
