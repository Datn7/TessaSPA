import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private _toastr: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error) {
          if (error.status === 400) {
            this._toastr.error(error.error.message, error.error.statusCode);
          }
          if (error.status === 401) {
            this._toastr.error(error.error.message, error.error.statusCode);
          }
          if (error.status === 404) {
            this._router.navigateByUrl('/not-found');
          }
          if (error.status === 500) {
            this._router.navigateByUrl('/server-error');
          }
        }
        return throwError(error);
      })
    );
  }
}
