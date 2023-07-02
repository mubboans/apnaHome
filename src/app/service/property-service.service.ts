import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {

  constructor(public http:HttpClient) { }

  getProperty():Observable<any>{
    return this.http.get<any>(`${environment.serverUrl}property/all`).pipe(
      map(x=>{
        return x
      }),
      catchError(this.handleError)
      
    )
  }
  getPropertyId(id){
    return this.http.get(`${environment.serverUrl}property/user=${id}`).pipe(
      map(x=>{
        return x;
      }),catchError(this.handleError)
    )
  }
    addProperty(data):Observable<any>{
       data.forEach((value,key) => {
        console.log(key+" "+value)
      });

      return this.http.post<any>(`${environment.serverUrl}property/add`,data).pipe(
        map(x=>{
          return x
        }),
        catchError(this.handleError)
      )
    }
    updateProperty(data,id):Observable<any>{
      return this.http.put(`${environment.serverUrl}property/update/id=${id}`,data).pipe(
        map(x=>{
          return x;
        }),catchError(this.handleError)
      )
    }
    removeProperty(data,id):Observable<any>{
      return this.http.delete<any>(`${environment.serverUrl}property/delete/id=${id}`,data).pipe(map(x=>{
        return x;
      }),catchError(this.handleError))
    }
  handleError(error?:HttpErrorResponse) {
    return throwError(error || "Server Errors")
  }
}
