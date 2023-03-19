import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product_Response, CreateProductDTO, UpdateProductDTO } from '../models/product.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products'

  constructor(
    private http: HttpClient
  ) { }

  public getAllProducts(): Observable<Product_Response[]> {
    return this.http.get<Product_Response[]>(this.apiUrl);
  }

  public getProduct(id: string): Observable<Product_Response> {
    return this.http.get<Product_Response>(`${this.apiUrl}/${id}`);
  }

  public createProduct(dto: CreateProductDTO) {
    return this.http.post<Product_Response>(this.apiUrl, dto);
  }

  public update(id: string, dto: UpdateProductDTO) { //le tengo que decir que el objeto en la posicion tal es la que quiero editar
    return this.http.put<Product_Response>(`${this.apiUrl}/${id}`, dto);
  }

  public delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`); //booleano porque nos indica si fue o no eliminado -> baja logica
  }
}
