import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product_Response } from '../../models/product.models'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product_Response = {
    id: '',
    price: 0,
    image: '',
    name: ''
  };

  @Output() addedProduct = new EventEmitter<Product_Response>();

  constructor() { }

  ngOnInit(): void {
  }

  public onAddToCart(): void {
    this.addedProduct.emit(this.product);
  }

}
