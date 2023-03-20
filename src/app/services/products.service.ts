import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import {
  Product_Response,
  CreateProductDTO,
  UpdateProductDTO,
} from '../models/product.models';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from './../../environments/environment' //Angular se encargara de elegir el archivo correspondiente dependiendo del modo en el que estemos

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
    let params = new HttpParams();// sirve para enviar parametros de forma dinamica
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product_Response[]>(this.apiUrl, { params })
    .pipe(
      retry(3)
    );
  }

  public getProduct(id: string): Observable<Product_Response> {
    return this.http.get<Product_Response>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(() => new Error ('Algo esta fallando en el server'));
        }
        else if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error('El producto no existe'));
        }
        else if (error.status === HttpStatusCode.Unauthorized) {
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
    return this.http.get<Product_Response[]>(`${this.apiUrl}`, {
      params: { limit, offset },
    });
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
