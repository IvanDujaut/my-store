import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

import { Product_Response } from '../models/product.models'


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product_Response[] = [];
  private myCart = new BehaviorSubject<Product_Response[]>([]);

  myCart$ = this.myCart.asObservable();

  constructor() { }

  public addProduct(product: Product_Response): void {
    this.myShoppingCart.push(product);
    // quiero indicar a los suscritos a ese observador para que
    // se enteren de los cambios, enviarles una "notif" a traves
    // del metodo next
    this.myCart.next(this.myShoppingCart);
  }

  public getShoppingCart() {
    return this.myShoppingCart;
  }

  public getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
