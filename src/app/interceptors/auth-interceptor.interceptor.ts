import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, 
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorsComponent } from '../http-errors/http-errors.component';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        'x-rapidapi-key': '3ffe7e76d5mshec9629634ba2550p10767ajsn44b83f79f30c'
      }
    });
    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        this.dialog.open(HttpErrorsComponent, {
          data: {
            message: this.getError(error)
          }
        });

        return throwError(() => error);
      })
    );
  }

  getError (error: HttpErrorResponse) {
    if (error.status === 0) {
      return 'Network error: Please check your internet connection.';
    } else if (error.status === 401) {
      return 'Unauthorized: Please log in again.';
    } else if (error.status === 404) {
      return 'Resource not found.';
    } else {
      return `Unexpected error`;
    }
  }
}
