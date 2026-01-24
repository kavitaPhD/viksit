import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public userid: BehaviorSubject<number> = new BehaviorSubject<number>(1); //Document-ID;
  public language: BehaviorSubject<string> = new BehaviorSubject<string>('Hindi');//Language
  
  configUrl: any = environment.rootUrl;

  constructor(private http: HttpClient) { }  

  getData(functionName: any) {
    return this.http.get(this.configUrl + functionName)
  }

  paramFunction(functionName: any, params: any) {

    const url = environment.rootUrl + functionName + '/' + params;
    return this.http.get(url)
  }

  param2Function(functionName: any, params: any, params1: any) {

    const url = environment.rootUrl + functionName + '/' + params + '/' + params1;
    return this.http.get(url)
  }

  param3Function(functionName: any, params: any, params1: any, params2: any) {
        
    const url = environment.rootUrl + functionName + '/' + params + '/' + params1 + '/' + params2;
    return this.http.get(url)
  }

  param4Function(functionName: any, params: any, params1: any, params2: any, params3: any) {

    const url = environment.rootUrl + functionName + '/' + params + '/' + params1 + '/' + params2 + '/' + params3;
    return this.http.get(url)
  }

  param11Function(functionName: any, params1: any, params2: any, params3: any, params4: any, params5: any, params6: any, params7: any, params8: any, params9: any, params10: any) {

    const url = environment.rootUrl + functionName + '/' + params1 + '/' + params2 + '/' + params3 + '/' + params4 + '/' + params5 + '/' + params6 + '/' + params7 + '/' + params8 + '/' + params9 + '/' + params10 ;
    return this.http.get(url)
  }

  postData(functionName: any, data: any) {
    return this.http.post(this.configUrl + functionName, data)
  }

  updateData(functionName: any, data: any) {
    return this.http.put(this.configUrl + functionName, data)
  }

  deleteData(functionName: any, data: any) {
    return this.http.delete(this.configUrl + functionName, data)
  }

  generatePDFCG(id: string) {

    const apiUrl = `https://sdgspc.cg.gov.in/bestpracticeapi/pdfgenerate/pdfcertificate/${id}`;

    // Make the GET request to the API
    return this.http.get(apiUrl, {
      responseType: 'blob', // Set the response type to blob since the response will be a PDF
      observe: 'response'   // Set to observe the full HTTP response to access headers
    });
  }



}
