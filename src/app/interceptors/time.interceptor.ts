import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
// nos hace correr un proceso sin tener que modificar o cambiar
// en algo la rta que nos envie el Observable por lo que no tengo
// que devolver nada
import { tap } from 'rxjs/operators';

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Cada vez que haga una peticion queremos que evalue la hora
    // en que inicio
    const start = performance.now();
    return next
    .handle(request)
    .pipe( //vamos a decirle que corra un proceso
      tap( () => {
        const time = (performance.now() - start) + 'ms';
        console.log(request.url, time);
      })
    );
  }
}
