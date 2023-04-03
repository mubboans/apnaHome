import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // user/id=
  constructor(public http:HttpClient) { }

  getAllUser():Observable<any>{
    return this.http.get(`${environment.serverUrl}users`).pipe(
      map(x=>{
        return x;
      }),catchError(this.handleError)
    )
  }

  getUserbyId(id):Observable<any>{
    return this.http.get(`${environment.serverUrl}user/id=${id}`).pipe(
      map(x=>{
        return x;
      }),catchError(this.handleError)
    ) 
  } 
   deleteUserbyId(id):Observable<any>{
    return this.http.delete(`${environment.serverUrl}user/id=${id}`).pipe(
      map(x=>{
        return x;
      }),catchError(this.handleError)
    ) 
  } 
  updateUserbyId(id,data):Observable<any>{
    return this.http.put(`${environment.serverUrl}user/id=${id}`,data).pipe(
      map(x=>{
        return x;
      }),catchError(this.handleError)
    ) 
  }


  handleError(err? : HttpErrorResponse )
  {
    return throwError(err || 'ServerError');
  }
}
