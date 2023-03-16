import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product_Response } from '../models/product.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllProducts(): Observable<Product_Response[]> {
    return this.http.get<Product_Response[]>('https://young-sands-07814.herokuapp.com/api/products');
  }
}
