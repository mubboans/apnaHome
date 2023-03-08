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
    return this.http.get<any>(`${environment.serverUrl}property`).pipe(
      map(x=>{
        return x
      }),
      catchError(this.handleError)
      
    )
  }
  getPropertyId(id){
    
    return this.http.get(`${environment.serverUrl}prop/user=${id}`).pipe(
      map(x=>{
        return x;
      }),catchError(this.handleError)
    )
  }
    addProperty(data):Observable<any>{
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //    "Content-Type": "multipart/form-data"
      //   })
      // };
      // const formData = new FormData();
      // formData.append('tempimage',file);
      // formData.append('name',data.name);
      //  formData.append('price',data.price);
      //  formData.append('userID',data.userID);
      //  formData.append('username',data.username);
      //  formData.append('addres',data.addres);

       data.forEach((value,key) => {
        console.log(key+" "+value)
      });

      return this.http.post<any>(`${environment.serverUrl}addProperty`,data).pipe(
        map(x=>{
          return x
        }),
        catchError(this.handleError)
      )
    }
    updateProperty(data,id):Observable<any>{
      return this.http.put(`${environment.serverUrl}addProperty/id=${id}`,data).pipe(
        map(x=>{
          return x;
        }),catchError(this.handleError)
      )
    }
    removeProperty(data,id):Observable<any>{
      return this.http.delete<any>(`${environment.serverUrl}addProperty/id=${id}`,data).pipe(map(x=>{
        return x;
      }),catchError(this.handleError))
    }
  handleError(error?:HttpErrorResponse) {
    return throwError(error || "Server Errors")
  }
}
