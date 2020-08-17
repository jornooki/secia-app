import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../../../services/authentication.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isUsuarioLogado() && req.url.indexOf('basicauth') === -1) {
      const request = req.clone({

        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        })
      });
      return next.handle(request);
    }

    return next.handle(req);
  }
}
