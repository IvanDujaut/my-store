import { Component, OnInit } from '@angular/core';

import { Product_Response } from '../../models/product.models'
import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product_Response[] = [];
  total = 0;

  // renderizar una familia de productos
  // desde el padre
  products: Product_Response[] = [];
  showProductDetails = false;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService //asincrono
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      console.log(data);
      this.products = data;
    });
  }

  public onAddToShoppingCart(product: Product_Response): void {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  public toggleProductDetail(): void {
    this.showProductDetails = !this.showProductDetails;
  }

  public onShowDetail(id: string): void {
    this.productsService.getProduct(id)
    .subscribe(data => {
      console.log('product', data);
    });
  }
}
