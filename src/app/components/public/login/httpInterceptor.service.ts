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
          'Authorization': 'Basic ' + btoa('secia-web:R--nR^b&#K5mx):Fwe]U0,g(pZiE>]AO%+2<&^$tGj:3T>8&b3B[ri!|8JE4EE))'),
          'Content-type': 'application/x-www-form-urlencoded'
        })
      });
      return next.handle(request);
    }

    return next.handle(req);
  }
}
