import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _Router: Router, private _ToastrService: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (request.url.startsWith(environment.apiUrl) && err.status === 401) {
          console.log(err);

          this._ToastrService.error('You Should Login', 'Error! ', {
            closeButton: true,
            progressBar: true,
            timeOut: 3000,
          });
          this._Router.navigate(['/auth/login']);
        }
        return throwError(() => new Error(err));
      })
    );
  }
}
