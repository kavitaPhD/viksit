import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
@Injectable()

export class SpinnerInterceptor implements HttpInterceptor {

  // constructor(private spinnerService:SpinnerService,private spinner:NgxSpinnerService) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   console.log("Interceptor called");
  //   // this.spinnerService.show();
  //   this.spinner.show();
  //   return next.handle(request);
  // }


  service_count = 0;
  constructor(private spinner: NgxSpinnerService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.service_count++;
    this.spinner.show();
    // return next.handle(request).pipe(
    //   finalize(() => this.spinner.hide()),
    // );

    return next.handle(request).pipe(
      finalize(() => {
        this.service_count--;

        if (this.service_count === 0) {
          this.spinner.hide();
        }
      })
    );
  }
}
