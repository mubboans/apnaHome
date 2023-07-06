import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(public http:HttpClient) { }

  getAllUser():Observable<any>{
    return this.http.get(`${environment.serverUrl}/users/all`).pipe(
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
