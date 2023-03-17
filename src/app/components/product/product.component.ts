import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product_Response } from '../../models/product.models'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  {

  @Input() product: Product_Response = {
    id: '',
    title: '',
    price: 0,
    description: '',
    category: {
      id: '',
      name: '',
    },
    images: []
  };

  @Output() addedProduct = new EventEmitter<Product_Response>();
  @Output() showDetail = new EventEmitter<string>();

  constructor() { }

  public onAddToCart(): void {
    this.addedProduct.emit(this.product);
  }

  public onShowDetail(): void {
    this.showDetail.emit(this.product.id);
  }

}
