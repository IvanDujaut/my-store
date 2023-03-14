import { Injectable } from '@angular/core';

import { Product_Response } from '../models/product.models'


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product_Response[] = [];

  constructor() { }

  public addProduct(product: Product_Response): void {
    this.myShoppingCart.push(product);
  }

  public getShoppingCart() {
    return this.myShoppingCart;
  }

  public getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
