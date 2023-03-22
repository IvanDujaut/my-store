import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from './../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // necesitamos interceptarlo antes de que salga la peticion
    // y adjuntar en los headers el token, como lo hariamos ?
    // no despues como time sino antes? Creamos un metodo especifico
    // addToken
    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken();
    if (token) {
      //clonamos la peticion si es que existe el token
      // una vez que lo clonemos queremos cambiarle los headers
      const authReq = request.clone({
        // modificamos el header con el set y va a tener ese valor
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return authReq;
    }
    return request;
  }
}
