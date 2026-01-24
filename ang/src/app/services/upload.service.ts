import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  public rooturl = "http://localhost:3000/upload/";

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) 
  {
    if (error.error instanceof ErrorEvent) 
    {
      console.error('An error occurred:', error.error.message);
    } 
    else 
    {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  };

  postData(data: any): Observable<any> 
  {
    const url = `${'insert'}`;
    return this.http.post(this.rooturl + url, data, httpOptions)
      .pipe(map(res => res), catchError(this.handleError));
  }

}
