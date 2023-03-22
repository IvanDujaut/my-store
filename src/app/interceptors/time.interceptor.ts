import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
// nos hace correr un proceso sin tener que modificar o cambiar
// en algo la rta que nos envie el Observable por lo que no tengo
// que devolver nada
import { tap } from 'rxjs/operators';

// vamos a darle un contexto para decirle en que momento debe correr
// o no este interceptor
const CHECK_TIME = new HttpContextToken<boolean>(() => false);

// con esta funcion vamos habilitar o no ese contexto
export function checkTime() {
  return new HttpContext().set(CHECK_TIME, true); //habilita o no la ejecucion
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // vamos a decirle en ese momento si el request tiene el
    // contexto encendido, si lo tiene entonces se ejecuta la logica de negocio
    // sino lo dejamos pasar sin ningun problema
    if (request.context.get(CHECK_TIME)) {
      // Cada vez que haga una peticion queremos que evalue la hora
      // en que inicio
      const start = performance.now();
      return next.handle(request).pipe(
        //vamos a decirle que corra un proceso
        tap(() => {
          const time = performance.now() - start + 'ms';
          console.log(request.url, time);
        })
      );
    }
    return next.handle(request);
  }

  // vamos a crearnos un contexto, es la manera en que angular va a
  // sa saber si tiene que o no incerceptar un interceptor
}
