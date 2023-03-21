import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import {
  Product_Response,
  CreateProductDTO,
  UpdateProductDTO,
} from '../models/product.models';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from './../../environments/environment'; //Angular se encargara de elegir el archivo correspondiente dependiendo del modo en el que estemos

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(private http: HttpClient) {}

  // envio parametros de forma dinamica
  public getAllProducts(
    limit?: number,
    offset?: number
  ): Observable<Product_Response[]> {
    let params = new HttpParams(); // sirve para enviar parametros de forma dinamica
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product_Response[]>(this.apiUrl, { params }).pipe(
      retry(3),
      /**
       * Cada vez que un observable nos envia un valor sobre todo
       * con http, va a ser toda la rta que envie el backend, una
       * vez terminada eso y nos suscribamos y recibamos simplemente
       * la rta luego uno se desuscribe.
       * El primer map nos permite evaluar cada uno de los valores que llegan
       * del observable, es decir, nos llegaria todo el array y
       * podemos aplicarle una transformacion, entonces vamos a tener
       * el array de products entero y luego le podremos aplicar
       * una transformacion al array. Aca ya tendriamos nuestro map
       * como un array de productos, recordemos: el primer map es
       * para transformar los valores que llegan desde el
       * observable, sin embargo products seria ya la data que
       * nos estan enviando y como es un array tambien podriamos
       * aplicar un map pero esta vez nativo de JS para hacer una
       * transformacion a cada uno de los elementos
       */

      map((products) =>
        products.map((items) => {
          return {
            ...items,
            taxes: 0.19 * items.price,
          };
        })
      )
    );
  }

  public getProduct(id: string): Observable<Product_Response> {
    return this.http.get<Product_Response>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(() => new Error('Algo esta fallando en el server'));
        } else if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error('El producto no existe'));
        } else if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(() => new Error('No se encuentra autorizado'));
        }
        return throwError(() => new Error('Ups algo salio mal'));
      })
    );
  }

  // envio parametros de forma directa
  public getProductsByPage(
    limit: number,
    offset: number
  ): Observable<Product_Response[]> {
    return this.http
      .get<Product_Response[]>(`${this.apiUrl}`, {
        params: { limit, offset },
      })
      .pipe(
        map((products) =>
          products.map((item) => {
            return {
              ...item,
              taxes: 0.19 * item.price,
            };
          })
        )
      );
  }

  public createProduct(dto: CreateProductDTO) {
    return this.http.post<Product_Response>(this.apiUrl, dto);
  }

  public update(id: string, dto: UpdateProductDTO) {
    //le tengo que decir que el objeto en la posicion tal es la que quiero editar
    return this.http.put<Product_Response>(`${this.apiUrl}/${id}`, dto);
  }

  public delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`); //booleano porque nos indica si fue o no eliminado -> baja logica
  }
}
