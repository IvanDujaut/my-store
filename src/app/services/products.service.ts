import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Product_Response,
  CreateProductDTO,
  UpdateProductDTO,
} from '../models/product.models';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = '/api/products';

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
    return this.http.get<Product_Response>(`${this.apiUrl}/${id}`);
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
